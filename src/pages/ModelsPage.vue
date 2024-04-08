<template lang>
  <q-page>
    <div class="q-py-xl flex flex-center">
      <div style="width: 50rem">
        <div class="text-subtitle1 q-py-sm text-center">
          <q-breadcrumbs class="text-center" align="center">
            <q-breadcrumbs-el label="Home" to="/" />
            <q-breadcrumbs-el label="Models" />
          </q-breadcrumbs>
        </div>
        <q-separator spaced />
        <div class="flex flex-center items-stretch">
          <router-link
            :to="`models/${model.id}`"
            v-for="model in models"
            :key="model.id"
          >
            <q-card
              class="my-card text-center q-pt-sm q-ma-xs"
              flat
              style="width: 100px"
            >
              <q-icon size="md" color="primary" name="fas fa-cube" />
              <q-card-section>
                <div class="text-subtitle2">{{ model.name }}</div>
              </q-card-section>
            </q-card>
          </router-link>
          <router-link to="/models/create">
            <q-btn
              style="width: 100px; height: 90%"
              class="text-red q-ma-xs"
              outline
              flat
              icon="fas fa-plus"
              @click="show = true"
            />
          </router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      models: [],
    };
  },

  created() {
    this.getModels();
  },

  methods: {
    getModels() {
      this.$api.get(`models/`).then((res) => {
        this.models = res.data;
      });
    },
  },
};
</script>
<style lang></style>
