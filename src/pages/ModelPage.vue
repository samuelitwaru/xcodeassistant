<template lang>
  <div class="q-pa-sm">
    <table>
      <tr>
        <th>Property</th>
        <th>Value</th>
      </tr>
      <tr>
        <th>
          <input type="text" v-model="formData[key]" />
        </th>
        <th></th>
      </tr>
      <tr v-for="(value, key) in formData" :key="key">
        <td>{{ key }}</td>
        <td>
          <template v-if="typeof value === 'boolean'">
            <input
              @update:model-value="update(key)"
              type="checkbox"
              v-model="formData[key]"
            />
          </template>
          <template v-else-if="typeof value === 'number'">
            <input
              @update:model-value="update(key)"
              type="number"
              v-model="formData[key]"
            />
          </template>
          <template v-else>
            <input @blur="update(key)" type="text" v-model="formData[key]" />
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { api } from "src/boot/axios";

export default {
  data() {
    return {
      formData: {
        name: "",
        plural: "",
      },
      model: {},
    };
  },
  created() {
    this.getModel();
  },
  watch: {
    "$route.params.model_id": {
      handler: function (model_id) {
        this.getModel();
      },
    },
  },
  methods: {
    getModel() {
      this.$api.get(`models/${this.$route.params.model_id}/`).then((res) => {
        this.model = res.data;
        this.populateObject(this.model, this.formData);
      });
    },

    update(key) {
      console.log({ [key]: this.formData[key] });
      api
        .patch(`models/${this.$route.params.model_id}/`, {
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
<style>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 12px;
}
th {
  background-color: #f2f2f2;
}
</style>
