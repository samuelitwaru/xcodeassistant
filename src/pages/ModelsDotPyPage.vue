<template lang>
  <div v-if="app">
    <textarea cols="50" rows="10" v-model="formData.models_declarations">
    </textarea>
  </div>
</template>
<script>
export default {
  data() {
    return {
      app: null,
      formData: {
        models_declarations: "",
      },
    };
  },
  created() {
    this.getApp();
  },
  methods: {
    getApp() {
      this.$api.get(`apps/${this.$route.params.app_id}/`).then((res) => {
        this.app = res.data;
        this.formData.models_declarations = this.app.models_declarations;
      });
    },
  },
};
</script>
<style lang></style>
