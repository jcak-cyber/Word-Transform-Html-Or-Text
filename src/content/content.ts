import { insertContent } from "../contentPage/main";
const init = ():HTMLDivElement => {
  const divEl = document.createElement("div");
  divEl.id = "extensions-content";
  divEl.style.width = "100%";
  insertContent(divEl.id);

  return divEl;
};

// content注入
if (window.top === window.self) {
  const el = init();
  document.body.appendChild(el);
}
