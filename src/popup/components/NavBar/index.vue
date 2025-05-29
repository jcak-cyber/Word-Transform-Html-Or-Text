<template>
  <div class="nav-container">
    <n-switch
      v-model="modelValue"
      checked-value="1"
      unchecked-value="0"
      @update:value="handleUpdateValue"
    >
      <template #checked> HTML </template>
      <template #unchecked> TEXT </template>
    </n-switch>
  </div>
</template>

<script setup lang="ts">
import { NSwitch } from "naive-ui";

defineProps<{ modelValue: string}>();
const emits = defineEmits(["update:modelValue"]);

const handleUpdateValue = (value: string) => {
  emits("update:modelValue", value);
};

</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
