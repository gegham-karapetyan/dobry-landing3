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

  touchRatio: 0.5,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init() {
      console.log("init");
      swiperSlides.forEach((slide) => slide.classList.add("overflow-visible"));
    },
  },
});

swiper.autoplay.stop();

const body = document.querySelector("body");
const header = document.querySelector(".header");
const logo = document.querySelector(".logo");
const playBtns = document.querySelectorAll(".play-btn");
const turnOverPhone = document.querySelector(".turnover-phone");
const media = document.querySelector(".media");
const closeMediaBtn = document.querySelector("#closeMedia");
const video = document.querySelector("#video");

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
const menuOpenAboutUsBtn = document.querySelector("#menuAboutUs");
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

let isAboutUsMobilePageOpen = false;
let isFeedbackPageOpen = false;
let isMenuPageOpen = false;
let isReturnBtnActive = false;
let device = window.innerWidth >= 768 ? "desktop" : "mobile";

// ----------------< buttons onClick events handlers >--------------
function playBtnHundler() {
  let { activeIndex } = swiper;
  let fruitName = classes[activeIndex];
  let color = colors[fruitName];
  turnOverPhone.style.background = color;

  media.style.display = "flex";
  media.isActive = true;
  openFullscreen(media);
}
function closeMediaBtnHandler() {
  if (document.fullscreenElement) closeFullscreen(document);
  video.pause();
  this.parentElement.style.display = "none";
}
function menuOpenAboutUsBtnHandler() {
  logo.style.visibility = "hidden";
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
  aboutUsMobilePage.classList.remove("about-us-mobile--active");
  isFeedbackPageOpen = true;
}

function burgerBtnHandler() {
  if (isAboutUsMobilePageOpen || isFeedbackPageOpen) {
    logo.style.visibility = "visible";
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
      preventSlideChange();
    } else {
      addFormToSection();
      allowSlideChange();
    }
  }
}

function returnBtnHandler() {
  window.scroll(0, 0);
}

function formNextBtnHandler() {
  formSliderTrack.classList.add("slider-track--translate");
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

//-----------------< focuse events handlers >-----------------
function inputUnameBlurHandler() {
  let svg = this.nextElementSibling;
  if (!validateName(this.value)) {
    this.isValid = false;
    svg.style.stroke = "red";
  } else {
    svg.style.stroke = "";
    this.isValid = true;
  }
}
function inputEmailBlurHandler() {
  let svg = this.nextElementSibling;
  if (!validateEmail(this.value)) {
    this.isValid = false;
    svg.style.stroke = "red";
  } else {
    svg.style.stroke = "";
    this.isValid = true;
  }
}

function inputPhoneBlurHandler() {
  let svg = this.nextElementSibling;
  if (!validatePhone(this.value)) {
    this.isValid = false;
    svg.style.stroke = "red";
  } else {
    this.isValid = true;
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
    console.log(container);
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
  if (hasInvalidRequiredInput()) return;
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
  _changeFeedbackPageBgColor(activeIndex, previousIndex);
}

function _changeFeedbackPageBgColor(activeIndex, previousIndex) {
  if (previousIndex !== undefined)
    menuFeedbackPage.classList.remove(`feedback--${classes[previousIndex]}`);
  menuFeedbackPage.classList.add(`feedback--${classes[activeIndex]}`);
}

function changeSwiperContainerBgColor() {
  let index = swiper.activeIndex;
  swiperContainer.style.backgroundColor = colors[index];
}
function changeSwiperButtonsBgColor() {
  let { activeIndex, previousIndex } = swiper;
  let nextIndex = (activeIndex + 1) % 4;
  let prevIndex = activeIndex === 0 ? 3 : previousIndex;

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

function toggleHeaderBg() {
  let index = swiper.activeIndex;
  header.classList.toggle("header--sticky");
  header.classList.toggle(`header--${classes[index]}`);
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
menuOpenAboutUsBtn.onclick = menuOpenAboutUsBtnHandler;
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
  if (window.innerWidth >= 768) changeFormMarkupForDesktop();
  swiper.autoplay.start();

  changeFruitsSliderHeight();
  changeMenuPageBgColor();
  addFormToSection();
  changeSwiperContainerBgColor();
  changeSwiperButtonsBgColor();
  swiperPaginatonBulletsHandlers();
  //test-----------
  //determineWidth();
  //test
  swiper.on("slideChange", () => {
    Promise.resolve(
      changeClassOfBulletWhenSlideChanged(),
      sliderTrackFruitsTranslate(),
      changeMenuPageBgColor(),
      changeSwiperButtonsBgColor(),
      addFormToSection(),
      changeSwiperContainerBgColor()
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
window.cc = 0;
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
      console.log(device);
      if (!isReturnBtnActive && window.scrollY >= viewHeight) {
        toggleReturnBtnActivity();
        toggleHeaderBg();
      } else if (isReturnBtnActive && window.scrollY < viewHeight) {
        toggleReturnBtnActivity();
        toggleHeaderBg();
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
  console.log(name);
  return name.length > 1;
}
function validatePhone(phone) {
  return phone.length > 1;
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
// function determineWidth() {
//   let infoDiv = document.getElementById("infoDiv");
//   if (!infoDiv) infoDiv = document.createElement("div");

//   infoDiv.id = "infoDiv";
//   infoDiv.style.position = "fixed";
//   infoDiv.style.zIndex = "999999";
//   infoDiv.style.top = "20%";
//   infoDiv.style.left = "20%";
//   infoDiv.style.background = "gray";
//   infoDiv.innerHTML = `<h3>viewHeight : ${viewHeight}</h3>
//   <h3>innerHeight : ${window.innerHeight}</h3>
//   <h3>resize : ${window.rr}</h3>
//   <h3>homePage height : ${swiperContainer.offsetHeight}</h3>
//   <h3>event : ${window.event.key}</h3>
//   <h3>100vh : ${gage.offsetHeight}</h3>`;
//   document.body.append(infoDiv);
// }

// document.addEventListener("keydown", () => {
//   determineWidth();
// });

const mediaQuery = window.matchMedia("(min-width:768px)");
function changeFormMarkup(e) {
  if (e.matches) {
    device = "desktop";
    changeFormMarkupForDesktop();
  } else {
    device = "mobile";
    changeFormMarkupForMobile();
  }
}

mediaQuery.addEventListener("change", changeFormMarkup);

//---------/test-----------
