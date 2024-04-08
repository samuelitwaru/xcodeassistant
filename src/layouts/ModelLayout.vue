<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <!-- <q-toolbar> -->
      <router-link :to="`/models`">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="arrow_back"
        />
      </router-link>

      <q-btn
        flat
        dense
        round
        @click="toggleLeftDrawer"
        aria-label="Menu"
        icon="menu"
      />

      <router-link :to="`/models/${$route.params.model_id}`">
        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon name="fas fa-cube" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">{{
            model.name
          }}</q-toolbar-title>
        </q-btn>
      </router-link>
      <!-- </q-toolbar> -->
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <router-link
            v-for="field in model.fields"
            :key="field"
            :to="`/models/${$route.params.model_id}/fields/${field.id}`"
          >
            <q-item
              v-ripple
              clickable
              :active="$route.params.field_id == field.id"
              active-class="menu-item-active"
            >
              <q-item-section avatar>
                <q-icon color="grey" name="fa fa-atom" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ field.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </router-link>
          <div class="q-pa-sm" align="right">
            <input
              @blur="createField"
              v-on:keyup.enter="createField"
              v-model="formData.name"
              type="text"
              placeholder="new field"
            />
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { api } from "boot/axios";
import { useRoute } from "vue-router";
export default {
  name: "MyLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const route = useRoute();
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    const model = ref({});
    const formData = {
      name: "",
      model: route.params.model_id,
    };

    function getModel() {
      api.get(`models/${route.params.model_id}/`).then((res) => {
        model.value = res.data;
        console.log(model.value);
      });
    }

    function createField() {
      api.post(`fields/`, formData).then((res) => {
        getModel();
        formData.name = "";
      });
    }

    getModel();

    return {
      model,
      leftDrawerOpen,
      formData,
      toggleLeftDrawer,
      createField,
    };
  },
};
</script>

<style></style>
