<template>
  <div class="setting">
    <div class="setting__header">
      <n-radio-group
        v-model:value="radioValue"
        name="radiogroup"
        @update:value="handleRadioUpdate"
      >
        <n-space>
          <n-radio v-for="ls in list" :key="ls.value" :value="ls.value">
            {{ ls.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
      <div class="btn-group">
        <n-button type="success" size="small" round @click="handleSave">
          保存
        </n-button>
      </div>
    </div>
    <div class="setting__body" ref="editor"></div>
  </div>
</template>

<script setup lang="ts">
import { NRadioGroup, NRadio, NSpace, NButton, useMessage } from "naive-ui";
import { onMounted, ref, watch } from "vue";

import CodeFlask from "codeflask";
import tempMaps, { tempKey } from "./index";

const message = useMessage();
const radioValue = ref("0");
const editor = ref<HTMLElement>();
const flask = ref<InstanceType<typeof CodeFlask>>();

const list = ref([
  {
    label: "DEFAULT",
    value: tempKey.default,
  },
  {
    label: "HTML",
    value: tempKey.HTMLContent,
  },
  {
    label: "VUE",
    value: tempKey.VUEContent,
  },
  {
    label: "CUSTOM",
    value: tempKey.Custom,
  },
]);

const handleRadioUpdate = (value: string) => {
  flask.value.updateCode(tempMaps[value]);
  if (value !== tempKey.Custom) {
    flask.value.enableReadonlyMode();
  } else {
    flask.value.disableReadonlyMode();
  }
};

const handleSave = () => {
  try {
    chrome.storage.local.set({
      temp: flask.value.getCode(),
      radioVal: radioValue.value,
    });
    message.success("保存成功");
  } catch (error) {
    console.log(error);

    message.error("保存失败");
  }
};

onMounted(async () => {
  const res = await chrome.storage.local.get(["radioVal"]);
  if (res && res.radioVal) {
    radioValue.value = res.radioVal;
    flask.value.updateCode(tempMaps[res.radioVal]);
  }
});

watch(
  () => editor.value,
  (val) => {
    if (val) {
      flask.value = new CodeFlask(val, {
        language: "html",
        lineNumbers: true,
        readonly: true,
      });

      flask.value.updateCode(tempMaps[radioValue.value]);

      flask.value.onUpdate((code: string) => {
        console.log("编辑器更新", code);
      });
    }
  },
  {
    once: true,
  }
);
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
