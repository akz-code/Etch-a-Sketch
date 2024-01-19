// Important variables

const eraser = document.querySelector(".eraser");
const selectColor = document.querySelector("#selectColor");
const buttonBlack = document.querySelector(".black");
const randomColor = document.querySelector(".randomColor");

let colorSelection = "black";

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
        paintDiv(itemSketch, colorSelection);
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
          element.style.background = colorSelection;
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

// Eraser

eraser.addEventListener("click", () => {
  colorSelection = "white";
  selectColor.value = "#ffffff";
});

// Change color

const paintDiv = function (div, color) {
  div.style.background = color;
};

selectColor.addEventListener("change", function (e) {
  colorSelection = e.target.value;
});

buttonBlack.addEventListener("click", () => {
  selectColor.value = "#000000";
  colorSelection = selectColor.value;
});
