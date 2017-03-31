$(document).ready(function() {

  var tempChange = true;
  var backgroundImage;

// Using the IP api method:
  var urlLocation = "http://ip-api.com/json";
  $.getJSON(urlLocation, function(location) {
    var lat = location.lat;
    var lon = location.lon;
    var city = location.city;
    var region = location.regionName;
    var units = "metric";
    $('#city').html(city + ", " + region);

/* Using the geolocation method:
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      if (position) {
  var units = "metric";
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;*/

  // API url with coordinates
  var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=919d79c19481102ba9668f334353e30f" + "&units=" + units;

  // Call the Open Weather API
  $.getJSON(url, function(wd) {
    var type = wd.weather[0].description;
    var description = type[0].toUpperCase() + type.substring(1);
    var tempC = wd.main.temp;
    var tempF = (tempC*1.8)+32;
    var icon = wd.weather[0].icon;
    $('#type').html(description);
    $('#temp').html(Math.floor(tempC) + "&degC");

// Toggle between units
   $('#clicker').click(function() {
      if (tempChange === true) {
        tempChange = false;
        $('#temp').html(Math.floor(tempF) + "&degF");
        $('#clicker').html("Show me Celsius");
         }
      else if (tempChange === false) {
        tempChange = true;
        $('#temp').html(Math.floor(tempC) + "&degC");
        $('#clicker').html("Show me Fahrenheit");
      }
    });

// Change background image according to icon code
    backgroundImage = parseInt(icon.substr(0, 2));
      if (backgroundImage < 2) {
        $('.container').css({
          "background-image": "url(images/sunny.jpg)",
          "background-repeat": "no-repeat"
        })
        $('body').css({
          "background-color": "lightyellow"
        });
      } else if (backgroundImage < 5) {
        $('.container').css({
          "background-image": "url(images/clear.jpg)",
          "background-repeat": "no-repeat"
        })
        $('body').css({
          "background-color": "lightblue"
        });
      } else if (backgroundImage < 12) {
        $('.container').css({
          "background-image": "url(images/rainy.jpg)",
          "background-repeat": "no-repeat"
        })
        $('body').css({
          "background-color": "lightblue"
        });
      } else if (backgroundImage <  50) {
        $('.container').css({
          "background-image": "url(images/snowy.jpg)",
          "background-repeat": "no-repeat"
        })
        $('body').css({
          "background-color": "white"
        });
      } else {
        $('.container').css({
          "background-image": "url(images/grey.jpg)",
          "background-repeat": "no-repeat"
        })
        $('body').css({
          "background-color": "lightgrey"
        });
      };
  });
});
});
