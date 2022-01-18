const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);

const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.bilibili.com" },
  { logo: "D", url: "https://www.douban.com" },
  { logo: "G", url: "https://www.google.com" },
  { logo: "G", url: "https://www.github.com" },

];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
        <li>
            <div class="site">
                <div class="logo">
                    ${node.logo}
                </div>
                <div class="link">
                    ${simplifyUrl(node.url)}
                </div>
                <div class="close">
                    <svg class="icon" >
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>
`).insertBefore($lastLi);
    $li.on("click", () => {
        window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1)
      render()
    });
  });
};

render();

$lastLi.on("click", () => {
  let url = prompt("请输入一个网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url });
  render();
});

$(document).on('keypress', (e)=> {
    const {key} = e
    for(let i = 0; i < hashMap.length; i++) {
        if(hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})

window.onbeforeunload = function () {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
