//tutorial I followed on google maps: https://developers.google.com/maps/documentation/javascript/tutorial
var googleMap = {
    Map:{},
    generateMap: function(){
        Map = new google.maps.Map(document.getElementById("googleMap"), 
                                  {center: {lat: 60, lng:10},
                                  zoom: 5});
    }
};