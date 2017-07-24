function gif(animated, stillURL, animatedURL, rating) {
    this.animated=animated;
    this.stillURL=stillURL;
    this.animatedURL=stillURL;
    this.rating=rating;
    this.switchStates=function(){
        if(this.animated){
            this.animated=false;
            return this.animatedURL;
        }
        else {
            this.animated=true;
            return this.stillURL;
        }
    };
}

var gifArray = [];

var buttons = ["Final Fantasy", "Chocobo", "FFVII", "FFXI", "FFX", "FFXIV"];

function writeCloud()
{
    $("#buttonDiv").empty();
    for(var i=0; i<buttons.length;i++)
    {
        var newButton = $("<button>");
        newButton.addClass("searchTerm btn btn-default");
        newButton.attr("data-name", buttons[i]);
        newButton.text(buttons[i]);
        $("#buttonDiv").append(newButton);
    }
}

function writeGifs(){
    for(var i=0;i<gifArray.length;i++){
        var newDiv = $("<div>");
        newDiv.addClass("gifImage");

        var newGif = $("<img>");
        newGif.addClass("img-responsive")
        newGif.attr("id","gif"+i); // INVEST
        if (gifArray[i].animated)
        {
            newGif.attr("src",gifArray[i].animatedURL);
        }
        else {
            newGif.attr("src",gifArray[i].stillURL);
        }

    }
}

$("#add-search").on("click",function(event){
    event.preventDefault();
    var searchWord = $("#search-input").val().trim();
    buttons.push(searchWord);
    writeCloud();
})

$(document).on("click",".searchTerm", function(event){
    gifArray.length=0;
    var searchWord = $(this).attr("data-name");
    console.log(searchWord);
    var apiKey = "cc4e081121854d49843a5db540046c93"// replace
    var queryURL = "https://api.giphy.com/v1/gifs/search?"
    queryURL+= "api_key=" + apiKey;
    queryURL+= "&q=" + searchWord;
    queryURL+= "&limit=10";
    console.log(queryURL);

    //AJAX HERE
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        console.log(response);
        for(var i=0; i<response.data.length;i++){

            //Constructor way
            gifArray.push(new gif(false,response.data[i].images.original_still.url,response.data[0].images.original.url,response.data[i].rating));
            //Fallback if Object constructor don't be good
            // gifArray.push({animated: false, stillURL: response.data[i].images.original_still.url, animatedURL: response.data[0].images.original.url, rating: response.data[i].rating });
            //response.data[i].images.original_still.url
            console.log(gifArray);
        }
    });

})

$(document).ready(function(){
    writeCloud();
})
