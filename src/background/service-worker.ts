chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "popupOpened") {
    console.log(sender, sendResponse);
    
    console.log("检测到Popup页面已打开");
    // 执行相关逻辑（如更新状态、发送通知等）
  }
  return true; // 保持消息通道开放以异步响应
});