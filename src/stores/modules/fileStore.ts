import type { UploadFileInfo } from "naive-ui";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFileStore = defineStore("file-exec", () => {
  const localFileList = ref<UploadFileInfo[]>([]);
  const copyFileType = ref("1");

  const setLocalFileList = (payload: UploadFileInfo[]) => {
    localFileList.value = payload;
  };

  const setCopyFileType = (payload: "0" | "1") => {
    copyFileType.value = payload;
  };

  return { localFileList, copyFileType, setLocalFileList, setCopyFileType };
});
