<template lang>
  <div class="q-pa-sm container">
    <div class="row">
      <div class="col-md-6">
        <div class="flex flex-center justify-between q-pa-sm">
          <q-btn color="primary" icon="save" dense @click="update('content')" />
        </div>
        <textarea cols="100" rows="20"
          style="font-family: monospace; padding: 5px;"
          v-model="formData.content"
          placeholder="Your Template"></textarea>
      </div>
      <div class="col-md-6">

      </div>
    </div>
  </div>
</template>
<script>
  import { api } from "src/boot/axios";

  export default {
    data() {
      return {
        formData: {
          name: "",
          content: "",
          documentation: "",
        },
        template: {},
      };
    },
    created() {
      this.getTemplate();
    },
    methods: {
      getTemplate() {
        api.get(`templates/${this.$route.params.id}/`).then((res) => {
          this.template = res.data;
          console.log(res.data)
          this.populateObject(this.template, this.formData);
        });
      },

      update(key) {
        console.log({ [key]: this.formData[key] });
        api
          .patch(`templates/${this.$route.params.id}/`, {
            [key]: this.formData[key],
          })
          .then((res) => {});
      },

      populateObject(sourceObject, targetObject) {
        for (let key in sourceObject) {
          if (sourceObject.hasOwnProperty(key)) {
            if (targetObject.hasOwnProperty(key)) {
              targetObject[key] = sourceObject[key];
            }
          }
        }
      },
    },
  };
  </script>
<style lang></style>
