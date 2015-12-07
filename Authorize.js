"use strict";


//NOTE: This script is from https://developers.google.com/gmail/api/quickstart/js
//changes have been made from the copied script but I started with the script on the site.
var Authorize = {
      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      CLIENT_ID: '6722816341-ah3ho9ml4va418rbi7igobe9rm7j1ucu.apps.googleusercontent.com',

      SCOPES: ['https://mail.google.com/'],

      /**
       * Check if current user has authorized this application.
       */
      checkAuth: function() {
        gapi.auth.authorize(
          {
            'client_id': Authorize.CLIENT_ID,
            'scope': Authorize.SCOPES.join(' '),
            'immediate': true
          }, Authorize.handleAuthResult);
          
          Authorize.listLabels();
      },

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      handleAuthResult: function(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          Authorize.loadGmailApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      },

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      handleAuthClick: function(event) {
        gapi.auth.authorize(
          {client_id: Authorize.CLIENT_ID, scope: Authorize.SCOPES, immediate: false},
          Authorize.handleAuthResult);
        return false;
      },

      /**
       * Load Gmail API client library. List labels once client library
       * is loaded.
       */
      loadGmailApi: function() {
        gapi.client.load('gmail', 'v1', MailHandler.setMailLables);
      }

};