<template>
  <div class="nav-container">
    <div class="switch-box">
      <div class="label">解析类型：</div>
      <n-switch
        :default-value="fileStore.copyFileType"
        checked-value="1"
        unchecked-value="0"
        @update:value="handleUpdateValue"
      >
        <template #checked> HTML </template>
        <template #unchecked> TEXT </template>
      </n-switch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NSwitch } from "naive-ui";
import { useFileStore } from "../../../stores";

const fileStore = useFileStore();

const handleUpdateValue = (value: string) => {
  fileStore.setCopyFileType(value as "1" | "0");
};
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
