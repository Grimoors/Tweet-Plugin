# Tweet-Plugin
A chrome Plugin that uses React JS, Flask, Python and ML to analyse a users profile and predict the Possible likes, shares, perception of a tweet before you actually post it.

# MLOPS Tweet-Plugin

## Problem Statement
Given a H5 file of a trained model, we need to create a web application that can take a tweet as input and predict the number of likes, shares and perception of the tweet.

## Solution
I need to convert the H5 file into either 
    a) a pickle file
    b) a tensorflow.js file
    c) a tensorflow lite file
    d) a joblib file

I am making a fronted using HTML, CSS and JS and trying to not use a backend. Hence, Proceeding to first write a python script that can convert the H5 file into a tensorflow.js file.

### Steps For Model Conversion
1. Create a python script that can convert the H5 file into a tensorflow.js file.
   1. Import the necessary libraries
   2.  Load the model (h5)
       1.  use of `tf.keras.models.load_model()`
   3. Convert the model
      1. Use of `tfjs.converters.save_keras_model()`
   4.  Save the model
       1.  use of `tfjs.converters.save_keras_model()`
   