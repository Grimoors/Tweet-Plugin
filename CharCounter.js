// change the value of the number showing the count of characters in the text area of the page
// Count the number of Characters typed by users

// // Where to update -> 
// <div class="tweet-box-footer-right-char-count" id="Counter">   
//     <h6>0/280</h6>
// </div>

// in the index .html file

// // Path: index.html


// Begin the js script

// Get the tweet box element from the DOM
const tweetBox = document.getElementById("tweet");

// Get the counter element from the DOM
const counter = document.getElementById("Counter");

// Add an event listener to the tweet box element to count the characters
tweetBox.addEventListener("input", () => {
  // Get the number of characters in the tweet box
  const charCount = tweetBox.value.length;

  // Update the counter element with the number of characters
  counter.innerHTML = `<h6>${charCount}/280</h6>`;
});