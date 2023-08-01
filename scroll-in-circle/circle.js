const swiperItemStatic = [
  {
    index: 0,
    title: "Unique sites",
    subtitle: "",
    desc: "Discover the hidden secrets of Noirmoutier Island",
    btns: [
      "Gois passage",
      "Salterns",
      "Bois de la Chaise",
      "Beaches",
      "Sébastopol Polder",
      "Heritage & tourist attractions",
    ],
  },
  {
    index: 1,
    title: "beautiful",
    subtitle: "bike rides",
    desc: "Slow down and explore the multiple facets of Noirmoutier Island by bicycle.",
    btns: [
      "From Gois to forests",
      "From marshes to mills",
      "From beaches to ports",
      "Bicycle hires",
    ],
  },
  {
    index: 2,
    title: "reconnect",
    subtitle: "with nature",
    desc: "Revive your taste for freedom on a naturally beautiful and preserved island.",
    btns: [
      "walking trails",
      "Gois passage",
      "Sébastopol Polder",
      "Salterns",
      "Müllembourg reserve",
      "Beaches & dunes",
      "Digging for shellfish",
      "Forests",
    ],
  },
  {
    index: 3,
    title: "cruise",
    subtitle: "the waters your way",
    desc: "Noirmoutier Island invites you to travel its fantastic bodies of water.",
    btns: [
      "sailing",
      "land yachting",
      "Kayaking & paddleboarding",
      "kite surfing",
    ],
  },
  {
    index: 4,
    title: "sweet",
    subtitle: "& savoury treats",
    desc: "Between the nourishing sea and the fertile land, Noirmoutier Island has what it takes to delight anyone’s palate.",
    btns: [
      "restaurants",
      "bar",
      "markets",
      "local producers",
      "salt",
      "oysters",
      "fish",
      "Bonnotte potatoes",
    ],
  },
];

