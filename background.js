//If successfully added to the index.html file, 
// Console should show the following message
//" Successfully added the script to the index.html file - background.js"

console.log("Successfully added the script to the index.html file - background.js");


// Import tensorflow js from <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>

const tf = require('@tensorflow/tfjs');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
// const stopWords = new natural.Stopwords['english'];
const stopWords = require('stopwords').english;

model1_likepredictor =  tf.loadLayersModel('https://grimoorsfirstawsbucket.s3.ap-southeast-2.amazonaws.com/models/model_like_prediction/model.json');
// Check if loaded properly, if yes, print to console   
model1_likepredictor.then(function(result) {    
    console.log("Model 1 loaded successfully");
});
model2_sentimentpredictor =  tf.loadLayersModel('https://grimoorsfirstawsbucket.s3.ap-southeast-2.amazonaws.com/models/model_sentiment_prediction/model.json');
// Check if loaded properly, if yes, print to console
model2_sentimentpredictor.then(function(result) {
    console.log("Model 2 loaded successfully");
});

// This element is to be called when we are clicking the button to analyse the tweet 

// // // Path: index.html

// // // Path: background.js

// Testing out the button
const PostButton2 = document.getElementById("clickToAnalyse");
// Check if the getelementbyID is working
console.log(PostButton2);

PostButton2.addEventListener("click", () => {
    console.log("clicked the button, Calling the Function to Analyse the Tweet");
    Main();
});


function Text_Getter() {
    console.log ("function Text_Getter() called");
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
    console.log (text , "This is the text after converting to lowercase");


    // tokenize text
    const tokens = tokenizer.tokenize(text);
    console.log (tokens , "This is the text after tokenization");


    // remove stopwords
    const filteredTokens = tokens.filter(token => !stopWords.includes(token));

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

    // const CountVectorizer = require('natural').CountVectorizer;

    // // create the vectorizer
    // const vectorizer = new CountVectorizer();

    // // fit the vectorizer on the preprocessed text data
    // vectorizer.fit([preprocessedTweet]);

    // // transform the preprocessed text data into numerical features
    // const transformedTweet = vectorizer.transform(preprocessedTweet);

    // console.log(transformedTweet); // sparse vector representation of the tweet

    const natural = require('natural');
    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();

    // add the preprocessed text to the tf-idf object
    tfidf.addDocument(text);

    console.log (tfidf.listTerms(0) , "This is the tfidf list terms");

    // get the tf-idf weights for the preprocessed text
    const transformedText = tfidf.listTerms(0).map(item => item.tfidf);

    console.log (transformedText , "This is the transformed text");

    const inputData = transformedText;

    return inputData;
}

function padOrTruncateSequences(inputData, maxLength) {
    // TODO: Pad or truncate the sequences to the desired length
    // create a new array of the desired length filled with zeros
    const paddedInputData = new Array(maxLength).fill(0);

    // copy the elements from the inputData array to the paddedInputData array
    for (let i = 0; i < maxLength && i < inputData.length; i++) {
        paddedInputData[i] = inputData[i];
    }
    
    return paddedInputData;
}

function Text_Analyser( tweetTextTruncated ) {
    console.log ("function Text_Analyser() called");

    console.log ("Preprocessing the text, calling the function preprocessText()"    );
    const preprocessedtext = preprocessText(tweetTextTruncated);
    console.log ("Preprocessed Text = " , preprocessedtext);

    console.log ("Converting the text to sequences, calling the function convertTextToSequences()"    );
    const sequences = convertTextToSequences(preprocessedtext);
    console.log ("Sequences = " , sequences);

    console.log ("Padding or Truncating the sequences to the desired length, calling the function padOrTruncateSequences()"    );
    const paddedInputData = padOrTruncateSequences(sequences, 1202);
    console.log ("Padded Input Data = " , paddedInputData);
    console.log ("Padded Input Data Length = " , paddedInputData.length);
    console.log("Padded Input Data Type = " , typeof paddedInputData);
    console.log("Padded Input Data Shape = " , paddedInputData.shape);
    // const prediction = model1_likepredictor.predict(paddedInputData);
    
    const inputData = tf.tensor2d( paddedInputData , [1, 1202]);

    model1_likepredictor.then(function(model) {
        const inputShape = model.layers[0].inputShape;
        console.log(inputShape);
        // use the model object here
        const prediction = model.predict(inputData);
        console.log( "Likes Predicted = "   , prediction);
    });

    // const prediction2 = model2_sentimentpredictor.predict(paddedInputData);

    model2_sentimentpredictor.then(function(model) {
        const inputShape = model.layers[0].inputShape;
        console.log(inputShape);
        // use the model object here
        const prediction = model.predict(inputData);
        console.log( "Likes Predicted = "   , prediction);
    });

    // console.log( "Likes Predicted = "   , prediction);
    // console.log( "Sentiment Predicted = "   , prediction2);
    
    return true;
}



function Main(){
    console.log ("Main Function Called");


    // Get the text from the tweet box
    console.log ("Getting the text from the tweet box, calling the function Text_Getter()");
    const tweetText = Text_Getter();
    // Truncate the text to 280 characters
    console.log ("Truncating the text to 280 characters, calling the function Text_Truncator()");
    const tweetTextTruncated = Text_Truncator( tweetText );
    // Update the text in the tweet box to be truncated to 280 characters
    console.log ("Updating the text in the tweet box to be truncated to 280 characters, calling the function Text_Updater()");
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

