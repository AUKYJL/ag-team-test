import { mainSlider } from "./sliders.js";
const gamePie = document.querySelector("#pie");
const loginBtn = document.querySelector(".right-header").children[0];
const userBtn = document.querySelector(".right-header").children[1];
const swiperWrapper = document.querySelector(".swiper-wrapper");
const mainImgs = [...document.querySelector(".main__bg-ibg").children];
const initialTransformProperties = [
  { x: "0%", y: "-100%" },
  { x: "0%", y: "100%" },
  { x: "0%", y: "-100%" },
  { x: "-100%", y: "0%" },
  { x: "100%", y: "0%" },
  { x: "-100%", y: "0%" },
  { x: "100%", y: "0%" },
];
const pieSpinning = () => {
  const btn = document.querySelector(".btn-game");
  if (btn.classList.contains("_active")) return;
  btn.classList.add("_active");
  const randomRotation = Math.floor(Math.random() * 7);
  const rotationCount = 360 * 6;
  const sectorDegree = 51.5;
  const startDegree = 0;
  const totalRotation =
    randomRotation * sectorDegree + rotationCount + startDegree;
  gsap.set(gamePie, { rotation: startDegree });
  gsap.to(gamePie, {
    rotation: totalRotation,
    duration: 7,
    ease: "power1.inOut",
    onComplete: () => {
      btn.classList.remove("_active");
    },
  });
};
const setDefaultStateExceptCurrent = (numberSlide) => {
  mainImgs.map((img, index) => {
    if (index !== numberSlide) {
      gsap.to(img, {
        x: initialTransformProperties[index].x,
        y: initialTransformProperties[index].y,
        duration: 0.5,
        onComplete: () => {
          gsap.set(mainImgs[numberSlide], { zIndex: 1 });
        },
      });
    }
  });
};
const setActiveSlide = (numberSlide) => {
  gsap.set(mainImgs[numberSlide], {
    zIndex: 3,
  });
  gsap.to(mainImgs[numberSlide], {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "power1.inOut",
    onComplete: () => {
      setDefaultStateExceptCurrent(numberSlide);
    },
  });
};
document.addEventListener("click", (e) => {
  const el = e.target;
  const dropdown = document.querySelector(".dropdown-right-header");
  if (el.closest("._user")) {
    dropdown.classList.toggle("_active");
  } else {
    dropdown.classList.remove("_active");
  }
  if (el.closest(".btn-game")) {
    pieSpinning();
  }
  if (el.closest("#login-btn")) {
    loginBtn.classList.remove("_login");
    userBtn.classList.add("_login");
  }
  if (el.closest(".swiper-button-prev")) {
    const prevSlide = +document
      .querySelector(".swiper-slide-active")
      .getAttribute("data-swiper-slide-index");

    setActiveSlide(prevSlide);
  }
  if (el.closest(".swiper-button-next")) {
    const nextSlide = +document
      .querySelector(".swiper-slide-active")
      .getAttribute("data-swiper-slide-index");
    setActiveSlide(nextSlide);
  }
});

const dropZone = document.querySelector("#dropzone");
if (dropZone) {
  let hoverClassName = "hover";

  dropZone.addEventListener("dragenter", function (e) {
    e.preventDefault();
    dropZone.classList.add(hoverClassName);
  });

  dropZone.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropZone.classList.add(hoverClassName);
  });

  dropZone.addEventListener("dragleave", function (e) {
    e.preventDefault();
    dropZone.classList.remove(hoverClassName);
  });

  // Это самое важное событие, событие, которое дает доступ к файлам
  dropZone.addEventListener("drop", function (e) {
    e.preventDefault();
    dropZone.classList.remove(hoverClassName);

    const files = Array.from(e.dataTransfer.files);
    const labelBtn = document.querySelector("#check-popup-load");
    labelBtn.textContent = `Обработка ${files[0].name}...`;
  });
}

document.addEventListener("DOMContentLoaded", (e) => {
  mainImgs.forEach((img, index) => {
    gsap.set(img, {
      x: initialTransformProperties[index].x,
      y: initialTransformProperties[index].y,
      zIndex: 1,
    });
  });
  gsap.set(mainImgs[0], {
    x: 0,
    y: 0,
    zIndex: 3,
  });
});

swiperWrapper.addEventListener("mouseover", (e) => {
  const slide = e.target.closest(".swiper-slide");
  slide.classList.add("_hovered");
  const numberSlide = slide.getAttribute("data-swiper-slide-index");
  const activeSlide = document.querySelector(".swiper-slide-active");
  const activeNumberSlide = activeSlide.getAttribute("data-swiper-slide-index");
  gsap.set(mainImgs[numberSlide], {
    zIndex: 3,
    delay: numberSlide === activeNumberSlide ? 0.5 : 0,
  });
  gsap.to(mainImgs[numberSlide], {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "power1.inOut",
  });
});

swiperWrapper.addEventListener("mouseout", (e) => {
  const slide = e.target.closest(".swiper-slide");
  slide.classList.remove("_hovered");
  const numberSlide = +slide.getAttribute("data-swiper-slide-index");
  const isActive = slide.classList.contains("swiper-slide-active");
  if (isActive) {
    setDefaultStateExceptCurrent(numberSlide);
    return;
  }

  gsap.to(mainImgs[numberSlide], {
    x: initialTransformProperties[numberSlide].x,
    y: initialTransformProperties[numberSlide].y,
    duration: 0.5,
    ease: "power1.inOut",
    onComplete: () => {
      if (!slide.classList.contains("_hovered"))
        gsap.set(mainImgs[numberSlide], { zIndex: 1 });
    },
  });
});

// swiperWrapper.addEventListener("click", (e) => {
//   const slide = e.target.closest(".swiper-slide");
//   const numberSlide = +slide.getAttribute("data-swiper-slide-index");
//   setActiveSlide(numberSlide);
// });

mainSlider.on("slideChange", () => {
  const activeIndex = mainSlider.activeIndex;
  const activeSlide = mainSlider.slides[activeIndex];
  const numberSlide = activeSlide.getAttribute("data-swiper-slide-index");
  setActiveSlide(numberSlide);
});
