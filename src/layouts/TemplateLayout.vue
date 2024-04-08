<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header
      elevated
      class="flex bg-white text-grey-8 q-py-xs"
      height-hint="58"
    >
      <!-- <q-toolbar> -->
      <router-link :to="`/templates`">
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
        @click="editMode = true"
        v-if="!editMode"
        flat
        no-caps
        no-wrap
        class="q-ml-xs"
      >
        <q-icon name="mdi-page-next-outline" color="red" size="28px" />
        <q-toolbar-title shrink class="text-weight-bold"
          >{{ template.name }}
        </q-toolbar-title>
      </q-btn>
      <input
        v-else
        @blur="update('name')"
        v-model="formData.name"
        type="text"
      />
      <!-- </q-toolbar> -->
    </q-header>

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

    const template = ref({});
    const formData = ref({
      name: "",
    });
    const editMode = ref(false);

    function getTemplate() {
      api.get(`templates/${route.params.id}/`).then((res) => {
        template.value = res.data;
        formData.value.name = res.data.name;
      });
    }
    getTemplate();

    function update(key) {
      console.log({ [key]: this.formData[key] });
      api
        .patch(`templates/${route.params.id}/`, {
          [key]: this.formData[key],
        })
        .then((res) => {
          getTemplate();
          editMode.value = false;
        });
    }

    return {
      template,
      leftDrawerOpen,
      formData,
      editMode,
      toggleLeftDrawer,
      update,
    };
  },
};
</script>

<style></style>
