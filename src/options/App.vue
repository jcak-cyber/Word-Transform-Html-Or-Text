<template>
  <n-message-provider>
    <div class="options-box">
      <Setting />
    </div>
  </n-message-provider>
</template>

<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
import Setting from "./components/Setting/index.vue";
</script>

<style lang="scss" scoped>
.options-box {
  width: 600px;
  padding: 12px;
  div {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
