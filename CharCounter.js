// change the value of the number showing the count of characters in the text area of the page
// Count the number of Characters typed by users

// // Where to update -> 
// <div class="tweet-box-footer-right-char-count" id="Counter">   
//     <h6>0/280</h6>
// </div>

//If successfully added to the index.html file, 
// Console should show the following message
//" Successfully added the script to the index.html file - CharCounter.js"

console.log("Successfully added the script to the index.html file - CharCounter.js");

// in the index .html file

// // Path: index.html


// Begin the js script

// Testing out the button
const PostButton = document.getElementById("clickToAnalyse");

PostButton.addEventListener("click", () => {
    console.log("clicked the button");
});

//Get the id = "predicted_1" element from the DOM
const predicted_1 = document.getElementById("predicted_1");

// Get the tweet box element from the DOM
const tweetBox = document.getElementById("tweet");

// Get the counter element from the DOM
const counter = document.getElementById("Counter");

// Add an event listener to the tweet box element to count the characters
tweetBox.addEventListener("input", () => {
  // Get the number of characters in the tweet box
  const charCount = tweetBox.value.length;

  // If th length is more than 280 characters, set Flag_Overflow to true, and set the counter to red

  // If the length is less than 280 characters, set Flag_Overflow to false, and set the counter to black
  if (charCount > 280) {
    // Update the counter element with the number of characters
    counter.innerHTML = `<h6 style="color: red;">${charCount}/280</h6>`;
  } else {
    // Update the counter element with the number of characters
  counter.innerHTML = `<h6>${charCount}/280</h6>`;
  }
    //Update the predicted_1 element with empty 
    predicted_1.innerHTML = ``;
    //Update the predicted_2 element with empty
    predicted_2.innerHTML = ``;
  


});


// // get the tweet box and the counter element
// const tweetBox = document.getElementById("tweet");
// const counter = document.getElementById("Counter");

// // add an event listener to the tweet box that listens for changes in its value
// tweetBox.addEventListener("input", () => {
//   // get the current character count
//   const count = tweetBox.value.length;

//   // update the character count in the counter element
//   counter.textContent = `${count}/280`;
// });