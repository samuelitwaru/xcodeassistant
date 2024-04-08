<template lang="">
  <div>
    <q-dialog v-model="show">
      <q-form class="q-gutter-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Create Model</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <!-- <q-btn flat label="Decline" color="primary" v-close-popup /> -->
            <!-- <q-btn flat label="Accept" color="primary" v-close-popup /> -->
          </q-card-actions>
        </q-card>
      </q-form>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      formData: {
        name: "",
      },
    };
  },
};
</script>
<style lang=""></style>
