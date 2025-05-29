/**
 * 暂停执行指定的时间。
 * @param ms - 要等待的时间，以毫秒为单位。
 * @returns 一个 `Promise`，在指定的时间后解析。
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 将File对象转换为ArrayBuffer
 * @param file 需要转换的File对象
 * @returns 包含ArrayBuffer的Promise
 */
export const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    // 成功读取时的处理
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;
      if (result instanceof ArrayBuffer) {
        resolve(result);
      } else {
        reject(new Error('Failed to read file as ArrayBuffer'));
      }
    };

    // 错误处理
    fileReader.onerror = () => {
      reject(new Error(`Error reading file: ${fileReader.error?.message || 'Unknown error'}`));
    };

    // 开始读取文件内容
    fileReader.readAsArrayBuffer(file);
  });
}

/**
 * 将File对象转换为Base64字符串
 * @param file 要转换的File对象
 * @param includePrefix 是否包含base64前缀（如：data:image/jpeg;base64,）
 * @returns Promise解析为base64字符串
 */
export const fileToBase64 = (
  file: File,
  includePrefix: boolean = true
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // 确保读取结果是字符串类型
      const result = reader.result as string;
      resolve(includePrefix ? result : result.split(",")[1] || "");
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
