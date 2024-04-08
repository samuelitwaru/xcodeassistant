<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header
      class="border-bottom bg-white text-grey-8 q-py-xs"
      height-hint="58"
    >
      <!-- <q-toolbar> -->
      <router-link :to="`/apps`">
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

      <router-link :to="`/apps/${$route.params.app_id}`">
        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <!-- <q-icon name="phone_android" color="red" size="28px" /> -->
          <q-toolbar-title shrink class="text-weight-bold">{{
            app.name
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
      :width="300"
    >
      <q-scroll-area class="fit">
        <q-list>
          <router-link
            v-for="model in app.models"
            :key="model"
            :to="`/apps/${$route.params.app_id}/models/${model.id}`"
          >
            <q-expansion-item
              group="somegroup"
              dense
              dense-toggle
              expand-separator
              icon="fa fa-cube"
              :label="model.name"
              header-class="text-primary"
              :default-opened="model.id == $route.params.model_id"
            >
              <template v-slot:header>
                <q-item-section>
                  <div>
                    <q-avatar icon="fa fa-cube" />
                    {{ model.name }}
                  </div>
                </q-item-section>

                <!-- <q-item-section>{{ model.name }}</q-item-section> -->

                <q-item-section side>
                  <div class="row items-center">
                    <q-btn
                      flat
                      color="red"
                      dense
                      icon="mdi-trash-can"
                      @click="deleteAppModel(model.id)"
                    />
                  </div>
                </q-item-section>
              </template>
              <q-card>
                <q-card-section class="py-1">
                  <q-list>
                    <router-link
                      v-for="field in model.app_model_fields"
                      :key="field"
                      :to="`/apps/${$route.params.app_id}/models/${model.id}/fields/${field.id}`"
                    >
                      <q-item
                        v-ripple
                        clickable
                        :active="$route.params.field_id == field.id"
                        active-class="menu-item-active"
                        class="text-red q-my-xs"
                      >
                        <q-item-section avatar>
                          <q-icon name="fa fa-atom" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>{{ field.name }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          flat
                          color="red"
                          dense
                          icon="close"
                          @click="deleteAppModelField(field.id)"
                        />
                      </q-item>
                    </router-link>
                    <div class="q-pa-sm" align="center">
                      <input
                        @blur="createField"
                        v-on:keyup.enter="createField"
                        v-model="fieldFormData.name"
                        type="text"
                        placeholder="new field"
                      />
                    </div>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator />
          </router-link>

          <q-expansion-item group="somegroup" dense label="Add Model">
            <template v-slot:header>
              <input
                @blur="createModel"
                v-on:keyup.enter="createModel"
                v-model="formData.name"
                type="text"
                placeholder="new model"
              />
            </template>
            <div class="q-ma-sm" align="center">

              <select
                v-if="freeModels.length"
                id="cars"
                name="cars"
                multiple
                style="width: 10.5rem; overflow-y: auto"
                @dblclick="createAppModel"
                v-model="appModelFormData.model"
              >
                <option
                  v-for="model in freeModels"
                  :key="model"
                  option
                  :value="model.id"
                >
                  {{ model.name }}
                </option>
              </select>
            </div>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from "vue";
import { api } from "boot/axios";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "MyLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const route = useRoute();
    const router = useRouter();
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    const app = ref({});
    const models = ref([]);
    const formData = {
      name: "",
    };

    const appModelFormData = ref({
      model: [],
      app: route.params.app_id,
    });

    const fieldFormData = ref({
      name: "",
    });

    const freeModels = computed(() => {
      return models.value.filter(
        (model) => !app.value.models?.map((mod) => mod.model).includes(model.id)
      );
    });

    function getApp() {
      api.get(`apps/${route.params.app_id}/`).then((res) => {
        app.value = res.data;
        console.log(app.value);
      });
    }

    function getModels() {
      api.get(`models/`).then((res) => {
        models.value = res.data;
      });
    }

    function createModel() {
      api.post(`models/`, formData).then((res) => {
        getModels();
        formData.name = "";
      });
    }

    function createField() {
      console.log(fieldFormData.value)
      //return
      fieldFormData.value.app_model = route.params.model_id
      api.post(`app-model-fields/`, fieldFormData.value).then((res) => {
        getApp();
        fieldFormData.value.name = "";
      });
    }

    function createAppModel() {
      appModelFormData.value["model"] = appModelFormData.value["model"][0];
      var model = models.value.filter(
        (model) => model.id == appModelFormData.value["model"]
      )[0];
      appModelFormData.value["name"] = model.name;
      appModelFormData.value["plural"] = model.plural;
      api.post(`app-models/`, appModelFormData.value).then((res) => {
        router.push(`/apps/${app.value.id}`);
        getApp();
        formData.name = "";
      });
    }

    function deleteAppModel(appModelId) {
      api.delete(`/app-models/${appModelId}/`).then((res) => {
        if (res.status == 204) {
          getApp();
          getModels();
          router.push(`/apps/${route.params.app_id}/`);
        }
      });
    }

    function deleteAppModelField(fieldId) {
      api.delete(`/app-model-fields/${fieldId}/`).then((res) => {
        if (res.status == 204) {
          getApp();
          getModels();
          router.push(`/apps/${appModel.app}/`);
        }
      });
    }

    getApp();
    getModels();

    return {
      app,
      freeModels,
      leftDrawerOpen,
      formData,
      appModelFormData,
      fieldFormData,
      toggleLeftDrawer,
      createModel,
      createAppModel,
      createField,
      deleteAppModel,
      deleteAppModelField,
    };
  },
};
</script>

<style></style>
