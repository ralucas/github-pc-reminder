/*global Client, Backbone, JST*/

Client.Views = Client.Views || {};

(function () {
  'use strict';

  Client.Views.Schedule = Backbone.View.extend({

    template: JST['client/app/scripts/templates/schedule.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    events: {},

    initialize: function () {
      //this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      //this.$el.html(this.template());
      $('#page').html(this.template());
    }

  });

})();
