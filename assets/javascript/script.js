// var gif={
//     animated: false,
//     stillURL:"",
//     animatedURL:"",
// }

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
            gifArray.push({animated: false, stillURL: response.data[i].images.original_still.url, animatedURL: response.data[0].images.original.url });
            //response.data[0].images.original_still.url
            console.log(gifArray);
        }
    });

})

$(document).ready(function(){
    writeCloud();
})
