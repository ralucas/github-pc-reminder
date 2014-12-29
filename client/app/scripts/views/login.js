/*global Client, Backbone, JST*/

Client.Views = Client.Views || {};

(function () {
  'use strict';

  Client.Views.Login = Backbone.View.extend({

    template: JST['client/app/scripts/templates/login.ejs'],

    tagName: 'div',

    id: 'login-page',

    className: '',

    events: {
      'click .login-btn': 'login'
    },

    render: function () {
      this.$el.html(this.template());
    },

    login: function() {
      console.log('login button clicked');
    }

  });

})();
