/*global Client, Backbone*/

Client.Models = Client.Models || {};

(function () {
    'use strict';

    Client.Models.Commits = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
