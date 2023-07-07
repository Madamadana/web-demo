const plpInfo = [
  "Incense",
  "Candles",
  "Room Sprays",
  "Fragrance",
  "Deodorisers & Pets",
  "Literature",
];
const L = 323;
const products=[
  {
    name:"0Candle",
    content:"100 g",
    price:"Price",
    info:[{
        label:"Label1",
        value:"text1"
      },
      {
        label:"Label2",
        value:"text2"
      }
    ]
  },
  {
  name:"1Olous Aromatique Room Spray",
  content:"2 Sizes",
  price:"From $39.00",
  info:[{
      label:"Aroma",
      value:"Fresh, woody, citrus"
    },
    {
      label:"Usage",
      value:"Spray two to three pumps throughout the immediate space and refresh as needed; the aroma will last for several hours."
    }
  ]
},
{
  name:"2Animal",
  content:"16.9 fl oz",
  price:"From $41.00",
  info:[{
      label:"Suited",
      value:"Pampered pets"
    },
    {
      label:"Usage",
      value:"Massage generously into a soaked, well-brushed coat, paying careful attention to the skin, then rinse thoroughly with warm water and towel dry."
    }
  ]
}];

function onClick4(){
  let layer = document.querySelector("#hiddenLayer");
  let oldPage = document.querySelector(".bg");
  let oldPic = document.querySelector("#Fragrance");
  let oldText = document.querySelector("#textBox p");
  let textBox = document.querySelector("#textBox");
  let bgWhite = document.querySelector(".bottom");


  layer.classList.toggle("mask");
  oldPage.classList.toggle("zoomOut");
  oldPic.style.setProperty("visibility", "hidden");

  let h = window.getComputedStyle(oldPic).height;//to figure out

  textBox.classList.toggle("active");
  oldText.classList.toggle("fade");
  bgWhite.classList.toggle("active");

  let bgPic = document.querySelector(".pos4");
  bgPic.classList.toggle("active");

  // 上下内容渐入
  setTimeout(()=>{
    document.querySelector(".pdp").classList.toggle("active");
    document.querySelector("#pic4").style.setProperty("visibility", "hidden");
    bg.style.setProperty("visibility", "visible");
  },350);
  
}
function onClick() {
  let time = 500;
  //getComputedStyle(document.documentElement).getPropertyValue("--zoom-duration");
  console.log("time="+time);
  let container = document.querySelector("#screenMask");
  let bg = document.querySelector(".bg");
  let a = document.querySelector("#mask");
  if (container.classList.contains("mask")) {
    bg.style["animationPlayState"] = "running";
    a.style["animationPlayState"] = "running";
    setTimeout(() => {
      container.classList.toggle("mask");
      bg.classList.toggle("hiding");
      a.classList.toggle("active");
    }, time);
  } else {
    container.classList.toggle("mask");
    bg.classList.toggle("hiding");
    a.classList.toggle("active");
    setTimeout(() => {
      bg.style["animationPlayState"] = "paused";
      a.style["animationPlayState"] = "paused";
    }, time);
  }

  let screenH =
    document.documentElement.clientHeight || document.body.clientHeight;
  console.log("screenH=" + screenH);
  let h = window.getComputedStyle(a).height;
  h = h.slice(0, h.indexOf("p"));
  h = parseInt(h);
  console.log("h=" + h);
  let value = screenH / h + 0.1;
  let oy = L / (screenH - h);
  document.documentElement.style.setProperty("--value", value);
  document.documentElement.style.setProperty("--origin-y", oy * 100 + "%");
  console.log("scale=" + value);
  console.log("y=" + oy * 100 + "%");
}

let productArr = [{
  url: '#',
  imgPath: '../images/aesop-pdp-0.png'
},
{
  url: '#',
  imgPath: '../images/aesop-pdp-1.png'
},
{
  url: '#',
  imgPath: '../images/aesop-pdp-2.png'
}
];

let bgArr = [{
  url: '#',
  imgPath: '../images/aesop-candle-bg.png'
},
{
  url: '#',
  imgPath: '../images/aesop-nav-objects.png'
},
{
  url: '#',
  imgPath: '../images/aesop-animal-bg.png'
}
];

new Swiper({
    imgArr: productArr, 
    imgWidth: 0.5,//页面宽度的比例
    aniTime: 400, 
    intervalTime: 2000, 
    scale: 0.5, 
    autoplay: false,//无效，默认自动轮播
    gap: 0,
    clsSuffix: '-card'
}).init();

new SwiperB({
  imgArr: bgArr, 
  imgWidth: 1,//页面宽度的比例
  aniTime: 400, 
  intervalTime: 2000, 
  scale: 1, 
  gap: 0,
  clsSuffix: '-bg'
}).init();

function setProduct(idx) {
  console.log("setProduct");
  console.log(`idx1= ${idx} idx2= ${idx % 3}`);
  let currentProduct = products[idx % 3];
  let str = "";
  console.log(currentProduct);
  let tableInfo = currentProduct.info;
  document.querySelector('.price div').innerHTML = currentProduct.name;
  document.getElementById('product-content').innerHTML = currentProduct.content;
  document.getElementById('product-price').innerHTML = currentProduct.price;
  // <div class="line">
  //   <div class="subtitle">info[1].label</div>
  //   <div class="content">info[1].value</div>
  // </div>
  tableInfo.forEach((e) => {
    str += '<div class="line"><div class="subtitle intro-text">'+e.label
      +'</div><div class="content intro-text">'+e.value+'</div></div>';
  });
  document.querySelector(".info").innerHTML = str;

  //let allInfo = document.querySelectorAll(".intro-text");

}

function showInfo() {
  /* PLP页面 */
  //列表渲染
  console.log("showInfo");
  let info = "";
  //<div class="block" id="Incense">Incense</div>
  plpInfo.forEach((e) => {
    info += '<div class="block"';
    info += 'id="'
    info += e;
    info += '">';
    info += e;
    info += "</div>";
  });

  // 页面切换按钮
  document.getElementById("infoLoop").innerHTML = info;
  let first = document.querySelector("#infoLoop div");
  first.addEventListener("click", onClick);
  let fourth = document.querySelector("#Fragrance");
  fourth.addEventListener("click", onClick4);

  //标签页
  let as = document.querySelectorAll("#tabs a");
  as.forEach((item) => {
    item.onclick = function () {
      let divs = document.querySelectorAll("#pages>div");
      divs.forEach((e) => {
        e.style.display = "none";
      });
      as.forEach((e) => {
        e.classList.remove("active");
      });
      let i = this.href.lastIndexOf("#");
      let id = this.href.slice(i);
      this.classList.add("active");
      console.log(id);
      document.querySelector(id).style.display = "block";
    };
  });

  /* PDP页面 */
  //多行文本溢出处理
  let a = document.querySelector("#longText");
  let lines = 0;
  let h = window.getComputedStyle(a).height;
  h = h.slice(0, h.indexOf("p"));
  h = parseInt(h);
  lines = Math.floor(h/15);
  a.style.setProperty("--line-num", lines);
  a.style.setProperty("height", "auto");
}

window.onload = function () {
  setTimeout(showInfo(), 1000);
  //setProduct(0);
  console.log("onLoad");
};
