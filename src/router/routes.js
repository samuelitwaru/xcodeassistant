const routes = [
  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      { path: "", component: () => import("pages/HomePage.vue") },
      { path: "models", component: () => import("pages/ModelsPage.vue") },
      {
        path: "models/create",
        component: () => import("pages/CreateModelPage.vue"),
      },
      { path: "templates", component: () => import("pages/TemplatesPage.vue") },
      {
        path: "templates/create",
        component: () => import("pages/CreateTemplatePage.vue"),
      },
      { path: "apps", component: () => import("pages/AppsPage.vue") },
      {
        path: "apps/create",
        component: () => import("pages/CreateAppPage.vue"),
      },
    ],
  },

  {
    path: "/models",
    component: () => import("layouts/ModelLayout.vue"),
    children: [
      { path: ":model_id", component: () => import("pages/ModelPage.vue") },
      {
        path: ":model_id/fields/:field_id",
        component: () => import("pages/FieldPage.vue"),
      },
    ],
  },

  {
    path: "/apps",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: ":app_id", component: () => import("pages/AppPage.vue") },
      {
        path: ":app_id/models/:model_id",
        component: () => import("pages/AppModelPage.vue"),
      },
      {
        path: ":app_id/models/:model_id/fields/:field_id",
        component: () => import("pages/AppModelFieldPage.vue"),
      },
    ],
  },

  {
    path: "/templates",
    component: () => import("layouts/TemplateLayout.vue"),
    children: [
      { path: ":id", component: () => import("pages/TemplatePage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
