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
      |
      <router-link :to="`/apps/${$route.params.app_id}/generate`"
        >Generate</router-link
      >
      |
      <router-link :to="`/apps/${$route.params.app_id}/models-dot-py`"
        >Models.py</router-link
      >
      |
      <router-link :to="`/apps/${$route.params.app_id}/serializers-dot-py`"
        >Serializiers.py</router-link
      >
      |
      <router-link :to="`/apps/${$route.params.app_id}/views-dot-py`"
        >Views.py</router-link
      >
      |
      <router-link :to="`/apps/${$route.params.app_id}/viewsets-dot-py`"
        >Viewsets.py</router-link
      >
      |
      <router-link :to="`/apps/${$route.params.app_id}/forms-dot-py`"
        >Forms.py</router-link
      >
      |
      <router-link :to="`/apps/${$route.params.app_id}/urls-dot-py`"
        >Urls.py</router-link
      >
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="400"
    >
      <q-scroll-area class="fit" :visible="false">
        <q-list class="q-mr-md">
          <q-expansion-item
            v-for="model in app.models"
            :key="model"
            expand-icon-toggl
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
                <router-link
                  :to="`/apps/${$route.params.app_id}/models/${model.id}`"
                >
                  <q-avatar icon="fa fa-cube" />
                  {{ model.name }}
                </router-link>
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
            <q-card flat bordered>
              <q-card-section class="py-1">
                <q-list>
                  <q-item
                    v-for="field in model.app_model_fields"
                    :key="field"
                    dense
                    v-ripple
                    clickable
                    :active="$route.params.field_id == field.id"
                    active-class="menu-item-active"
                    class="text-red q-my-xs"
                  >
                    <q-item-section avatar>
                      <q-icon v-if="field.foreign_key" name="fa fa-key" />
                      <q-icon v-else name="fa fa-atom" />
                    </q-item-section>

                    <q-item-section>
                      <router-link
                        :to="`/apps/${$route.params.app_id}/models/${model.id}/fields/${field.id}`"
                      >
                        <q-item-label>{{ field.name }}</q-item-label>
                      </router-link>
                    </q-item-section>

                    <q-btn
                      flat
                      color="red"
                      dense
                      icon="close"
                      @click="deleteAppModelField(field.id)"
                    />
                  </q-item>
                  <div class="q-pa-sm" align="center">
                    <input
                      @blur="createField(model.id)"
                      v-on:keyup.enter="createField(model.id)"
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
          <!-- </router-link> -->

          <q-expansion-item
            class="q-ma-sm"
            group="somegroup"
            dense
            label="Add Model"
            expand-icon-toggle
          >
            <template v-slot:header>
              <input
                @blur="createModel"
                v-on:keyup.enter="createModel"
                v-model="formData.name"
                type="text"
                placeholder="new model"
                style="width: 90%"
              />
            </template>
            <div class="q-ma-sm" align="center">
              <q-list bordered>
                <q-item v-for="model in freeModels" :key="model.id">
                  <q-item-section>{{ model.name }}</q-item-section>
                  <q-item-section>
                    <q-btn
                      @click="createAppModel(model.id)"
                      dense
                      color="primary"
                      icon="add"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
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
      app: route.params.app_id,
    };

    const appModelFormData = ref({
      model: null,
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
      });
    }

    function getModels() {
      api.get(`models/`).then((res) => {
        models.value = res.data;
      });
    }

    function createModel() {
      if (!formData.name) return;

      api.post(`app-models/`, formData).then((res) => {
        router.push(`/apps/${app.value.id}`);
        getApp();
        getModels();
        formData.name = "";
      });
    }

    function createField(app_model_id) {
      console.log(fieldFormData.value);
      fieldFormData.value.app_model = app_model_id;
      //return
      fieldFormData.value.app_model = route.params.model_id;
      api.post(`app-model-fields/`, fieldFormData.value).then((res) => {
        getApp();
        fieldFormData.value.name = "";
      });
    }

    function createAppModel(modelId) {
      appModelFormData.value["model"] = modelId;
      var model = models.value.filter((model) => model.id == modelId)[0];
      if (createAppModel) appModelFormData.value["name"] = model.name;
      appModelFormData.value["plural"] = model.plural;

      console.log(appModelFormData.value);

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
      // thumbStyle: {
      //   right: "4px",
      //   borderRadius: "5px",
      //   backgroundColor: "#027be3",
      //   width: "5px",
      //   opacity: 0.75,
      // },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
    };
  },
};
</script>

<style></style>
