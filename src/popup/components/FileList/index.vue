<template>
  <div class="file-box">
    <div class="list" v-for="(item, index) in localFileList" :key="item.id">
      <div class="name">{{ index + 1 }}.{{ item.name }}</div>
      <view class="btn">
        <n-button
          quaternary
          type="primary"
          size="small"
          @click="handleCopyContent(item)"
        >
          复制{{ copyFileType === "1"?'HTML':"文本" }}
        </n-button>
      </view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type UploadFileInfo, NButton, useMessage } from "naive-ui";
import mammoth from "mammoth";
import { fileToArrayBuffer } from "../../../utils";
import { useFileStore } from "../../../stores";
import { storeToRefs } from "pinia";

const message = useMessage();
const fileStore = useFileStore();
const { localFileList, copyFileType } = storeToRefs(fileStore);

const handleCopyContent = async (item: UploadFileInfo) => {
  if (!item || !item.file) return;
  const buffer = await fileToArrayBuffer(item.file);

  const funcMap = {
    "0": mammoth.extractRawText,
    "1": mammoth.convertToHtml,
  } as Record<string, (input: { arrayBuffer: ArrayBuffer }) => Promise<{ value?: string }>>;

  const content = await funcMap[copyFileType.value]({ arrayBuffer: buffer });
  if (!content.value) return;

  message.success("复制成功");
  navigator.clipboard.writeText(content.value);
};
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
