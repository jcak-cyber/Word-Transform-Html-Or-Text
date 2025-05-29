<template>
  <n-config-provider :theme="lightTheme">
    <Layout />
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider } from "naive-ui";
import { lightTheme } from "naive-ui";

import Layout from "./components/Layout.vue";
import { onMounted } from "vue";

onMounted(() => {
  chrome.runtime.sendMessage({ action: "popupOpened" });
});
</script>

<style lang="scss" scoped></style>
