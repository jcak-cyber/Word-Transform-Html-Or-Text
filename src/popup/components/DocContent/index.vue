<template>
  <div class="doc-upload">
    <nav-bar v-model:model-value="switchValue" />
    <n-tabs class="custom-tabs" type="segment" animated v-model="tabValue">
      <n-tab-pane
        v-for="item in tabList"
        :name="item.name"
        :tab="item.tab"
      >
        <component :is="item.component" />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { NTabs, NTabPane } from "naive-ui";

import NavBar from "../NavBar/index.vue";
import FileList from "../FileList/index.vue";
import DragUpload from "../DragUpload/index.vue";
import { ref } from "vue";

const switchValue = ref<string>("1");
const tabValue = ref<string>("upload");

const tabList = ref([
  { name: "upload", tab: "上传文件", component: DragUpload },
  { name: "fileList", tab: "文件列表", component: FileList },
]);
</script>

<style lang="scss" scoped>
@use "./index.scss" as indexScss;
</style>
