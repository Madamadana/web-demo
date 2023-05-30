const animationLeft = {
  'scale':{
    fromValue: 1,
    toValue: 0.7,
  },
  'translateX':{
    fromValue: 0,
    toValue: 150
  }
};
const animationRight = {
  'scale':{
    fromValue: 1,
    toValue: 0.7,
  },
  'translateX':{
    fromValue: 0,
    toValue: -150
  }
};

const startScrollOffset = 0;
const showInfoScrollOffset = 400;
const endScrollOffset = 500;
let isReachBottom = true;

function scrollBottom(){
  isReachBottom = false
  // 距顶部
  var scrollTop =
  document.documentElement.scrollTop || document.body.scrollTop;
  // 可视区高度
  var clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  // 滚动条总高度
  var scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  // 距离顶部或底部的阈值
  const threshold = 20;
  let currentHeight=scrollTop + clientHeight + threshold;
  if (currentHeight >= scrollHeight) {
    console.log("滚动触底");
    window.scrollTo({
     top: 550
   });
  }
  setTimeout(() => {
   isReachBottom = true
  }, 1000)
}

var scrollFunc = function (e) {
  if (isReachBottom) scrollBottom();
  let y = window.pageYOffset;
  if(y>startScrollOffset){
    startAnimation(y-endScrollOffset>0?endScrollOffset:y);
  }
}

window.onscroll=scrollFunc;

function startAnimation(y){
  let scaleValue = map(y,startScrollOffset,endScrollOffset,animationLeft.scale.fromValue,animationLeft.scale.toValue);
  let dialL = document.querySelector(".left");
  dialL.style.cssText = '--scale-to-value: '+ scaleValue
  +'; --xl-to-value: '+ 
  map(y,startScrollOffset,endScrollOffset,animationLeft.translateX.fromValue,animationLeft.translateX.toValue)
  +'px;';
  let dialR = document.querySelector(".right");
  dialR.style.cssText = '--scale-to-value: '+ scaleValue
  +'; --xr-to-value: '+ 
  map(y,startScrollOffset,endScrollOffset,animationRight.translateX.fromValue,animationRight.translateX.toValue)
  +'px;';
  // console.log("Y:"+y);
  let bg = document.querySelector(".section3");
  if(y>showInfoScrollOffset){
    if(!bg.classList.contains('active')){
      bg.classList.add('active');
    }
  }else{
    if(bg.classList.contains('active')){
      bg.classList.remove('active');
    }
  }
}

/**
 * @desc 映射函数
 * s是区间 [a1, a2] 的值
 * 返回 s 映射到 [b1, b2] 后的值
 */
function map (s, a1, a2, b1, b2) {
  return ((s - a1) / (a2 - a1)) * (b2 - b1) + b1
}
