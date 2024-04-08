<template lang>
  <q-page>
    <div class="q-py-xl flex flex-center">
      <div style="width: 50rem">
        <div class="text-subtitle1 q-py-sm text-center">
          <q-breadcrumbs class="text-center" align="center">
            <q-breadcrumbs-el label="Home" to="/" />
            <q-breadcrumbs-el label="Apps" to="/apps" />
            <q-breadcrumbs-el label="Create" />
          </q-breadcrumbs>
        </div>
        <q-separator spaced />
        <q-card class="flex flex-center">
          <q-card-section>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <div>
                <q-input v-model="formData.name" type="text" label="Name" />
                <q-input
                  v-model="formData.description"
                  type="textarea"
                  label="Description"
                />
              </div>
              <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { api } from "src/boot/axios";

export default {
  data() {
    return {
      formData: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formData);
      api.post(`apps/`, this.formData).then((res) => {
        if (res.status == 201) {
          this.$router.push("/apps");
        }
      });
    },
    onReset() {
      this.formData = {};
    },
  },
};
</script>
<style lang></style>
