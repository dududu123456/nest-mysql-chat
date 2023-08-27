<script setup lang="ts">
import { requestDemo } from "@/api";

const queryData = async () => {
  try {
    const res = await requestDemo();
  } catch (e) {}
};

queryData();
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component
        :key="route.name"
        :is="Component"
        v-if="route.meta.keepAlive"
      />
    </keep-alive>
    <component :key="route.name" :is="Component" v-if="!route.meta.keepAlive" />
  </router-view>
</template>

<style scoped></style>
