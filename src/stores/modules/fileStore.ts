import { defineStore } from "pinia";
import { ref } from "vue";

export const useFileStore = defineStore("file-exec", () => {
  const copyFileType = ref("1");

  const setCopyFileType = (payload: "0" | "1") => {
    copyFileType.value = payload;
  };

  return { copyFileType, setCopyFileType };
});
