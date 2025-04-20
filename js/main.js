let count = 0;
let pressed = false;
let codeSlideArr = [];
let developmentArr = [];
let savedItems = [];
let commentsArr = [];

class slide {
  constructor(image, text) {
    this.image = image;
    this.text = text;
  }
}

// Values for slide shows.
let codeSlide1 = new slide(
  `https://Cardinal117.github.io/Website-showcase/Images/C_cheatSheet_mousePad.png`,
  `If your looking for a new mouse pad I recommend this one.`
);
let codeSlide2 = new slide(
  `https://Cardinal117.github.io/Website-showcase/Images/Benefits-of-Version-Control.png`,
  `I highly recommend checking out <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiVorjKlfOLAxV4SfEDHciELrcQFnoECAsQAQ&url=https%3A%2F%2Fgithub.com%2F&usg=AOvVaw38IHvcyBra8HGhmSxvlCGw&opi=89978449">version control</a>, using it will allow you to have backups for everything.`
);
let developmentSlide1 = new slide(
  "https:///Cardinal117.github.io/Website-showcase/Images/Color-Switch.png",
  "Starting small and working your way up is the best way to learn, " +
    "start by making well known mobile games and improve upon your skills " +
    "using them as a basis."
);
let developmentSlide2 = new slide(
  "https://Cardinal117.github.io/Website-showcase/Images/flappy_bird.gif",
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

class SaveComment {
  constructor(timeStamp, text, likeCount) {
    this.timeStamp = timeStamp;
    this.text = text;
    this.likeCount = likeCount;
  }
}

// Adds all saved comments to the page and handles the liking functionality for each comment.
function saveCommentsManager() {
  // Checks if saved comments exist in session storage and adds them to the page.
  if (commentsArr && commentsArr.length !== 0) {
    console.log("Adding comments to index.html");
    commentsArr.forEach((comments) => {
      let date = new Date(comments.timeStamp);
      let month = date.getMonth() + 1;
      let commentHtml = `
  <div class="comment-block" data-timestamp="${comments.timeStamp}">
    <p>${date.getDate()}/${month}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}</p>
    <hr>
    <p>${comments.text}</p>
    <p class="like-count">Likes: ${comments.likeCount}</p>
    <button class="button-styling-comments">Like</button>
    <hr>
  </div>`;
      $("#comments-section").append(commentHtml);
    });
  }

  // Handles the liking functionality of the comments.
  const commentSection = document.getElementById("comments-section");
  if (!commentSection) {
    console.warn(
      "comments-section not found on this page. Skipping like handler."
    );
    return;
  }

  commentSection.addEventListener("click", (e) => {
    if (!e.target.classList.contains("button-styling-comments")) return;

    console.log("Like button clicked.");

    let commentBlock = e.target.closest(".comment-block");
    let timeStamp = commentBlock.getAttribute("data-timestamp");

    let commentsArr = JSON.parse(
      sessionStorage.getItem("savedComments") || "[]"
    );
    // Updates like count per click if timestamps match.
    commentsArr.find((value) => {
      if (value.timeStamp == timeStamp) {
        liked = true;
        value.likeCount++;
        commentBlock.querySelector(
          ".like-count"
        ).textContent = `Likes: ${value.likeCount}`;
        console.log("Comment has been updated:" + value.text);
      }
    });
    // Updates the sessionStorage.
    sessionStorage.setItem("savedComments", JSON.stringify(commentsArr));
  });
}

// Happens only when the page is loaded.
function saveItemsManager() {
  let date = new Date();
  let month = 0;

  // Checks if book objects already exist or not
  if (sessionStorage.getItem("codeCalled") === null) {
    sessionStorage.setItem("savedItems", JSON.stringify(savedItems));
    sessionStorage.setItem("savedComments", JSON.stringify(commentsArr));
    sessionStorage.setItem("codeCalled", true);
    console.log(
      "The sessionStorage is for saved items and comments are empty:\nArrays have been added in place."
    );
  } else {
    savedItems = JSON.parse(sessionStorage.getItem("savedItems"));
    commentsArr = JSON.parse(sessionStorage.getItem("savedComments"));
    console.log(
      "SessionStorage is not empty:\nAdding stored values to arrays."
    );
  }

  saveCommentsManager();

  // Checks if the saved items exist in session storage and adds them to the page.
  if (savedItems && savedItems.length !== 0) {
    console.log("Adding all saved items to saved.html");
    savedItems.forEach((items) => {
      date = new Date(items.timeStamp);
      month = date.getMonth() + 1;
      $("#saved-container-text").append(
        `${date.getDate()}/${month}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}<hr>${
          items.html
        }<hr>`
      );
    });
  } else {
    $("#saved-container-text").html("<p>You have no saved items.</p>");
    console.log("No saved content found displaying appropriate message.");
  }

  // Adds a button to all saveable elements.
  document.querySelectorAll(".savable-item").forEach((btn) => {
    const $saveButton = $(
      `<button id="button">^Save for Later^</button>`
    ).addClass("save-btn");
    $(btn).append($saveButton);
    console.log("All buttons have been added.");
    // Happens when user click on btn.
    btn.addEventListener("click", function (e) {
      if (!e.target.classList.contains("save-btn")) return; // Only allows save button elements to save the element if clicked on.
      if (!btn.classList.contains("saved")) {
        // Important button acts as beauty spot, make the button actually function
        // as the only thing that adds an element to the array.
        $(btn).addClass("saved");
        console.log(btn.outerHTML);
        console.log("Preparing save sequence...");

        let element = document.querySelector("#button");
        while (element) {
          element.remove();
          $(btn).removeClass("savable-item");
          if (!btn.classList.contains("save-btn")) {
            break;
          }
          console.log("Removing button from element.");
        }

        let save = new SaveItem(Date.now(), btn.outerHTML);
        savedItems.push(save);

        console.log("Item has been added to the array.");

        sessionStorage.setItem("savedItems", JSON.stringify(savedItems));

        console.log("Finally added the item to the session storage.");
        alert(
          "New item added to saved storage.\nCurrent size = (" +
            savedItems.length +
            ")"
        );
      } else {
        alert("This object has already been saved.");
        return;
      }

      // Testing function.
      displaySessionStorageItems();
    });
  });
}

// TO BE IMPLEMENTED
function removeSavedItem(index) {
  // Removes the item at the specified index from the saved items array.
  if (index >= 0 && index < savedItems.length) {
    savedItems.splice(index, 1);
    sessionStorage.setItem("savedItems", JSON.stringify(savedItems));
    console.log(`Item at index ${index} removed from saved items.`);
  } else {
    console.log("Invalid index. No item removed.");
  }
}

function clearSavedItems() {
  // Clears the session storage and resets the saved items array.
  sessionStorage.clear();
  savedItems = [];
  console.log("Cleared all saved items.");
  location.reload();
}

// Simply displays all saved items to the console.
function displaySessionStorageItems() {
  savedItems.forEach((items) => {
    console.log(items);
  });
}

// Saved the comments, time made and like count when called.
function saveCommentText() {
  let commentText = document.querySelector("#comment").value;
  if (commentText === "") {
    alert("Please enter a comment before saving.");
    return;
  }

  let comment = new SaveComment(Date.now(), commentText, 0);
  console.log(comment.text, comment.timeStamp, comment.likeCount);
  if (comment == null) {
    alert("Comment is null, please try again.");
    return;
  }
  // Adds new comment values to the sessionstorage
  commentsArr.push(comment);
  sessionStorage.setItem("savedComments", JSON.stringify(commentsArr));
  console.log(commentsArr);
  location.reload();
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

// Simply switches between two slides(image and paragraph text) after an intervalTime.
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

// Toggles the chainAnimation() class.
function buttonPress() {
  pressed = !pressed;
  console.log("Animation started: ", pressed);

  // Calls the chainAnimation class to start the animation
  // when pressed is true.
  if (pressed) {
    chainAnimation();
  }
}

function chainAnimation() {
  let chainLeft = $(".chainLeft");
  let chainRight = $(".chainRight");
  // Resets the elements back to their original position
  // and changes the background color back if pressed is false.
  if (!pressed) {
    chainRight.css("transform", "translateX(0px)");
    chainLeft.css("transform", "translateX(0px)");
    $("body").css("background-color", "rgb(81, 81, 81)");
    return;
  } else {
    // Loops the animation as long as pressed is true.
    setTimeout(chainAnimation, 200);
  }

  count++;

  // Loops through each count changing the position of each element as well as the background
  // color with the class names .chainLeft and .chainRight every 200 milliseconds.
  switch (count) {
    case 1:
      chainRight.css("transform", "translateX(-10px)");
      chainLeft.css("transform", "translateX(10px)");
      break;
    case 2:
      chainRight.css("transform", "translateX(-20px)");
      chainLeft.css("transform", "translateX(20px)");
      break;
    case 3:
      chainRight.css("transform", "translateX(-30px)");
      chainLeft.css("transform", "translateX(30px)");
      $("body").css("background-color", "red");
      break;
    case 4:
      chainRight.css("transform", "translateX(-40px)");
      chainLeft.css("transform", "translateX(40px)");
      break;
    case 5:
      chainRight.css("transform", "translateX(-30px)");
      chainLeft.css("transform", "translateX(30px)");
      break;
    case 6:
      chainRight.css("transform", "translateX(-20px)");
      chainLeft.css("transform", "translateX(20px)");
      break;
    case 7:
      chainRight.css("transform", "translateX(-10px)");
      chainLeft.css("transform", "translateX(10px)");
      break;
    case 8:
      chainRight.css("transform", "translateX(0px)");
      chainLeft.css("transform", "translateX(0px)");
      $("body").css("background-color", "green");
      break;
    case 9:
      chainLeft.css("transform", "translateX(-10px)");
      chainRight.css("transform", "translateX(10px)");
      break;
    case 10:
      chainLeft.css("transform", "translateX(-20px)");
      chainRight.css("transform", "translateX(20px)");
      break;
    case 11:
      chainLeft.css("transform", "translateX(-30px)");
      chainRight.css("transform", "translateX(30px)");
      break;
    case 12:
      chainLeft.css("transform", "translateX(-40px)");
      chainRight.css("transform", "translateX(40px)");
      break;
    case 13:
      chainLeft.css("transform", "translateX(-30px)");
      chainRight.css("transform", "translateX(30px)");
      break;
    case 14:
      chainLeft.css("transform", "translateX(-20px)");
      chainRight.css("transform", "translateX(20px)");
      $("body").css("background-color", "blue");
      break;
    case 15:
      chainLeft.css("transform", "translateX(-10px)");
      chainRight.css("transform", "translateX(10px)");
      break;
    case 16:
      chainLeft.css("transform", "translateX(0px)");
      chainRight.css("transform", "translateX(0px)");
      count = 0;
      break;
  }
}
