const animationData = {
  'scale':{
    fromValue: 1,
    toValue: 0.7,
  },
  'translateX':{
    fromValue: 0,
    toValue: 35
  },
  'shadowOffset':{
    fromValue: 1,
    toValue: 2
  }
};

const startScrollOffset = 0;
const showInfoScrollOffset = 400;
const endScrollOffset = 500;

var scrollFunc = function (e) {
  let y = window.pageYOffset;//scrollTop
  if(y>startScrollOffset){
    startAnimation(y-endScrollOffset>0?endScrollOffset:y);
  }
}

window.onscroll=scrollFunc;//scroll-view bindscroll

function startAnimation(y){
  let scaleValue = map(y,startScrollOffset,endScrollOffset,animationData.scale.fromValue,animationData.scale.toValue);
  let x = map(y,startScrollOffset,endScrollOffset,animationData.translateX.fromValue,animationData.translateX.toValue);
  let offset = map(y,startScrollOffset,endScrollOffset,animationData.shadowOffset.fromValue,animationData.shadowOffset.toValue);
  let containerStyle = document.querySelector(".section2").style;//selectComponent
  containerStyle.cssText = '--scale-to-value: '+ scaleValue
  +'; --x-to-value: '+ x +'; --shadow-offset: '+ offset;//setStyle
  
  let bg = document.querySelector(".section3");
  if(y>showInfoScrollOffset){
    if(!bg.classList.contains('active')){//hasClass
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
