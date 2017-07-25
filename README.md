# GifTastic
## Objective for Homework 6
To utilize the Gyphy API and process the JSON it returns to display a GIF search using Giphy.

## Issues  to Resolve
#### When a gif is mouse-clicked, it needs to animate
```
$(".gifDiv").on("click", function(){
```
Since gifDiv is dynamically created in the DOM, I can't get the event handler to attach to it
