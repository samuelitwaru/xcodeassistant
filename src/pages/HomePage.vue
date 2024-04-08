<template>
  <q-page>
    <div class="q-py-xl flex flex-center">
      <router-link :key="item.name" v-for="item in menuItems" :to="item.route">
        <q-card
          flat
          bordered
          :class="`text-center q-pa-md q-ma-xs text-${item.color}`"
          style="width: 200px"
        >
          <q-icon :name="item.icon" size="xl" />
          <q-card-section>
            <div class="text-h6">{{ item.name }}</div>
          </q-card-section>
        </q-card>
      </router-link>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
defineOptions({
  name: "HomePage",
  data() {
    return {
      menuItems: ref([
        {
          name: "Models",
          route: "/models",
          icon: "fas fa-cubes",
          color: "primary",
        },
        {
          name: "Templates",
          route: "/templates",
          icon: "description",
          color: "red",
        },
        {
          name: "Apps",
          route: "/apps",
          icon: "app_shortcut",
          color: "secondary",
        },
      ]),
    };
  },
});
</script>
