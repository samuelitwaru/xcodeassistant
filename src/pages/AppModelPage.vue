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
    <br />
    <div class="text-h6">Generators</div>
    <table>
      <tbody>
        <tr>
          <td>
            <label for="model-generator">Select Generator : </label>
            <select
              v-model="generatorFormData.generation_category"
              name=""
              id="model-generator"
            >
              <option
                :value="cat.id"
                v-for="cat in generator_categories"
                :key="cat.d"
              >
                {{ cat.name }}
              </option>
            </select>
            <br />
            <label for="model-generator">Select Template : </label>
            <select
              v-model="generatorFormData.template"
              name=""
              id="model-generator"
            >
              <option :value="tmp.id" v-for="tmp in templates" :key="tmp.d">
                {{ tmp.name }}
              </option>
            </select>
          </td>
          <td>
            <button @click="createGenerator">Add</button>
          </td>
        </tr>
        <tr v-for="generator in generators" :key="generator.id">
          <td>{{ generator.generation_category }}</td>
          <td>
            <textarea
              name=""
              id=""
              cols="100"
              rows="10"
              v-model="generator.output"
            ></textarea>
            <div>
              <button @click="generate(generator.id)">generate</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { api } from "src/boot/axios";

export default {
  data() {
    return {
      key: null,
      formData: {
        name: "",
        plural: "",
      },
      generatorFormData: {
        app_model: this.$route.params.model_id,
        generation_category: null,
      },
      model: {},
      generators: [],
      generator_categories: [],
      templates: [],
    };
  },
  created() {
    this.getModel();
    this.getGenerators();
    this.getGeneratorsCategories();
    this.getTemplates();
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
      this.$api
        .get(`app-models/${this.$route.params.model_id}/`)
        .then((res) => {
          this.model = res.data;
          this.populateObject(this.model, this.formData);
        });
    },

    getGenerators() {
      this.$api
        .get(`generations/?app_model=${this.$route.params.model_id}`)
        .then((res) => {
          this.generators = res.data;
        });
    },

    getTemplates() {
      this.$api.get(`templates/`).then((res) => {
        this.templates = res.data;
      });
    },

    getGeneratorsCategories() {
      this.$api.get(`generation-categories/`).then((res) => {
        this.generator_categories = res.data;
      });
    },

    createGenerator() {
      this.$api.post(`generations/`, this.generatorFormData).then((res) => {
        if (res.status == 201) {
          this.generators.unshift(res.data);
        }
      });
    },

    generate(generatorId) {
      this.$api.get(`generations/${generatorId}/generate/`).then((res) => {
        if (res.status == 200) {
          this.generators = this.generators.filter(
            (gen) => !(gen.id == generatorId)
          );
          this.generators.unshift(res.data);
        }
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
