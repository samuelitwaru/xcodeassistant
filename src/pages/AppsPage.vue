<template lang>
  <q-page>
    <div class="q-py-xl flex flex-center">
      <div style="width: 50rem">
        <div class="text-subtitle1 q-py-sm text-center">
          <q-breadcrumbs class="text-center" align="center">
            <q-breadcrumbs-el label="Home" to="/" />
            <q-breadcrumbs-el label="Apps" />
          </q-breadcrumbs>
        </div>
        <q-separator spaced />
        <div class="flex flex-center items-stretch">
          <router-link to="/apps/create">
            <q-btn
              style="width: 100px; height: 90%"
              class="text-red"
              outline
              flat
              icon="fas fa-plus"
              @click="show = true"
            />
          </router-link>
          <router-link :to="`apps/${app.id}`" v-for="app in apps" :key="app.id">
            <q-card
              class="my-card text-center q-pt-sm q-ma-xs"
              flat
              style="width: 100px"
            >
              <q-icon size="md" color="primary" name="phone_android" />
              <q-card-section>
                <div class="text-subtitle2">{{ app.name }}</div>
              </q-card-section>
            </q-card>
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
      apps: [],
    };
  },

  created() {
    this.getApps();
  },

  methods: {
    getApps() {
      this.$api.get(`apps/`).then((res) => {
        this.apps = res.data;
      });
    },
  },
};
</script>
<style lang></style>
