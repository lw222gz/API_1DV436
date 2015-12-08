"use strict";

var MailHandler = {
    mailPath: "location/",
    
    MailLabels: [],
    
    //returns an array of mail objs foreach mail in param @label
    setMails: function(label){
        var mailRequest = gapi.client.gmail.users.messages.list({'userId': 'me', 'labelIds': label.id});
        var mailArr = [];
        
        mailRequest.execute(function(Response){
            for (var i = 0; i < Response.messages.length; i++){
                var getMailDataRequest = gapi.client.gmail.users.messages.get({'userId': 'me', 'id': Response.messages[i].id});
                
                getMailDataRequest.execute(function(mailResponse){
                    mailArr.push({
                                Snippet: mailResponse.snippet,
                                Header: mailResponse.payload.headers[16].value
                                });
                });
            }
        });
        
        return mailArr;
    },
    
    //sets the MailLabels array values. each array position consists of an object containg data about a label and the mails in that label
    setMailLables: function(){
        var googleRequest = gapi.client.gmail.users.labels.list({'userId': 'me'});
        
        googleRequest.execute(function(response){
            for (var i = 0; i < response.labels.length; i++){
                if(response.labels[i].name.indexOf(MailHandler.mailPath) > -1){
                    MailHandler.MailLabels.push({labelData: response.labels[i], 
                                                labelMails: MailHandler.setMails(response.labels[i])});
                }
            }
            
            //I need to give each label about 100 miliseconds to load to let mails load or else the labelMails array will be empty.
            //TODO: better solution
            setTimeout(function(){
                googleMap.placeMarkers();
                
            },MailHandler.MailLabels.length * 100);
            
        });
    }
};