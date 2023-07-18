const cases =[{
    index: 1,
    text: 'Interact with pics',
    url: '../interact-with-pics/hover.html'
  },
  {
    index: 2,
    text: 'Static image sequence mapped to scrolling',
    url: '../rolex/index.html'
  },
  {
    index: 4,
    text: 'Scrolling in an arc/circle',
    url: '../scroll-in-circle/circle.html'
  }];
function showInfo() {
  //列表渲染
  console.log("showInfo");
  let info = "";
//   <div>
//             <h1>1</h1>
//             <a href="../interact-with-pics/hover.html">Interact with pics</a>
//         </div>
  cases.forEach((e) => {
    info += `<div><h1>${e.index}</h1><a href="${e.url}">${e.text}</a></div>`;
  });
  document.querySelector(".list").innerHTML = info;
}

window.onload = function () {
  setTimeout(showInfo(), 100);
  console.log("onLoad");
};
