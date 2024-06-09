<template lang>
  <div class="q-mx-sm">
    <div class="text-h6">Generation</div>

    <q-card class="my-card flex q-pa-sm " flat bordered>
      <div v-for="model in app?.models" :key="model.id">
        <input type="checkbox" :id="`model${model.id}`"
          v-model="formData.app_models" name="app_model" :value="model.id">
        <label :for="`model${model.id}`">
          <q-chip class="glossy" :label="model.name" />
        </label>
      </div>
    </q-card>
    <div class="q-my-sm">
      <input type="checkbox"
        @change='selectAllModels'
        name="app_model" id="model-all" v-model="formData.selectAllModels">
      <label
        for="model-all">Select All</label>
    </div>

    <div class="q-my-sm">
      <input type="checkbox"
        name="app_model" id="model-create-new-generators"
        v-model="formData.create_new_generators">
      <label
        for="model-create-new-generators">Create New Generators</label>
    </div>

    <div v-if="formData.create_new_generators">
      <label for="model-generator">Select Generator : </label>
      <select
        v-model="formData.generation_category"
        name
        id="model-generator">
        <option
          :value="cat.id"
          v-for="cat in generator_categories"
          :key="cat.d">
          {{ cat.name }}
        </option>
      </select>
      <br />
      <label for="model-generator">Select Template : </label>
      <select
        v-model="formData.template"
        name
        id="model-generator">
        <option :value="tmp.id" v-for="tmp in templates" :key="tmp.d">
          {{ tmp.name }}
        </option>
      </select>
    </div>
    <hr>
    <button @click="generate">Generate</button>
    <hr>
    <table>
      <tbody>
        <tr v-for="generator in generators" :key="generator.id">
          <td>{{ generator.generation_category_name }}</td>
          <td>
            <textarea
              name
              id
              cols="100"
              rows="10"
              v-model="generator.output"></textarea>
            <div>
              <button @click="deleteGenerator(generator.id)">delete</button> |
              <button @click="generate(generator.id)">generate</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      app:null,
      formData: {
        app_models: [],
        selectAllModels: false,
        generation_category: null,
        template:null,
        create_new_generators: false,
      },
      generator_categories: [],
      templates: [],
      generators: [],
    }
  },
  created() {
    this.getApp();
    this.getTemplates();
    this.getGeneratorsCategories()
  },
  methods: {
    getApp() {
      this.$api.get(`apps/${this.$route.params.app_id}/`).then((res) => {
        this.app = res.data;
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
    generate(){
      this.$api.post(`apps/${this.$route.params.app_id}/generate/`, this.formData).then((res) => {
        this.generators = res.data;
      });
    },
    selectAllModels(){
      this.formData.app_models = []
      if (this.formData.selectAllModels) {
        this.app.models.forEach(element => {
          this.formData.app_models.push(element.id)
        });
      }
    },
  },
};
</script>
<style lang></style>
