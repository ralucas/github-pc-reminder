/*global Client, Backbone*/

Client.Routers = Client.Routers || {};

(function () {
    'use strict';

    Client.Routers.Router = Backbone.Router.extend({

      routes: {
        "schedule": "schedule"
      },

      schedule: function() {
        console.log('schedule');
        var scheduleView = new Client.Views.Schedule();
        scheduleView.render();
      }

    });



})();
