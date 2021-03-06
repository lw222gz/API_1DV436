//tutorial I followed on google maps: https://developers.google.com/maps/documentation/javascript/tutorial
var googleMap = {
    Map:{},
    //generates the google map
    generateMap: function(){
        Map = new google.maps.Map(document.getElementById("googleMap"), 
                                  {center: {lat: 60, lng:10},
                                  zoom: 5});
    },
    
    //geocoder is an api that transforms a location to geographic coordinates
    //src: https://developers.google.com/maps/documentation/geocoding/intro
    placeMarkers: function(){
        MailHandler.MailLabels.forEach(function(e){
            googleMap.generateGeocode(e);
        });
    },
    
    //generates the map pin locations
    generateGeocode: function(label, Geocoder){
        
        var location = label.labelData.name.replace(MailHandler.mailPath, "");
        
        var Geocoder = new google.maps.Geocoder();
        
        Geocoder.geocode({'address': location},
        function(SearchResults, SearchStatus){
            if(SearchStatus === google.maps.GeocoderStatus.OK){
                //creates a marker on the given position
                googleMap.createMapMarker(SearchResults[0].geometry.location, label, location);
            }
            else {
                setTimeout(function(){
                    googleMap.generateGeocode(label, Geocoder);
                }, 300);
                
            }
        });
    },
    
    //creates a map pin at the given location label and set string values for each mail in the label
    createMapMarker: function(locationCoordinates, label, location){
        var MapMarker = new google.maps.Marker({position: locationCoordinates, map: Map});
        var message = "<h2>"+location+"</h2>";
        
        
        for(var i = 0; i < label.labelMails.length; i++){
            message +=  "<h3>Title: " + label.labelMails[i].Header+ "</h3> <p><u>Snippet from mail:</u> " + label.labelMails[i].Snippet + "</p>";
            message += "<a href='https://mail.google.com/mail/u/0/#label/location%2F"+location+"/"+label.labelMails[i].Id+"' target='_blank'>See full mail here.</a>";
        }
        
        var infoWindow = new google.maps.InfoWindow({
                content: message
            });
            
        MapMarker.addListener("click", function(){
                infoWindow.open(Map, MapMarker);
            });
        
    }
    
    
};