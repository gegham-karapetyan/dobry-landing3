const swiperContainer = document.querySelector(".swiper-container");
const swiperSlides = document.querySelectorAll(".swiper-slide");
const swiperPaginatonBullets = document.querySelectorAll(
  ".swiper-pagination-bullet"
);
const swiperPaginatonLines = document.querySelectorAll(
  ".swiper-pagination-line"
);

let swiper = new Swiper(".swiper-container", {
  speed: 2000,
  effect: "slide",
  parallax: true,
  shortSwipes: true,
  longSwipesRatio: 0.1,
  threshold: 5,
  longSwipesMs: 200,
  shortSwipes: false,

  touchRatio: 0.6,

  autoplay: {
    delay: 5000,
  },

  on: {
    init() {
      swiperSlides.forEach((slide) => slide.classList.add("overflow-visible"));
    },
  },
});

const body = document.querySelector("body");
const playBtns = document.querySelectorAll(".play-btn");
const turnOverPhone = document.querySelector(".turnover-phone");
const media = document.querySelector(".media");
const closeMediaBtn = document.querySelector("#closeMedia");
const video = document.querySelector("#video");
const videoWrap = document.querySelector(".video-wrap");
const form = document.querySelector("#form");
const formSliderTrack = document.querySelector("form .slider-track");
const formNextBtn = document.querySelector(".form__next-btn");
const formPrevBtn = document.querySelector(".form__prev-btn");
const inputUname = form.querySelector("#uname");
const inputMail = form.querySelector("#mail");
const inputFake = form.querySelector("#fakeInput");
const inputPhone = form.querySelector("#phone");
const burgerBtn = document.querySelector(".burger");
const menuPage = document.querySelector(".menu-page");
const menuAboutUsBtn = document.querySelector("#menuAboutUs");
const navFeedbackBtn = document.querySelector("#navFeedback");
const aboutUsMobilePage = document.querySelector(".about-us-mobile");
const menuFeedbackPage = document.querySelector(".menu-page .feedback-page");
const menuOpenFeedbackBtn = document.querySelector("#feedback");
const menuPagePartTop = document.querySelector(".menu-page__part-top");
const menuPagePartBottom = document.querySelector(".menu-page__part-bottom");
const returnBtn = document.querySelector(".return-btn");
const upToHomeBtns = document.querySelectorAll(".upToHome");
const sliderTrackFruits = document.querySelector(".slider-track--fruits");
const sliderContainerFruits = document.querySelector(
  ".slider-container--fruits"
);

const breakpoints = {
  sm: 450,
  md: 540,
  lg: 768,
  xl: 1366,
};

const classes = {
  0: "apple",
  1: "tomato",
  2: "appleCitrus",
  3: "multiMix",
};

const colors = {
  0: "#8bd2b8",
  1: "#e7524c",
  2: "#fa7d3c",
  3: "#feca57",
  apple: "#56bb7f",
  tomato: "#f39070",
  appleCitrus: "#f29768",
  multiMix: "#f1bb23",
};

const sections = {
  0: document.querySelector(".apple"),
  1: document.querySelector(".tomato"),
  2: document.querySelector(".appleCitrus"),
  3: document.querySelector(".multiMix"),
};

let viewHeight = swiperContainer.offsetHeight; //100vh
let viewWidth = window.innerWidth;
let viewOrientation = defineOrientation(viewWidth, viewHeight);

let isAboutUsMobilePageOpen = false;
let isFeedbackPageOpen = false;
let isMenuPageOpen = false;

// ----------------< buttons onClick events handlers >--------------
function playBtnHundler() {
  let { activeIndex } = swiper;
  let fruitName = classes[activeIndex];
  let color = colors[fruitName];
  turnOverPhone.style.background = color;

  if (viewOrientation === "landscape") {
    turnOverPhone.style.zIndex = "-1";
  } else {
    turnOverPhone.style.zIndex = "1";
  }
  media.style.display = "flex";
  media.isActive = true;
  openFullscreen(media);
}
function closeMediaBtnHandler() {
  if (document.fullscreenElement) closeFullscreen(document);
  this.parentElement.style.display = "none";
}
function menuAboutUsBtnHandler() {
  burgerBtn.classList.add("burger--rotate");
  menuPagePartTop.classList.add("menu-page__part-top--active");
  menuPagePartBottom.classList.add("menu-page__part-bottom--active");
  aboutUsMobilePage.classList.add("about-us-mobile--active");
  menuOpenFeedbackBtn.classList.remove("feedback--active");
  isAboutUsMobilePageOpen = true;
}
function navFeedbackBtnHandler() {
  let documentHeight =
    Math.max(
      sections[0].offsetHeight,
      sections[1].offsetHeight,
      sections[2].offsetHeight,
      sections[3].offsetHeight
    ) + viewHeight;
  window.scroll(0, documentHeight);
}

