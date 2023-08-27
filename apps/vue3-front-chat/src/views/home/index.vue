<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const clickToRoute = () => {
  console.log('router', router)
  router.push({
    path: "/chat",
  });
};
</script>

<template>
  <div>456456</div>
  <van-button type="primary" @click="clickToRoute">123123</van-button>
</template>

<style scoped></style>
