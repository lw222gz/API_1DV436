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
      },

      /**
       * Print all Labels in the authorized user's inbox. If no labels
       * are found an appropriate message is printed.
       */
      listLabels: function(){
        var request = gapi.client.gmail.users.labels.list({
          'userId': 'me'
        });

        request.execute(function(resp) {
          var labels = resp.labels;
          Authorize.appendPre('Labels:');

          if (labels && labels.length > 0) {
            for (var i = 0; i < labels.length; i++) {
              var label = labels[i];
              Authorize.appendPre(label.name);
              console.log(label.name);
            }
          } else {
            Authorize.appendPre('No Labels found.');
          }
        });
      },

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      appendPre: function(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

};