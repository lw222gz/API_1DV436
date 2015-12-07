//tutorial I followed on google maps: https://developers.google.com/maps/documentation/javascript/tutorial
var googleMap = {
    Map:{},
    generateMap: function(){
        Map = new google.maps.Map(document.getElementById("googleMap"), 
                                  {center: {lat: 60, lng:10},
                                  zoom: 5});
    },
    
    //geocoder is an api that transforms a location to geographic coordinates
    //src: https://developers.google.com/maps/documentation/geocoding/intro
    placeMarkers: function(){
        var Geocoder = new google.maps.Geocoder();
        
        for (var i = 0; i < MailHandler.MailLabels.length; i++){
            googleMap.generateGeocode(MailHandler.MailLabels[i], Geocoder);
        }
        
        
    },
    
    generateGeocode: function(label, Geocoder){
        var location = label.name.replace(MailHandler.mailPath, "");
        Geocoder.geocode({'address': location},
        function(SearchResults, SearchStatus){
            if(SearchStatus === google.maps.GeocoderStatus.OK){
                //creates a marker on the given position
                googleMap.createMapMarker(SearchResults[0].geometry.location);
            }
            else {
                setTimeout(function(){
                    googleMap.generateGeocode(label, Geocoder);
                }, 300);
                
            }
        });
    },
    
    
    createMapMarker: function(location){
        var MapMarker = new google.maps.Marker({position: location, map: Map, title: "test"});
    }
    
    
};