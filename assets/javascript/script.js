// Object Constructor for the GIF images
// will hold all of the urls and the number and rating
// also has method of changing animation state
// arguements: Number as number, animated as boolean, stillURL as String, animatedURL as string, rating as String
function gif(number,animated, stillURL, animatedURL, rating) {
    // number for refernce back to the gifarray
    this.number=number;
    // animated boolean (if its animated)
    this.animated=animated;
    // url for the still image
    this.stillURL=stillURL;
    // url for the animated image
    this.animatedURL=animatedURL;
    // rating letter(s)
    this.rating=rating;
    // method switchStates
    // switches from animated to still and back
    // returns: the url of the new state
    this.switchStates=function(){
        // if animated
        if(this.animated){
            // set to still
            this.animated=false;
            // return the still image url
            return this.stillURL;
        }
        else {  // must be still
            // set to animated
            this.animated=true;
            // return animated image url
            return this.animatedURL;
        }
    };
}

// placeholder for the incoming gifs to be parsed out of JSON
var gifArray = [];

// buttons is the array of buttons with default ones
var buttons = ["Final Fantasy", "Chocobo", "FFVII", "FFXI", "FFX", "FFXIV"];

// Function to write the buttons to the div with the id buttonDiv
function writeCloud()
{
    //empty the div
    $("#buttonDiv").empty();
    // loop through all of the buttons
    for(var i=0; i<buttons.length;i++)
    {
        // generate new button tag Object
        var newButton = $("<button>");
        // add class searchTerm for click event and bootstrap btn style
        newButton.addClass("searchTerm btn btn-default");
        // give a data attribute to store the name
        newButton.attr("data-name", buttons[i]);
        // write text to the button
        newButton.text(buttons[i]);
        // append the button to the buttonDiv
        $("#buttonDiv").append(newButton);
    }
}

// Function to write the Images to the div with the id gifDiv
function writeGifs(){
    //empty the div
    $("#gifDiv").empty();
    //loop through all elements in the gifArray
    for(var i=0;i<gifArray.length;i++){
        // Create a new div for image and rating
        var newDiv = $("<div>");
        // give it class pull-left from bootstrap
        newDiv.addClass("pull-left");
        // Create new gif tag
        var newGif = $("<img>");
        // Give it classes gifImage (for clicks) and img-responsive for style
        newGif.addClass("gifImage img-responsive")
        // Add ID to gif for when gif is clicked
        newGif.attr("id","gif"+i); // INVEST
        // LOGIC -> if gif is animated
        if (gifArray[i].animated)
        {
            // set the src to the animated link
            newGif.attr("src",gifArray[i].animatedURL);
        }
        else {
            // otherwise set it to the static link
            newGif.attr("src",gifArray[i].stillURL);
        }
        // create p tag for content rating
        var newRating = $("<p>");
        // write "Rating: G/R/Y..." to the html of the p tag
        newRating.html("<strong>Rating:</strong> "+ gifArray[i].rating.toUpperCase());
        // append both the image and the p tag to the div
        newDiv.append(newGif, newRating);
        // append those to the parent div in the html
        $("#gifDiv").append(newDiv);
    }
}

// on button click for the search cloud
$("#add-search").on("click",function(event){
    // avoid empty form submission
    event.preventDefault();
    // extract the input from the text field
    var searchWord = $("#search-input").val().trim();
    // add the button to the button array
    buttons.push(searchWord);
    // refresh the search cloud
    writeCloud();
})

// when the gif is pressed
// change state
//$(".gifDiv").on("click", function(){
$(document).on('click', '.gifImage', function() {
    event.preventDefault();
//pull in attribute ID
    var state = $(this).attr("id");
//extract the index
    var index = state.slice(3);
    console.log(state + " " + index);
// do swap on index
    $(this).attr("src",gifArray[index].switchStates());
// set new src of gifimage  - performed with switchStates()
})

// on the press of a button in the cloud
$(document).on("click",".searchTerm", function(event){
    // clear the gifArray
    gifArray.length=0;
    // extract the word from the button
    var searchWord = $(this).attr("data-name");
    // check
    console.log(searchWord);
    // my API KEY TO BE REMOVED
    var apiKey = "cc4e081121854d49843a5db540046c93"// replace
    // api url base
    var queryURL = "https://api.giphy.com/v1/gifs/search?"
    // add api_key
    queryURL+= "api_key=" + apiKey;
    // add the search word
    queryURL+= "&q=" + searchWord;
    // make the limit to 10
    queryURL+= "&limit=10";
    //check
    console.log(queryURL);

    //AJAX HERE
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        console.log(response);
        // itereate through the array of gifs returned (could be less than 10)
        for(var i=0; i<response.data.length;i++){

            //Constructor way
            // push a new gif object on the gifArray with the information from the response JSON
            gifArray.push(new gif(i,false,
                response.data[i].images.fixed_height_still.url,
                response.data[0].images.fixed_height.url,
                response.data[i].rating));
            //Fallback if Object constructor don't be good
            // gifArray.push({animated: false, stillURL: response.data[i].images.original_still.url, animatedURL: response.data[0].images.original.url, rating: response.data[i].rating });
            //response.data[i].images.original_still.url
            console.log(gifArray);
        }
        writeGifs();
    });

})

// on ready - generate the base page
$(document).ready(function(){
    // give me buttons!
    writeCloud();
})
