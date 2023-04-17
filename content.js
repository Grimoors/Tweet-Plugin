// get the DOM for the prediction_1 id
const predicted_1 = document.getElementById("predicted_1");
// get the DOM for the prediction_2 id
const predicted_2 = document.getElementById("predicted_2");
// add an event listener for the click of the button
PostButton.addEventListener("click", () => {
    console.log("clicked the button");
    // Print in the inner HTML of the predicted_1 id, : Likes = randint(0,1000)
    predicted_1.innerHTML = `Likes = ${Math.floor(Math.random() * 1000)}`;
    // Print in the inner HTML of the predicted_2 id, : Sentiment = randint(-5,5)
    predicted_2.innerHTML = `Sentiment = ${Math.floor(Math.random() * 11) - 5}`;
});   