let viewHeight = document.documentElement.clientHeight;
function Compass(obj) {
  this.aniTime = obj.aniTime;
  this.timing = obj.timing;
  this.step = 40;
}
Compass.prototype = {
  init: function () {
    this.parent = document.querySelector(".CompassItems");
    this.items = this.parent.children; //动态更新
    this.prevBtn = document.querySelector(".prev");
    this.nextBtn = document.querySelector(".next");
    this.lastTime = Date.now(); //用于消抖
    let newFirst = this.parent.lastElementChild.cloneNode(true);
    let newLast = this.parent.firstElementChild.cloneNode(true);
    this.parent.appendChild(newLast);
    this.parent.insertAdjacentElement("afterbegin", newFirst);
    this.activeIdx = Math.floor(this.parent.childElementCount / 2);

    this.initSwiper();
    this.setAnime(0);
    this.setActive();
    this.eventBind();
  },
  initSwiper() {
    this.movingTape = document.querySelector(".swiper-viewWindow");
    this.num = swiperItemStatic.length;
    //列表渲染
    let itemArr = [
      swiperItemStatic[swiperItemStatic.length - 1],
      ...swiperItemStatic,
      swiperItemStatic[0],
    ];
    let items = "";
    /* <div class="swiper-item">
          <span class="swiper-item-title icon-0">
            <span class="swiper-item-title-title">reconnect0</span>
          </span>
        </div> */
    //title
    //desc
    //btns
    for (let i = 0; i < itemArr.length; i++) {
      items += `<div class="swiper-item"><span class="swiper-item-title icon-${itemArr[i].index}">
      <span class="swiper-item-title-title">${itemArr[i].title}</span><span class="swiper-item-title-subtitle">${itemArr[i].subtitle}</span></span>
      <div class="swiper-item-desc"><p>${itemArr[i].desc}</p></div>
      <div class="swiper-item-btnBox">`;
      itemArr[i].btns.forEach((e) => {
        items += `<a href="#" class="swiper-item-btn"><span>${e}</span></a>`;
      });
      items += `</div></div>`;
    }
    this.movingTape.innerHTML = items;
    this.moveWidth = document.querySelector(".swiper-item").offsetWidth;
    this.movingTape.style.transition = `left ${this.aniTime}ms ${
      this.aniTime == 0 ? "" : this.timing
    }`;
    this.movingTape.style.left = `-${this.activeIdx * this.moveWidth}px`;
    this.nowSwiperIndex = itemArr[this.activeIdx].index;
  },
  setAnime: function (aniTime) {
    console.log("setAnime");
    for (let i = 0; i < this.items.length; i++) {
      let aniElement = this.items[i].firstElementChild;
      aniElement.style.transform = `translateX(-50%) rotate(${
        120 - i * this.step
      }deg)`;
      // transform: translateX(-50%) rotate(-80deg);
      aniElement.style.transition = `transform ${aniTime}ms ${
        aniTime == 0 ? "" : this.timing
      }`;
      this.items[i].classList.remove("active");
    }
  },
  setActive: function () {
    this.items[this.activeIdx].classList.add("active");
  },
  eventBind() {
    console.log("eventBind");
    let that = this;
    this.prevBtn.addEventListener("click", function () {
      console.log("click prev");
      that.throttle(that.showPrev, that.aniTime, that.aniTime);
    });

    this.nextBtn.addEventListener("click", function () {
      console.log("click next");
      that.throttle(that.showNext, that.aniTime, that.aniTime);
    });

    window.addEventListener("resize", function () {
      that.moveWidth = document.querySelector(".swiper-item").offsetWidth;
      that.movingTape.style.transition = `left 0ms`;
      that.movingTape.style.left = `${
        -(that.nowSwiperIndex + 1) * that.moveWidth
      }px`;
    });
  },
  throttle(handle, delay, val) {
    let now = Date.now();
    if (now - this.lastTime >= delay) {
      handle.call(this, val); //this.preSlider.call(this,aniTime);
      this.lastTime = Date.now();
    }
  },
  showNext(aniTime) {
    console.log("show next");
    //删除第一项
    this.parent.firstElementChild.remove();
    //插入新的最后一项（克隆对应子节点以后插入）
    // printElements("showNext after delete",this.items)
    let newLast = this.items[1].cloneNode(true);
    this.parent.appendChild(newLast);
    //动画
    this.setAnime(aniTime);
    this.setActive();
    /* Swiper */
    let that = this;
    this.nowSwiperIndex++;
    this.movingTape.style.transition = `left ${aniTime}ms ${
      aniTime == 0 ? "" : this.timing
    }`;
    // this.movingTape.style.left = `${
    //   parseInt(this.movingTape.style.left) - this.moveWidth
    // }px`;
    this.movingTape.style.left = `${
      -(this.nowSwiperIndex + 1) * this.moveWidth
    }px`;
    if (this.nowSwiperIndex == this.num) {
      that.nowSwiperIndex = 0;
      setTimeout(function () {
        that.movingTape.style.transition = `left 0ms`;
        that.movingTape.style.left = `${-that.moveWidth}px`;
      }, aniTime);
    }
  },
  showPrev(aniTime) {
    console.log("show prev");
    //删除最后一项
    console.log(this.parent.lastElementChild.dataset.position);
    this.parent.lastElementChild.remove();
    //插入新的第一项（克隆对应子节点以后插入）
    // printElements("showPrev after delete",this.items)
    let idx = this.items.length - 2; //倒数第二项
    let newFirst = this.items[idx].cloneNode(true);
    this.parent.insertAdjacentElement("afterbegin", newFirst);
    //动画
    this.setAnime(aniTime);
    this.setActive();
    /* Swiper */
    let that = this;
    this.movingTape.style.transition = `left ${aniTime}ms ${
      aniTime == 0 ? "" : this.timing
    }`;
    // this.movingTape.style.left = `${
    //   parseInt(this.movingTape.style.left) + this.moveWidth
    // }px`;
    this.movingTape.style.left = `${-this.nowSwiperIndex * this.moveWidth}px`;
    if (this.nowSwiperIndex === 0) {
      that.nowSwiperIndex = that.num - 1;
      setTimeout(function () {
        that.movingTape.style.transition = `left 0ms`;
        that.movingTape.style.left = `${-that.num * that.moveWidth}px`; //312|3|1
      }, aniTime);
    } else {
      this.nowSwiperIndex--;
    }
  },
};

new Compass({
  aniTime: 300,
  timing: "ease-out",
}).init();

function printElements(info, e) {
  var myDate = new Date();
  let str = "";
  for (let i = 0; i < e.length; i++) {
    str += e[i].dataset.position + " ";
  }
  console.log(myDate + " " + info + " 转盘元素排列：" + str);
}

window.onload = function () {
  const imgs = document.getElementsByTagName("img");
  for (let i = 0; i < imgs.length; i++) {
    if (!imgs[i].alt) {
      imgs[i].alt = "this is pic" + i;
    }
  }
};
