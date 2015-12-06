"use strict";


//NOTE: This script is from https://developers.google.com/gmail/api/quickstart/js
//changes have been made from the copied script but I started with the script on the site.
var Authorize = {
      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      CLIENT_ID: '6722816341-725p0i8vrb8lhfpc1bvbjnvdrj8euvug.apps.googleusercontent.com',

      SCOPES: ['https://www.googleapis.com/auth/gmail.readonly'],

      /**
       * Check if current user has authorized this application.
       */
      checkAuth: function() {
        gapi.auth.authorize(
          {
            'client_id': Authorize.CLIENT_ID,
            'scope': Authorize.SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
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
          loadGmailApi();
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
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      },

      /**
       * Load Gmail API client library. List labels once client library
       * is loaded.
       */
      loadGmailApi: function() {
        gapi.client.load('gmail', 'v1', listLabels);
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
          appendPre('Labels:');

          if (labels && labels.length > 0) {
            for (i = 0; i < labels.length; i++) {
              var label = labels[i];
              appendPre(label.name)
            }
          } else {
            appendPre('No Labels found.');
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