import { defineComponent, ref, Teleport } from "vue";
import styles from "../style/loading.module.scss";
import { NSpin } from "naive-ui";

const targetDom = ref("body");
const isLoading = ref(false);
const loadingText = ref("加载中");

export const showLoading = (text?: string, target?: string) => {
  isLoading.value = true;
  loadingText.value = text || "加载中...";
  targetDom.value = target || "body";
};

export const hideLoading = () => {
  isLoading.value = false;
};

export default defineComponent({
  setup() {
    return () => (
      <>
        {isLoading.value ? (
          <Teleport to={targetDom.value}>
            <div class={styles["loading-box"]}>
              <NSpin size="small" />
              <div class={styles["loading-text"]}>{loadingText.value}</div>
            </div>
          </Teleport>
        ) : null}
      </>
    );
  },
});
