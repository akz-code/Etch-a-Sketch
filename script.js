// Important variables

const eraser = document.querySelector(".eraser");
const selectColor = document.querySelector("#selectColor");
const buttonBlack = document.querySelector(".black");
const randomColor = document.querySelector(".randomColor");
const resetButton = document.querySelector(".reset");
const buttons = document.querySelectorAll("button");

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
      if (colorSelection === "rainbow") {
        paintDiv(itemSketch, getRandomColor());
      } else {
        paintDiv(itemSketch, colorSelection);
      }
      mousedown = true;
    });

    itemSketch.addEventListener("mouseup", () => {
      mousedown = false;
    });
    itemSketch.addEventListener("mousemove", (e) => {
      if (mousedown) {
        if (colorSelection === "rainbow") {
          paintDiv(itemSketch, getRandomColor());
        } else {
          paintDiv(itemSketch, colorSelection);
        }
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
          if (colorSelection === "rainbow") {
            element.style.background = getRandomColor();
          } else {
            element.style.background = colorSelection;
          }
        }
      }
    });
    sketchContainer.appendChild(itemSketch);
    sliderNumber.textContent = slider.value;
  }
};

createDivs(16);

// Muestra los bordes de los divs por un tiempo breve

const showBorders = () => {
  const divs = document.querySelectorAll('.itemSketch');
  divs.forEach(div => div.classList.add('border-visible'));

  // Establece el tiempo después del cual el borde desaparecerá
  setTimeout(() => {
    divs.forEach(div => div.classList.remove('border-visible'));
  }, 150); 
}

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
slider.addEventListener("mouseup", showBorders);
slider.addEventListener("touchend", showBorders);

// Eraser

eraser.addEventListener("click", () => {
  colorSelection = "white";
  selectColor.value = "#ffffff";

  buttons.forEach((button) => {
    button.style.background = "white";
  });
  eraser.style.background = "rgba(0, 0, 255, 0.274)";
  buttonBlack.style.color = "black";
});

// Change color

const paintDiv = function (div, color) {
  div.style.background = color;
};

selectColor.addEventListener("change", function (e) {
  colorSelection = e.target.value;
  buttons.forEach((button) => {
    button.style.background = "white";
  });
  buttonBlack.style.color = "black";
});

buttonBlack.addEventListener("click", () => {
  selectColor.value = "#000000";
  colorSelection = selectColor.value;

  buttons.forEach((button) => {
    button.style.background = "white";
  });

  buttonBlack.style.background = "black";
  buttonBlack.style.color = "white";
});

// Random color

const getRandomColor = function () {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  selectColor.value = color;
  return color;
};

randomColor.addEventListener("click", () => {
  colorSelection = "rainbow";

  buttons.forEach((button) => {
    button.style.background = "white";
  });
  randomColor.style.background = "rgba(0, 0, 255, 0.274)";
  buttonBlack.style.color = "black";
});

// Reset

const getReset = () => {
  const allDivs = document.querySelectorAll(".itemSketch");
  allDivs.forEach((div) => {
    div.style.background = "white";
  });
};

resetButton.addEventListener("click", getReset);
