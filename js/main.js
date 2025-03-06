let countOne = 0;
let countTwo = 0;
let codeSlideArr = [];
let developmentArr = [];

let codeSlide1 = new slide(
  `/Images/C_cheatSheet_mousePad.png`,
  `If your looking for a new mouse pad I recommend this one.`
);
let codeSlide2 = new slide(
  `/Images/Benefits-of-Version-Control.png`,
  `I highly recommend checking out <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiVorjKlfOLAxV4SfEDHciELrcQFnoECAsQAQ&url=https%3A%2F%2Fgithub.com%2F&usg=AOvVaw38IHvcyBra8HGhmSxvlCGw&opi=89978449">version control</a>, using it will allow you to have backups for everything.`
);
let developmentSlide1 = new slide(
  "/Images/Color-Switch.png",
  "Starting small and working your way up is the best way to learn, "+
  "start by making well known mobile games and improve upon your skills "+
  "using them as a basis."
);
let developmentSlide2 = new slide(
  "/Images/flappy_bird.gif",
  "a Traditional game to start with is flappy bird, you'll learn"+
  " one of the first great things about programming, how to fool the "+
  "audience. Did you know that it is not actually the bird that is moving "+
  "but actually the world itself?"
);

$(document).ready(function () {
  alert("The eagle has landed!");
  codeSlideArr.push(codeSlide1, codeSlide2);
  developmentArr.push(developmentSlide1, developmentSlide2);

  function load() {
    dropDownAnimation();
    setInterval(function () {
      slideShow("#codingTips", codeSlideArr, countOne);
      countOne++;
    }, 10000);
    setInterval(function () {
      slideShow("#developmentTips", developmentArr, countTwo);
      countTwo++;
    }, 12000);
  }
  load();
});

function slide(image, text) {
  this.image = image;
  this.text = text;
}

// Allows a specified element to show and hide it's list/items when hovered over.
function dropDownAnimation() {
  jQuery(".drop-down").hover(
    function () {
      // Slides the list items down when .drop-down is hovered over.
      $(this).children(".drop").stop(true, true).slideDown(500);
    },
    function () {
      // Slides the list items back up when .drop-down is hovered over.
      $(this).children(".drop").stop(true, false).slideUp(500);
    }
  );
}

function slideShow(container, containerArray, count) {
  let i = (count + 1) % containerArray.length;

  $(`${container} p`).html(containerArray[i].text);
  $(`${container} img`).attr("src", containerArray[i].image);
  console.log(count);
}
