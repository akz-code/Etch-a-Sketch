// Important variables

const eraser = document.querySelector(".eraser");
const selectColor = document.querySelector(".selectColor");
const randomColor = document.querySelector(".randomColor");

let colorSelection = [];
let selector = false;

const sketchContainer = document.querySelector("#sketchContainer");
const slider = document.querySelector("#slider");
const sliderNumber = document.querySelector(".sliderNumber");

// Create default 16x16 grid of divs

const createDivs = function (sliderValor) {
  sketchContainer.style.display = "grid";
  sketchContainer.style.gridTemplateColumns = `repeat(${sliderValor}, 1fr)`;
  sketchContainer.style.gridTemplateRows = `repeat(${sliderValor}, 1fr)`;
  let mousedown = false;

  for (let i = 0; i < sliderValor * sliderValor; i++) {
    const itemSketch = document.createElement("div");
    itemSketch.classList.add("itemSketch");

    itemSketch.addEventListener("mousedown", () => {
      mousedown = true;
    });

    itemSketch.addEventListener("mouseup", () => {
      mousedown = false;
    });
    itemSketch.addEventListener("mousemove", (e) => {
      if (mousedown) {
        itemSketch.style.background = "black";
      }
    });

    // Eventos táctiles
    itemSketch.addEventListener("touchstart", (e) => {
      e.preventDefault();
      mousedown = true;
    });
    itemSketch.addEventListener("touchend", () => {
      mousedown = false;
    });
    itemSketch.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (e.touches.length > 0 && mousedown) {
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.classList.contains("itemSketch")) {
          element.style.background = "black";
        }
      }
    });
    sketchContainer.appendChild(itemSketch);
    sliderNumber.textContent = slider.value;
  }
};

createDivs(16);

//Change divs size

const changeGridSize = function () {
  const allDivs = document.querySelectorAll(".itemSketch");

  allDivs.forEach((div) => {
    return div.remove();
  });

  createDivs(slider.value);
};

slider.addEventListener("mouseup", changeGridSize);
slider.addEventListener("touchend", changeGridSize);

// *Color function

/* const addColor = function () {}; */

// *Creating functions and events for different choices

/* randomColor.addEventListener("click", function () {
  colorSelection = "rainbow";
});
selectColor.addEventListener("click", function () {
  colorSelection = "colorPickButton";
});
eraser.addEventListener("click", function () {
  colorSelection = "eraser";
}); */

/* const getColorChoice = function () {
  if (colorSelection === "rainbow") {
    let randomN = Math.floor(Math.random() * 360);
  color = `hsl(${randomN}, 100%, 50%)`;
  itemSketch.style.backgroundColor = "blue";
  }
  
}; */
