import Swiper from "swiper";
import SwiperCore, { Navigation, Parallax, Autoplay } from "swiper/core";

const scroll = new SmoothScroll();

SwiperCore.use([Navigation, Parallax, Autoplay]);

const swiperContainer = document.querySelector(".swiper-container");
const swiperSlides = document.querySelectorAll(".swiper-slide");
const swiperPaginatonBullets = document.querySelectorAll(
  ".swiper-pagination-bullet"
);
const swiperPaginatonLines = document.querySelectorAll(
  ".swiper-pagination-line"
);
const swiperButtonPrev = document.querySelector(".swiper-button-prev");
const swiperButtonNext = document.querySelector(".swiper-button-next");

let swiper = new Swiper(".swiper-container", {
  speed: 2000,
  effect: "slide",
  parallax: true,
  shortSwipes: true,
  longSwipesRatio: 0.1,
  threshold: 5,
  longSwipesMs: 200,
  touchRatio: 0.6,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init() {
      swiperSlides.forEach((slide) => slide.classList.add("overflow-visible"));
    },
  },
});

swiper.autoplay.stop();

const body = document.querySelector("body");
const header = document.querySelector(".header");
const logo = document.querySelector(".logo");
const playBtns = document.querySelectorAll(".play-btn");
const bottomBtn = document.querySelector("#bottom-sign");
const turnOverPhone = document.querySelector(".turnover-phone");
const media = document.querySelector(".media");
//const videoIframe = document.querySelector(".video-block-iframe");
const closeMediaBtn = document.querySelector("#closeMedia");
//const video = document.querySelector("#video");

const form = document.querySelector("#form");
const formSliderTrack = form.querySelector("form .slider-track");
const formNextBtn = form.querySelector(".form__next-btn");
const formPrevBtn = form.querySelector(".form__prev-btn");
const formFirst = form.querySelector(".form--first");
const formSecond = form.querySelector(".form--second");
const formBtnsSecond = form.querySelector(".form__btns--second");
const formPhone = form.querySelector(".form__phone");
const submitBtn = form.querySelector(".feedback__submit");
const inputUname = form.querySelector("#uname");
const inputMail = form.querySelector("#mail");
const inputFake = form.querySelector("#fakeInput");
const inputPhone = form.querySelector("#phone");

const burgerBtn = document.querySelector(".burger");
const menuPage = document.querySelector(".menu-page");
const menuAboutUsBtn = document.querySelector("#menuAboutUs");
const navFeedbackBtn = document.querySelector("#navFeedback");
const navAboutUsBtn = document.querySelector("#navAboutUs");
const closeAboutUsDesktopBtn = document.querySelector("#closeAboutUsDesktop");
const aboutUsMobilePage = document.querySelector(".about-us-mobile");
const aboutUsDesktopPage = document.querySelector(".about-us-desktop");

const menuFeedbackBtn = document.querySelector("#feedback");
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
const videoID = {
  0: "ZlU3grnfbYc",
  1: "A3INew9TAB8",
  2: "_B3u9qIrC6U",
  3: "Vaix8Jt-gSo",
};

const sections = {
  0: document.querySelector(".apple"),
  1: document.querySelector(".tomato"),
  2: document.querySelector(".appleCitrus"),
  3: document.querySelector(".multiMix"),
};

let viewHeight = window.innerHeight;

let isAboutUsMobilePageOpen = false;

let isMenuPageOpen = false;
let isReturnBtnActive = false;
let device = window.innerWidth >= 768 ? "desktop" : "mobile";

// ----------------< buttons onClick events handlers >--------------
function playBtnHundler() {
  let { activeIndex } = swiper;
  if (YT && playerYT instanceof YT.Player) {
    playerYT.cueVideoById(videoID[activeIndex]);
  }

  let fruitName = classes[activeIndex];
  let color = colors[fruitName];
  media.style.backgroundColor = color;

  media.style.display = "block";
  media.isActive = true;
}
function closeMediaBtnHandler() {
  this.parentElement.style.display = "none";
  if (YT && playerYT instanceof YT.Player) {
    playerYT.pauseVideo();
  }
}

const feedbackPags = document.querySelectorAll(".feedback-page");

function navFeedbackBtnHandler() {
  // let documentHeight =
  //   Math.max(
  //     sections[0].offsetHeight,
  //     sections[1].offsetHeight,
  //     sections[2].offsetHeight,
  //     sections[3].offsetHeight
  //   ) + viewHeight;
  //scroll.animateScroll(documentHeight);
  let anchor = feedbackPags[swiper.activeIndex];
  let toggle = navFeedbackBtn;
  let options = { speed: 500, easing: "easeOutCubic" };

  scroll.animateScroll(anchor, toggle, options);
  // console.log(swiper);
  // window.scroll(0, documentHeight);
}

function menuFeedbackBtnHandler() {
  closeMenu();
  navFeedbackBtnHandler();
}

