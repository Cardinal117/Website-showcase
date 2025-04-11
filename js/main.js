class slide {
  constructor(image, text) {
    this.image = image;
    this.text = text;
  }
}

let codeSlideArr = [];
let developmentArr = [];
let savedItems = [];

let codeSlide1 = new slide(
  `Images/C_cheatSheet_mousePad.png`,
  `If your looking for a new mouse pad I recommend this one.`
);
let codeSlide2 = new slide(
  `Images/Benefits-of-Version-Control.png`,
  `I highly recommend checking out <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiVorjKlfOLAxV4SfEDHciELrcQFnoECAsQAQ&url=https%3A%2F%2Fgithub.com%2F&usg=AOvVaw38IHvcyBra8HGhmSxvlCGw&opi=89978449">version control</a>, using it will allow you to have backups for everything.`
);
let developmentSlide1 = new slide(
  "Images/Color-Switch.png",
  "Starting small and working your way up is the best way to learn, " +
    "start by making well known mobile games and improve upon your skills " +
    "using them as a basis."
);
let developmentSlide2 = new slide(
  "Images/flappy_bird.gif",
  "a Traditional game to start with is flappy bird, you'll learn" +
    " one of the first great things about programming, how to fool the " +
    "audience. Did you know that it is not actually the bird that is moving " +
    "but actually the world itself?"
);

$(document).ready(function () {
  codeSlideArr.push(codeSlide1, codeSlide2);
  developmentArr.push(developmentSlide1, developmentSlide2);

  dropDownAnimation();

  // Adds a delay for tips boxes to change every few seconds.
  slideShow("#codingTips", codeSlideArr, 10000);
  slideShow("#developmentTips", developmentArr, 12000);
  saveItemsManager();
});

class SaveItem {
  constructor(timeStamp, html) {
    this.timeStamp = timeStamp;
    this.html = html;
  }
}

// Happens only when the page is loaded.
function saveItemsManager() {
  // Checks if book objects already exist or not
  if (sessionStorage.getItem("codeCalled") === null) {
    sessionStorage.setItem("savedItems", JSON.stringify(savedItems));
    sessionStorage.setItem("codeCalled", true);
    console.log("The sessionStorage is empty:\nArray has been added in place.");
  } else {
    savedItems = JSON.parse(sessionStorage.getItem("savedItems"));
    console.log("SessionStorage is not empty:\nAdding stored values to array.");
  }
  if (savedItems === null) {
    alert("Array for saves is null!");
  } else {
    if (savedItems.length !== 0) {
      console.log("Adding all saved items to saved.html");
      savedItems.forEach((items) => {
        console.log(items);
        const date = new Date(items.timeStamp);
        const month = date.getMonth() + 1;
        $("#saved-container-text").append(
          `${date.getDate()}/${month}/${date.getFullYear()} ${date.getHours()}:${date.getSeconds()}<hr>${items.html}<hr>`
        );
      });
    } else {
      $("#saved-container-text").html("<p>You have no saved items.</p>");
      console.log("No saved content found displaying appropriate message.");
    }
  }

  // Adds a button to all saveable elements.
  document.querySelectorAll(".savable-item").forEach((btn) => {
    const $saveButton = $("<button>Save for Later</button>").addClass(
      "save-btn"
    );
    $(btn).append($saveButton);
    console.log("All buttons have been added.");
    // Happens when user click on btn.
    btn.addEventListener("click", function () {
      if (!btn.classList.contains("saved")) { // Important button acts as beauty spot, make the button actually function 
                                              // as the only thing that adds an element to the array.
        $(btn).addClass("saved");
        console.log(btn.outerHTML);
        console.log("Preparing save sequence...");

        let save = new SaveItem(Date.now(), btn.outerHTML);
        savedItems.push(save);

        console.log("Item has been added to the array.");

        sessionStorage.setItem("savedItems", JSON.stringify(savedItems));

        console.log("Finally added the item to the session storage.");
      } else {
        alert("This object has already been saved.");
      }

      displaySessionStorageItems();
    });
  });
}

function clearSavedItems() { // _____________------------------------Currently is not "found" I know it's dumb.
  // Clears the session storage and resets the saved items array.
  sessionStorage.clear();
  savedItems = [];
  console.log("Cleared all saved items.");
}

function displaySessionStorageItems() {
  savedItems.forEach((items) => {
    console.log(items);
  });
}

// btn.addEventListener("click", function () {
//       // Check if item has already been saved.
//       // console.log(btn);
//       let alreadySaved = false;
//       const btnHtml = btn.innerHTML;
//       savedItems.forEach((s) => {

//         console.log(s.classList + "working?");
//         if (s.html === btnHtml) {
//           alreadySaved = true;
//           return;
//         }else{
//           console.log("it does not");
//         }
//         console.log("Content of item: " + item);
//       });

//       if(alreadySaved){
//         alert("Item has already been saved.");
//         return;
//       }

//       $(btn).addClass("saved");
//       const elementHtml = btn.outerHTML;
//       const save = new SaveItem(Date.now(), elementHtml);
//       console.log("Item to be saved:\n" + elementHtml);

//       let saves = JSON.parse(sessionStorage.getItem("savedItems"));
//       saves.push(save);

//       localStorage.setItem("savedItems", JSON.stringify(saves));
//       console.log("Added new saved item to storage.");
//     });


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

// Three functions each for an image to fade, reset fade and stop fade animation.
window.fadingImage = function (type) {
  // Fades out the tips boxes over 3 seconds.
  if (type === 1) {
    $(".slide-show-container, #fadeContainer").fadeOut(1500);
    // Fades in the tips boxes over 3 seconds.
  } else if (type === 2) {
    $(".slide-show-container, #fadeContainer").fadeIn(1500);
    // Stops the fading animation midway.
  } else if (type === 3) {
    $(".slide-show-container, #fadeContainer").stop();
    // Completely hides the container(s).
  } else if (type === 4) {
    $(".slide-show-container, #fadeContainer").hide();
  }
};

function slideShow(container, containerArray, intervalTime) {
  let count = 0;
  let hidden = false;

  fadingImage(4);

  setInterval(function () {
    let i = (count + 1) % containerArray.length;

    $(`${container} p`).html(containerArray[i].text);
    $(`${container} img`).attr("src", containerArray[i].image);
    count++;

    if (!hidden) {
      fadingImage(2);
      hidden = true;
    }
  }, intervalTime);
}
