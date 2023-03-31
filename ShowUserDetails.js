// define variables to hold the user's Twitter profile information
let userId;
let firstName;

userId = "johndoe";
firstName = "John";

// use the Twitter API to retrieve the user's profile information
// you will need to use the access token and access token secret to make authenticated requests
// you can use a library like `twit` to simplify this process

// update the DOM elements with the user's profile information
const userIdElement = document.getElementById("userName");
const firstNameElement = document.getElementById("firstName");

userIdElement.textContent = `@${userId}`;
firstNameElement.textContent = firstName;