function openMenu() {
  burgerBtn.classList.add("burger--active");
  menuPage.classList.add("menu-page--active");

  preventSlideChange();
  removeHeaderBg();
  isMenuPageOpen = true;
}
function closeMenu() {
  burgerBtn.classList.remove("burger--active");
  menuPage.classList.remove("menu-page--active");
  allowSlideChange();

  if (window.scrollY > viewHeight) {
    addHeaderBg();
  }
  isMenuPageOpen = false;
}

function openAboutUsMobilePage() {
  aboutUsMobilePage.classList.add("about-us-mobile--active");
  isAboutUsMobilePageOpen = true;
  logo.style.visibility = "hidden";
}
function closeAboutUsMobilePage() {
  aboutUsMobilePage.classList.remove("about-us-mobile--active");
  isAboutUsMobilePageOpen = false;
  logo.style.visibility = "visible";
}
function openAboutUsDesktopPage() {
  aboutUsDesktopPage.classList.add("about-us-desktop--active");
}
function closeAboutUsDesktopPage() {
  aboutUsDesktopPage.classList.remove("about-us-desktop--active");
}

function burgerBtnHandler() {
  if (isAboutUsMobilePageOpen) {
    closeAboutUsMobilePage();
    return;
  }

  if (!isMenuPageOpen) {
    openMenu();
  } else {
    closeMenu();
  }
}

function returnBtnHandler() {
  scroll.animateScroll(0);
}

function bottomBtnHandler() {
  scroll.animateScroll(swiperContainer.offsetHeight);
}
function formNextBtnHandler() {
  formSliderTrack.classList.add("slider-track--translate");
}

function formPrevBtnHandler() {
  formSliderTrack.classList.remove("slider-track--translate");
}

function _active() {
  swiper.slideTo(0);
}

function changeButtonNextDefaultAction() {
  let { activeIndex, slides } = swiper;
  if (activeIndex + 1 === slides.length) {
    swiperButtonNext.addEventListener("click", _active);
  } else {
    swiperButtonNext.removeEventListener("click", _active);
  }
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

//-----------------< focuse events handlers >-----------------
function inputUnameBlurHandler() {
  let svg = inputUname.nextElementSibling;
  if (!validateName(inputUname.value)) {
    inputUname.isValid = false;
    svg.style.stroke = "red";
  } else {
    svg.style.stroke = "";
    inputUname.isValid = true;
  }
}
function inputEmailBlurHandler() {
  let svg = inputMail.nextElementSibling;
  if (!validateEmail(inputMail.value)) {
    inputMail.isValid = false;
    svg.style.stroke = "red";
  } else {
    svg.style.stroke = "";
    inputMail.isValid = true;
  }
}

function inputPhoneBlurHandler() {
  let svg = inputPhone.nextElementSibling;
  if (!validatePhone(inputPhone.value)) {
    inputPhone.isValid = false;
    svg.style.stroke = "red";
  } else {
    inputPhone.isValid = true;
    svg.style.stroke = "";
  }
}

function hasInvalidRequiredInput() {
  let formElems = form.elements;
  for (let elem of formElems) {
    if (elem.dataset.required) {
      if (!elem.isValid) {
        return true;
      }
    }
  }
  return false;
}

function successMessage() {
  form.style.display = "none";
  const formContainers = document.querySelectorAll(".form-container");
  const gratitude = document.querySelector(".gratitude");
  formContainers.forEach((container) => {
    container.classList.add("form-gratitude");

    container.append(gratitude.cloneNode(true));
  });
}

function inputFakeFocusHandler() {
  inputFake.isActive = true;
  formNextBtnHandler();
}
inputUname.onblur = inputUnameBlurHandler;
inputMail.onblur = inputEmailBlurHandler;
inputPhone.onblur = inputPhoneBlurHandler;
inputFake.onfocus = inputFakeFocusHandler;
//-----------------</ focuse events handlers >-----------------

//-----------------< transition events handlers >-----------------
formSliderTrack.ontransitionend = function () {
  if (inputFake.isActive) {
    inputPhone.focus();
    inputFake.isActive = false;
  }
};
//---------------------</ transition events handlers >-------------

//--------------------< submit event handler >---------------

function submitHandler(e) {
  e.preventDefault();
  if (hasInvalidRequiredInput()) {
    inputUnameBlurHandler();
    inputEmailBlurHandler();
    inputPhoneBlurHandler();
    return;
  }
  let formData = new FormData(form);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (response.ok) successMessage();
      else alert(response, " error");
    })
    .catch((err) => alert("catch", err));
}

form.onsubmit = submitHandler;

//-----< swiper slideChange event listeners >---------------

function changeMenuPageBgColor() {
  let { activeIndex, previousIndex } = swiper;
  let fruitName = classes[activeIndex];
  let color = colors[fruitName];
  menuPagePartTop.style.backgroundColor = color;
  menuPagePartBottom.style.backgroundColor = color;
}

function changeSwiperContainerBgColor() {
  let index = swiper.activeIndex;
  swiperContainer.style.backgroundColor = colors[index];
}
function changeSwiperButtonsBgColor() {
  let { activeIndex, slides } = swiper;
  let nextIndex = activeIndex + 1 === slides.length ? 0 : activeIndex + 1;
  let lastElemIndex = slides.length - 1;
  let prevIndex = activeIndex === 0 ? lastElemIndex : activeIndex - 1;

  swiperButtonPrev.firstElementChild.style.fill = colors[prevIndex];
  swiperButtonNext.firstElementChild.style.fill = colors[nextIndex];
}

