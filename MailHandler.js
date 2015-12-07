"use strict";

var MailHandler = {
    mailPath: "Location/",
    
    MailLabels: [],
    
    setMails: function(){
        
    },
    
    setMailLables: function(){
        var googleRequest = gapi.client.gmail.users.labels.list({'userId': 'me'});
        
        googleRequest.execute(function(request){
            for (var i = 0; i < request.labels.length; i++){
                if(request.labels[i].name.indexOf(MailHandler.mailPath) > -1){
                    MailHandler.MailLabels.push(request.labels[i]);
                }
            }
            
            //MailHandler.setMails();
            //console.log(MailHandler.MailLabels);
            googleMap.placeMarkers();
            
            console.log(MailHandler.MailLabels);
        });
        
        
    }
};