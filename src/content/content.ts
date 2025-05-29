// const init = () => {
//   const addIframe = (id: string, pagePath: string) => {
//     const contentIframe = document.createElement("iframe");
//     contentIframe.id = id;
//     contentIframe.style.cssText = "width: 100%; height: 100%; position: fixed; inset: 0px; margin: 0px auto; z-index: 10000002; border: none;";
//     const getContentPage = chrome.runtime.getURL(pagePath);
//     console.log("getContentPage",getContentPage);
    
//     contentIframe.src = getContentPage;
//     document.body.appendChild(contentIframe);
//   }

//   addIframe('content-start-iframe', 'contentPage/index.html')
// }

// content页面注入
// if (window.top === window.self) {
//   init();
// }