function menuOpenFeedbackBtnHandler() {
  burgerBtn.classList.add("burger--rotate");
  menuPagePartTop.classList.add("menu-page__part-top--active");
  menuPagePartBottom.classList.add("menu-page__part-bottom--active");
  menuOpenFeedbackBtn.classList.add("feedback--active");
  aboutUsMobilePage.classList.remove("about-us-mobile--active");
  isFeedbackPageOpen = true;
}

function burgerBtnHandler() {
  if (isAboutUsMobilePageOpen || isFeedbackPageOpen) {
    burgerBtn.classList.remove("burger--rotate");
    menuPagePartTop.classList.remove("menu-page__part-top--active");
    menuPagePartBottom.classList.remove("menu-page__part-bottom--active");
    isAboutUsMobilePageOpen = false;
    isFeedbackPageOpen = false;
  } else {
    isMenuPageOpen = !isMenuPageOpen;
    body.classList.toggle("prevent-scrolling");
    menuPage.classList.toggle("menu-page--active");
    burgerBtn.classList.toggle("burger--active");

    if (isMenuPageOpen) {
      addFormToMenuPage();
      swiper.autoplay.stop();
    } else {
      addFormToSection();
      swiper.autoplay.start();
    }
  }
}

function returnBtnHandler() {
  window.scroll(0, 0);
}

function formNextBtnHandler() {
  formSliderTrack.classList.add("slider-track--translate");
  formSliderTrack.ontransitionend = function () {
    if (!inputPhone.isFocused) {
      inputPhone.focus();
      inputPhone.isFocused = true;
    } else {
      inputPhone.isFocused = false;
      inputMail.focus();
    }
  };
}

function formPrevBtnHandler() {
  formSliderTrack.classList.remove("slider-track--translate");
}

function swiperPaginatonBulletsHandlers() {
  swiperPaginatonBullets[swiper.activeIndex].classList.add(
    "swiper-pagination-bullet--active"
  );
  swiperPaginatonLines[swiper.activeIndex].classList.add(
    "swiper-pagination-line--active"
  );

  swiperPaginatonBullets.forEach((bullet, bulletIndex) => {
    bullet.onclick = function () {
      if (swiper.allowTouchMove) {
        swiper.slideTo(bulletIndex);
      } else return;
    };
  });
}

// ----------------</ buttons onClick events handlers >--------------

//-----< swiper slideChange event listeners >---------------

function changeMenuPageColor() {
  let { activeIndex, previousIndex } = swiper;
  if (previousIndex !== undefined) {
    menuPage.classList.remove(`menu-page--${classes[previousIndex]}`);
    menuFeedbackPage.classList.remove(`feedback--${classes[previousIndex]}`);
  }
  menuPage.classList.add(`menu-page--${classes[activeIndex]}`);
  menuFeedbackPage.classList.add(`feedback--${classes[activeIndex]}`);
}

function changeSwiperContainerBg() {
  let index = swiper.activeIndex;
  swiperContainer.style.backgroundColor = colors[index];
}

function sliderTrackFruitsTranslate() {
  let index = swiper.activeIndex;

  sliderTrackFruits.style.transform = `translate3d(${-index * 100 + "%"},0,0)`;
  sliderContainerFruits.style.height = sections[index].offsetHeight + "px";
}
function changeClassOfBulletWhenSlideChanged() {
  let activeIndex = swiper.activeIndex;
  let prevIndex = swiper.previousIndex;
  swiperPaginatonBullets[prevIndex].classList.remove(
    "swiper-pagination-bullet--active"
  );
  swiperPaginatonBullets[activeIndex].classList.add(
    "swiper-pagination-bullet--active"
  );
  swiperPaginatonLines[prevIndex].classList.remove(
    "swiper-pagination-line--active"
  );
  swiperPaginatonLines[activeIndex].classList.add(
    "swiper-pagination-line--active"
  );
}

//-----</ swiper slideChange event listeners >---------------

// ---------< control other states >----------
function preventSlideChanges() {
  if (window.scrollY > 60) {
    swiper.allowTouchMove = false;
    swiper.autoplay.stop();
  } else {
    if (!isMenuPageOpen) {
      swiper.allowTouchMove = true;
      swiper.autoplay.start();
    }
  }
}

function toggleReturnBtnActivity() {
  let index = swiper.activeIndex;

  let className = `return-btn--${classes[index]}`;
  if (window.scrollY > viewHeight) returnBtn.classList.add(className);
  else returnBtn.classList.remove(className);
}
// ---------</ control other states >----------

