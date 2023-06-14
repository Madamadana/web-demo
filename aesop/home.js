const productInfo = [
  "Incense",
  "Candles",
  "Room Sprays",
  "Objects",
  "Deodorisers & Pets",
  "Literature",
];
const L = 323;

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

function showInfo() {
  //<div class="block">Incense</div>
  let info = "";
  productInfo.forEach((e) => {
    info += '<div class="block">';
    info += e;
    info += "</div>";
  });
  document.getElementById("infoLoop").innerHTML = info;
  let first = document.querySelector("#infoLoop div");
  first.addEventListener("click", onClick);
}

window.onload = function () {
  setTimeout(showInfo(), 1000);
  console.log("onLoad");
};
