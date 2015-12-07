"use strict";
window.onload = function(){
    main.init();
}

var main = {
    init: function(){
        googleMap.generateMap();
        Authorize.checkAuth();
        MailHandler.setMailLables();
        
    }
}