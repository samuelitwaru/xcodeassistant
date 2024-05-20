<template lang>
  <div class="q-pa-sm">
    {{ field }}
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
          <template v-else-if="typeof value === 'string'">
            <input @blur="update(key)" type="text" v-model="formData[key]" />
          </template>
        </td>
      </tr>
      <tr>
        <td>Foreign Key</td>
        <td>
          <select
            @change="update('foreign_key')"
            v-model="formData.foreign_key"
            name=""
            id=""
          >
            <option :value="null">None</option>
            <option v-for="model in app_models" :key="model" :value="model.id">
              {{ model.name }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td>Data Type</td>
        <td>
          <select
            @change="update('data_type')"
            v-model="formData.data_type"
            name=""
            id=""
          >
            <option :value="null">None</option>
            <option v-for="typ in data_types" :key="typ" :value="typ.id">
              {{ typ.name }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td>DataType Properties</td>
        <td>
          <textarea
            v-model="formData.properties"
            @blur="updateFieldProperties"
            cols="50"
            rows="10"
          ></textarea>
          <p class="text-red">{{ formError.properties }}</p>
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
      key: null,
      app_models: [],
      data_types: [],
      formData: {
        name: "",
        is_column_field: false,
        is_filter_field: false,
        is_search_field: false,
        data_type: null,
        widget: "",
        foreign_key: null,
        properties: "",
      },
      formError: {},
      field: {},
    };
  },
  created() {
    this.getField();
    this.getAppModels();
    this.getDataTypes();
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
      this.$api
        .get(`app-model-fields/${this.$route.params.field_id}/`)
        .then((res) => {
          this.field = res.data;
          this.populateObject(this.field, this.formData);
          this.formData.properties = JSON.stringify(this.formData.properties);
        });
    },

    getAppModels() {
      this.$api
        .get(`app-models/?app=${this.$route.params.app_id}`)
        .then((res) => {
          this.app_models = res.data;
        });
    },

    getDataTypes() {
      this.$api.get(`data-types/`).then((res) => {
        this.data_types = res.data;
      });
    },

    update(key) {
      console.log({ [key]: this.formData[key] });
      api
        .patch(`app-model-fields/${this.$route.params.field_id}/`, {
          [key]: this.formData[key],
        })
        .then((res) => {
          if (res.status == 200) {
            //this.getField();
          }
        });
    },

    updateFieldProperties() {
      this.formError = {};
      var data = {};
      try {
        data = JSON.parse(this.formData.properties);
        api
          .patch(`app-model-fields/${this.$route.params.field_id}/`, {
            properties: data,
          })
          .then((res) => {
            if (res.status == 200) {
              //this.getField();
            }
          });
      } catch (error) {
        this.formError.properties = "Invalid Json";
      }
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
