// ## Dependencies
var $ = window.jQuery = require('jquery'); // export to global for bootstrap
var bootstrap = require('bootstrap/dist/js/bootstrap');
var Model = require('ampersand-model');
// ## Module Definition
var app = module.exports = new (Model.extend({
  session: {
    router: {
      type: 'object',
      required: true,
      allowNull: false,
      default: function () { return router }
    },
    user: {
      type: 'object',
      required: true,
      allowNull: false,
      default: function () { return new CurrentUser() }
    }
  }
}));
