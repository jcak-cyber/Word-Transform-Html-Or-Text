<template>
  <div class="file-box">
    <div class="list" v-for="(item, index) in dbFileList" :key="item.id">
      <div class="name">{{ index + 1 }}.{{ item.name }}</div>
      <view class="btn">
        <n-button
          quaternary
          type="primary"
          size="small"
          @click="handleCopyContent(item)"
        >
          复制{{ copyFileType === "1" ? "模板" : "文本" }}
        </n-button>

        <n-button
          quaternary
          type="error"
          size="small"
          @click="handleDelete(item)"
        >
          删除
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
import db from "../../../utils/db";
import { ref } from "vue";

const message = useMessage();
const fileStore = useFileStore();
const { copyFileType } = storeToRefs(fileStore);

const dbFileList = ref<UploadFileInfo[]>([]);

const handleCopyContent = async (item: UploadFileInfo) => {
  if (!item || !item.file) return;
  const buffer = await fileToArrayBuffer(item.file);

  const funcMap = {
    "0": mammoth.extractRawText,
    "1": mammoth.convertToHtml,
  } as Record<
    string,
    (input: { arrayBuffer: ArrayBuffer }) => Promise<{ value?: string }>
  >;

  const content = await funcMap[copyFileType.value]({ arrayBuffer: buffer });
  if (!content.value) return;

  // 只有非文本结构才会使用模板
  if (copyFileType.value === "1") {
    const copyTemp = await chrome.storage.local.get(["temp"]);
    const reg = /\{\{\s*template\s*\}\}/g;
    content.value = copyTemp.temp
      ? (copyTemp.temp as string).replace(reg, content.value)
      : content.value;
  }

  try {
    navigator.clipboard.writeText(content.value);
    message.success("复制成功");
  } catch (error) {
    message.error("复制失败");
  }
};

const handleDelete = async (item: UploadFileInfo) => {
  try {
    await db.delete(item.name);
    message.success("删除成功!");
    getFileList();
  } catch (error) {
    message.success("删除失败!");
    console.log(error);
  }
};

const getFileList = async () => {
  try {
    const result = await db.getAllDataViaCursor<UploadFileInfo>();
    dbFileList.value = result;
  } catch (error) {
    console.log("getFileList===>", error);
  }
};

getFileList();
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
