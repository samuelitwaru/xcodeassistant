<template lang>
  <q-page>
    <div class="q-py-xl flex flex-center">
      <div style="width: 50rem">
        <div class="text-subtitle1 q-py-sm text-center">
          <q-breadcrumbs class="text-center" align="center">
            <q-breadcrumbs-el label="Home" to="/" />
            <q-breadcrumbs-el label="Templates" />
          </q-breadcrumbs>
        </div>
        <q-separator spaced />
        <div class="flex flex-center items-stretch">
          <router-link to="/templates/create">
            <q-btn
              style="width: 100px; height: 100%"
              class="text-red q-mx-sm"
              outline
              icon="fas fa-plus"
              @click="show = true"
            />
          </router-link>
          <router-link
            :to="`templates/${template.id}`"
            v-for="template in templates"
            :key="template.id"
          >
            <q-card
              class="my-card text-center q-pt-sm q-ma-xs border-primary"
              flat
              bordered
              style="width: 100px"
            >
              <q-icon size="md" color="primary" name="description" />
              <q-card-section>
                <div class="text-subtitle2">{{ template.name }}</div>
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
      templates: [],
    };
  },

  created() {
    this.getTemplates();
  },

  methods: {
    getTemplates() {
      this.$api.get(`templates/`).then((res) => {
        this.templates = res.data;
      });
    },
  },
};
</script>
<style lang></style>
