// This element is to be called when we are clicking the button to analyse the tweet 

// // // Path: index.html

// // // Path: background.js

// Testing out the button
const PostButton2 = document.getElementById("clickToAnalyse");

PostButton2.addEventListener("click", () => {
    console.log("clicked the button, Calling the Function to Analyse the Tweet");
    Main();
});


function Text_Getter() {
    // Get the tweet box element from the DOM
    const tweetBox2 = document.getElementById("tweet");
    // Get the text from the tweet box
    const tweetText = tweetBox2.value;
    // Return the text from the tweet box
    return tweetText;
}

function Text_Truncator( tweetText ) {
    // Truncate the text to 280 characters
    const tweetTextTruncated = tweetText.slice(0, 280);
    // Return the truncated text
    console.log (tweetTextTruncated , "This is the Truncated Text and its length is " , tweetTextTruncated.length);
    return tweetTextTruncated;
}

function Text_Updater( tweetTextTruncated ) {
    // Get the tweet box element from the DOM
    const tweetBox2 = document.getElementById("tweet");  
  // Update the text in the tweet box to be truncated to 280 characters
    tweetBox2.value = tweetTextTruncated;

    // Get the counter element from the DOM
    const counter = document.getElementById("Counter");

    // Update the counter element with the number of characters
    counter.innerHTML = `<h6>${tweetTextTruncated.length}/280</h6>`;
    // Return the truncated text
    return tweetTextTruncated;
}



function Text_Analyser( tweetTextTruncated ) {
    // Analyse the text to see if it is offensive
    // If the text is offensive, return true
    // If the text is not offensive, return false
    // Return the result of the analysis
    return true;
}

function Main(){
    // Get the text from the tweet box
    const tweetText = Text_Getter();
    // Truncate the text to 280 characters
    const tweetTextTruncated = Text_Truncator( tweetText );
    // Update the text in the tweet box to be truncated to 280 characters
    Text_Updater( tweetTextTruncated );
    // Analyse the text to see if it is offensive
    const tweetTextAnalysis = Text_Analyser( tweetTextTruncated );
    // If the text is offensive, return true
    if (tweetTextAnalysis === true) {
        // Return the truncated text

        console.log( tweetTextTruncated );
    } else {
        // If the text is not offensive, return false
        console.log ( "false" );
    }
}