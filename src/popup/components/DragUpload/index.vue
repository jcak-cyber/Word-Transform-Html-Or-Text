<template>
  <n-upload
    multiple
    directory-dnd
    @before-upload="beforeUpload"
    :show-file-list="false"
    @update-file-list="handleUpdateFileList"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <ArchiveIcon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
      </n-p>
    </n-upload-dragger>
  </n-upload>
</template>

<script setup lang="ts">
import {
  NUpload,
  NUploadDragger,
  NIcon,
  NText,
  NP,
  useMessage,
  type UploadFileInfo,
} from "naive-ui";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { sleep } from "../../../utils";
import { showLoading, hideLoading } from "../../../hooks/useLoading";
import db from "../../../utils/db";

const allowedFileType = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

const message = useMessage();

const beforeUpload = async (data: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}) => {
  if (!data.file.file?.type) return;

  if (!allowedFileType.includes(data.file.file?.type)) {
    message.error("只能上传doc或docx格式的文件！");
    return false;
  }

  const request = await db.get(data.file.name);
  
  if(request){
    message.error("该文件已存在！");
    return false
  }

  showLoading("文件上传中");
  return true;
};

const handleUpdateFileList = async (files: UploadFileInfo[]) => {
  await sleep(1500);
  hideLoading();
  message.success("文件上传成功！");
  db.add(files[0]);
};
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
