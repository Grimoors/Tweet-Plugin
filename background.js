// Import tensorflow js from <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>

const tf = require('@tensorflow/tfjs');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const stopWords = new natural.Stopwords();


model1_likepredictor = await tf.loadLayersModel('file://models/model_like_prediction/model.json');
model2_sentimentpredictor = await tf.loadLayersModel('file://models/model_sentiment_prediction/model.json');

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

function preprocessText(text) {
    // TODO: Perform any necessary preprocessing (e.g., tokenization, stopwords removal, stemming/lemmatization)
    //using natural library
    

        // convert to lowercase
    text = text.toLowerCase();

    // tokenize text
    const tokens = tokenizer.tokenize(text);

    // remove stopwords
    const filteredTokens = tokens.filter(token => !stopWords.contains(token));

    // stem words
    const stemmer = natural.PorterStemmer;
    const stemmedTokens = filteredTokens.map(token => stemmer.stem(token));

    // join tokens back into a string
    text = stemmedTokens.join(' ');

    const preprocessedText = text;

    return preprocessedText;
}

function convertTextToSequences(text) {
    // TODO: Convert the preprocessed text to integer sequences using the tokenizer from training

    const CountVectorizer = require('natural').CountVectorizer;

    // create the vectorizer
    const vectorizer = new CountVectorizer();

    // fit the vectorizer on the preprocessed text data
    vectorizer.fit([preprocessedTweet]);

    // transform the preprocessed text data into numerical features
    const transformedTweet = vectorizer.transform(preprocessedTweet);

    console.log(transformedTweet); // sparse vector representation of the tweet



    return inputData;
}

function padOrTruncateSequences(inputData, maxLength) {
    // TODO: Pad or truncate the sequences to the desired length
    const paddedInputData = inputData;
    
    return paddedInputData;
}

function Text_Analyser( tweetTextTruncated ) {

    const preprocessedtext = preprocessText(tweetTextTruncated);
    const sequences = convertTextToSequences(preprocessedtext);
    const paddedInputData = padOrTruncateSequences(sequences, 280);

    const prediction = model1_likepredictor.predict(paddedInputData);
    const prediction2 = model2_sentimentpredictor.predict(paddedInputData);

    console.log( "Likes Predicted = "   , prediction);
    console.log( "Sentiment Predicted = "   , prediction2);
    
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

