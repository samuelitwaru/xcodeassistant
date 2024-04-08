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
              @change="update(key)"
              type="checkbox"
              v-model="formData[key]"
            />
          </template>
          <template v-else-if="typeof value === 'number'">
            <input @blur="update(key)" type="number" v-model="formData[key]" />
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
import { route } from "quasar/wrappers";
import { api } from "src/boot/axios";

export default {
  data() {
    return {
      formData: {
        name: "",
        is_column_field: false,
        is_filter_field: false,
        is_search_field: false,
        data_type: "",
        widget: "",
      },
      field: {},
    };
  },
  created() {
    this.getField();
  },
  watch: {
    "$route.params.field_id": {
      handler: function (field_id) {
        this.getField();
      },
    },
  },
  methods: {
    getField() {
      this.$api.get(`fields/${this.$route.params.field_id}/`).then((res) => {
        this.field = res.data;
        this.populateObject(this.field, this.formData);
      });
    },

    update(key) {
      console.log({ [key]: this.formData[key] });
      api
        .patch(`fields/${this.$route.params.field_id}/`, {
          [key]: this.formData[key],
        })
        .then((res) => {
          if (res.status == 200) {
            //this.getField();
          }
        });
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