function sliderTrackFruitsTranslate() {
  let index = swiper.activeIndex;

  sliderTrackFruits.style.transform = `translate3d(${-index * 100 + "%"},0,0)`;
  changeFruitsSliderHeight();
}
function changeFruitsSliderHeight() {
  let index = swiper.activeIndex;
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

function addHeaderBg() {
  let index = swiper.activeIndex;
  header.classList.add("header--sticky");
  header.classList.add(`header--${classes[index]}`);
}
function removeHeaderBg() {
  let index = swiper.activeIndex;
  header.classList.remove("header--sticky");
  header.classList.remove(`header--${classes[index]}`);
}
function preventSlideChange() {
  swiper.autoplay.stop();
  swiper.allowTouchMove = false;
}
function allowSlideChange() {
  swiper.allowTouchMove = true;
}

function toggleReturnBtnActivity() {
  let index = swiper.activeIndex;
  let className = `return-btn--${classes[index]}`;
  returnBtn.classList.toggle(className);
  isReturnBtnActive = !isReturnBtnActive;
}
// ---------</ control other states >----------

//---------------< initialize onClick events handlers >-----------------
burgerBtn.onclick = burgerBtnHandler;
menuAboutUsBtn.onclick = openAboutUsMobilePage;
navFeedbackBtn.onclick = navFeedbackBtnHandler;
navAboutUsBtn.onclick = openAboutUsDesktopPage;
closeAboutUsDesktopBtn.onclick = closeAboutUsDesktopPage;
bottomBtn.onclick = bottomBtnHandler;
menuFeedbackBtn.onclick = menuFeedbackBtnHandler;
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

//---------------</ initialize onClick events handlers >-----------------

function addFormToSection() {
  let index = swiper.activeIndex;
  let container = document.querySelector(`.${classes[index]} .form-container`);
  container.append(form);
}

function init() {
  //videoIframe.src = "https://www.youtube.com/embed/7bJfOfefk_o";
  menuPage.style.display = "block";
  viewHeight = swiperContainer.offsetHeight;
  if (window.innerWidth >= 768) changeFormMarkupForDesktop();
  if (window.innerHeight < viewHeight) swiper.autoplay.start();

  changeFruitsSliderHeight();
  changeMenuPageBgColor();
  addFormToSection();
  changeSwiperContainerBgColor();
  changeSwiperButtonsBgColor();
  swiperPaginatonBulletsHandlers();
  swiperButtonPrevVisibility();
  changeButtonNextDefaultAction();
  //test-----------
  //determineWidth();
  //test
  swiper.on("slideChange", () => {
    Promise.resolve(
      swiperButtonPrevVisibility(),
      changeClassOfBulletWhenSlideChanged(),
      sliderTrackFruitsTranslate(),
      changeMenuPageBgColor(),
      changeSwiperButtonsBgColor(),
      addFormToSection(),
      changeSwiperContainerBgColor(),
      changeButtonNextDefaultAction()
    );
  });
}
//update 100vh
//TODO

function changeFormMarkupForDesktop() {
  formFirst.append(formPhone);
  form.append(submitBtn);
}
function changeFormMarkupForMobile() {
  formSecond.prepend(formPhone);
  formBtnsSecond.append(submitBtn);
}

window.addEventListener("load", init, false);

window.addEventListener(
  "resize",
  function () {
    //

    window.rr = `resize ${++window.cc}`;

    changeFruitsSliderHeight();

    //test
    //determineWidth();
    //
  },
  false
);

window.addEventListener(
  "scroll",
  () => {
    if (device === "mobile") {
      if (!isReturnBtnActive && window.scrollY >= viewHeight) {
        toggleReturnBtnActivity();
        if (!isMenuPageOpen) addHeaderBg();
      } else if (isReturnBtnActive && window.scrollY < viewHeight) {
        toggleReturnBtnActivity();
        removeHeaderBg();
      }
    }
    if (swiper.allowTouchMove && window.scrollY > 100) {
      preventSlideChange();
    } else if (!swiper.allowTouchMove && window.scrollY < 100) {
      allowSlideChange();
    }
  },
  false
);
//---------------helpers-------------

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email.trim()).toLowerCase());
}
function validateName(name) {
  return name && name.length > 1;
}
function validatePhone(phone) {
  return phone.length > 1;
}

function swiperButtonPrevVisibility() {
  if (!swiper.activeIndex) {
    swiperButtonPrev.style.visibility = "hidden";
  } else swiperButtonPrev.style.visibility = "visible";
}

const mediaQuery = window.matchMedia("(min-width:768px)");
function changeFormMarkup(e) {
  if (e.matches) {
    device = "desktop";
    changeFormMarkupForDesktop();
    removeHeaderBg();
  } else {
    device = "mobile";
    changeFormMarkupForMobile();
  }
}

mediaQuery.addEventListener("change", changeFormMarkup);

//---------/test-----------
