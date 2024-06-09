<template lang="">
  <div v-if="app">
    {{ app.models_declarations }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      app: null,
    };
  },
  created() {
    this.getApp();
  },
  methods: {
    getApp() {
      this.$api.get(`apps/${this.$route.params.app_id}/`).then((res) => {
        this.app = res.data;
        console.log(this.app);
      });
    },
  },
};
</script>
<style lang=""></style>
