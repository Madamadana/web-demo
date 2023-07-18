let animeBox = document.querySelector(".section2");
let viewHeight = document.documentElement.clientHeight;
let endScrollOffset = animeBox.clientHeight;
endScrollOffset = Math.abs(-1*endScrollOffset - viewHeight);
let contentBox = document.querySelector(".intro");

var scrollFunc = function (e) {
  let y = animeBox.getBoundingClientRect().top;
  y = Math.abs(y-viewHeight);
  if(y>endScrollOffset) return;
  let value = map(y,0,endScrollOffset,0,1)
  // console.log("y=" + y);
  // console.log("prog=" + value);
  animeBox.style.setProperty("--prog", value);
  let contentTop = contentBox.getBoundingClientRect().top;
  // console.log("contentTop=" + contentTop);
  if(contentTop<viewHeight && !contentBox.classList.contains("active")){
    contentBox.classList.add("active")
  }
  if(contentTop>viewHeight && contentBox.classList.contains("active")){
    contentBox.classList.remove("active")
  }
};

window.onscroll = scrollFunc;

/**
 * @desc 映射函数
 * s是区间 [a1, a2] 的值
 * 返回 s 映射到 [b1, b2] 后的值
 */
function map(s, a1, a2, b1, b2) {
  return ((s - a1) / (a2 - a1)) * (b2 - b1) + b1;
}

window.onload = function () {
  console.log(`onLoad:viewHeight=${viewHeight}, viewWidth=${document.documentElement.clientWidth}`)
};

window.onresize=function(){  
  viewHeight = document.documentElement.clientHeight;
  endScrollOffset = animeBox.clientHeight;
  endScrollOffset = Math.abs(-1*endScrollOffset - viewHeight);
  console.log(`resize:viewHeight=${viewHeight}, viewWidth=${document.documentElement.clientWidth}`)
} 
