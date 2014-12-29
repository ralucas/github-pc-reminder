/*global Client, Backbone*/

Client.Collections = Client.Collections || {};

(function () {
    'use strict';

    Client.Collections.Commits = Backbone.Collection.extend({

        model: Client.Models.Commits

    });

})();
