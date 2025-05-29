<template>
  <div class="file-box">
    <div class="list" v-for="(item, index) in fileList" :key="item.id">
      <div class="name">{{ index + 1 }}.{{ item.name }}</div>
      <view class="btn">
        <n-button
          quaternary
          type="primary"
          size="small"
          @click="handleCopyContent(item)"
        >
          复制
        </n-button>
      </view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type UploadFileInfo, NButton } from "naive-ui";
import { ref, onMounted, onUnmounted } from "vue";
import mammoth from "mammoth";
import { fileToArrayBuffer } from "../../../utils";

const fileList = ref<UploadFileInfo[]>([]);

const handleCopyContent = async (item: UploadFileInfo) => {
  console.log(item.file);
  
  if (!item || !item.file) return;
  const buffer = await fileToArrayBuffer(item.file);
  const content =  mammoth.convertToHtml({ arrayBuffer: buffer });
  console.log(content);
};

// 更安全的存储操作
const getFileList = async () => {
  try {
    const result = await chrome.storage.local.get(["fileList"]);
    if (result.fileList) {
      fileList.value = result.fileList;
    }
  } catch (error) {
    console.error("Failed to get fileList:", error);
  }
};

const handleLocChange = (
  changes: Record<string, chrome.storage.StorageChange>,
  areaName: string
) => {
  if (areaName === "local" && changes.fileList) {
    fileList.value = changes.fileList.newValue as UploadFileInfo[];
  }
};

onMounted(() => {
  if (chrome?.storage) {
    getFileList();
    chrome.storage.onChanged.addListener(handleLocChange);
  } else {
    console.warn("chrome.storage API is not available");
  }
});

onUnmounted(() => {
  if (chrome?.storage) {
    chrome.storage.onChanged.removeListener(handleLocChange);
  }
});
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
