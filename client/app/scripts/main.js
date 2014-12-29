/*global Client, $*/


window.Client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
      'use strict';
      console.log('Hello from Backbone!');
      var loginView = new this.Views.Login();
      loginView.render();
      $('#page').append(loginView.$el);
    }
};

$(document).ready(function () {
    'use strict';
    Client.init();
});
