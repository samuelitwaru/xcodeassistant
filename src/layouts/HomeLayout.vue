<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-pa-lg flex flex-center">
      <router-link to="/">
        <img alt="Quasar logo" src="~assets/img/logo.png" style="width: 40px" />
      </router-link>
      <div class="text-h4 text-center q-px-sm">Code Assistant</div>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