//---------------< initialize onClick events handlers >-----------------
burgerBtn.onclick = burgerBtnHandler;
menuAboutUsBtn.onclick = menuAboutUsBtnHandler;
navFeedbackBtn.onclick = navFeedbackBtnHandler;
menuOpenFeedbackBtn.onclick = menuOpenFeedbackBtnHandler;
returnBtn.onclick = returnBtnHandler;
formNextBtn.onclick = formNextBtnHandler;
formPrevBtn.onclick = formPrevBtnHandler;
upToHomeBtns.forEach((btn) => {
  btn.onclick = returnBtnHandler;
});
playBtns.forEach((btn) => {
  btn.onclick = playBtnHundler;
});
closeMediaBtn.onclick = closeMediaBtnHandler;

inputFake.onfocus = formNextBtn.onclick;
//---------------</ initialize onClick events handlers >-----------------

function addFormToSection() {
  let index = swiper.activeIndex;
  let container = document.querySelector(`.${classes[index]} .form-container`);
  container.append(form);
}

function addFormToMenuPage() {
  let container = document.querySelector(".menu-page .form-container");
  container.append(form);
}

function init() {
  menuPage.style.display = "block";
  changeMarkupOfForm(viewWidth >= breakpoints.lg);
  sliderTrackFruitsTranslate();
  changeMenuPageColor();
  addFormToSection();
  changeSwiperContainerBg();
  swiperPaginatonBulletsHandlers();
  //test-----------
  determineWidth();
  //test
  swiper.on("slideChange", () => {
    Promise.resolve(
      changeClassOfBulletWhenSlideChanged(),
      sliderTrackFruitsTranslate(),
      changeMenuPageColor(),
      addFormToSection(),
      changeSwiperContainerBg()
    );
  });
}
//update 100vh
//TODO
function updateViewHeight() {}

function changeMarkupOfForm(threshold) {
  const formFirst = document.querySelector(".form--first");
  const formSecond = document.querySelector(".form--second");
  const formBtnsSecond = document.querySelector(".form__btns--second");
  const formPhone = document.querySelector(".form__phone");
  const submitBtn = document.querySelector(".feedback__submit");
  if (threshold) {
    formFirst.append(formPhone);
    form.append(submitBtn);
  } else {
    formSecond.prepend(formPhone);
    formBtnsSecond.append(submitBtn);
  }
}

window.addEventListener("load", init, false);
window.cc = 0;
window.addEventListener(
  "resize",
  function () {
    //

    window.rr = `resize ${++window.cc}`;
    //
    let currentViewWidth = window.innerWidth;
    let currentViewHeight = window.innerHeight;
    viewOrientation = defineOrientation(currentViewWidth, currentViewHeight);

    if (currentViewWidth !== viewWidth) {
      console.log("change width in RESIZE");
      viewWidth = currentViewWidth;
      changeMarkupOfForm(currentViewWidth >= breakpoints.lg);
    }
    if (media.isActive) {
      turnOverPhone.style.zIndex = -1;
    }

    sliderTrackFruitsTranslate();

    //test
    determineWidth();
    //
  },
  false
);

window.addEventListener(
  "scroll",
  () => {
    preventSlideChanges();
    toggleReturnBtnActivity();
  },
  false
);
//---------------helpers-------------

function defineOrientation(width, height) {
  return width >= height ? "landscape" : "portrait";
}
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}
function closeFullscreen(elem) {
  if (elem.exitFullscreen) {
    elem.exitFullscreen();
  } else if (elem.webkitExitFullscreen) {
    elem.webkitExitFullscreen();
  } else if (elem.msExitFullscreen) {
    elem.msExitFullscreen();
  }
}

//--------------/ helpers------------

//---------------test-----------------//
function determineWidth() {
  let infoDiv = document.getElementById("infoDiv");
  if (!infoDiv) infoDiv = document.createElement("div");

  infoDiv.id = "infoDiv";
  infoDiv.style.position = "fixed";
  infoDiv.style.zIndex = "999999";
  infoDiv.style.top = "20%";
  infoDiv.style.left = "20%";
  infoDiv.style.background = "gray";
  infoDiv.innerHTML = `<h3>viewHeight : ${viewHeight}</h3>
  <h3>innerHeight : ${window.innerHeight}</h3>
  <h3>resize : ${window.rr}</h3>
  <h3>homePage height : ${swiperContainer.offsetHeight}</h3>
  <h3>event : ${window.event.key}</h3>`;
  document.body.append(infoDiv);
}

window.onpopstate = function () {
  media.style.display = "none";
  console.log("popstate");
};
window.addEventListener("fullscreenchange", () => console.log("change"));

// function toggleFullScreen() {
//   if (document.fullscreenElement) {
//     document
//       .exitFullscreen()
//       .then(() => console.log("Document Exited from Full screen mode"))
//       .catch((err) => console.error(err));
//   } else {
//     document.documentElement.requestFullscreen();
//   }
// }
//document.ondblclick = toggleFullScreen;
//videoWrap.ondblclick = stopProp;

document.addEventListener("keydown", () => {
  determineWidth();
});

//---------/test-----------
