this["JST"] = this["JST"] || {};

this["JST"]["client/app/scripts/templates/login.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav class="top-bar" data-topbar role="navigation">\n  <h3 class="nav-title">Github Public Commit Reminder</h3>\n</nav>\n<div class="row">\n  <div class="small-4 small-centered columns text-center">\n    <h1>Login here:</h1>\n  </div>\n</div>\n<div class="row">\n  <div class="small-4 small-centered columns text-center">\n    <a role="button" href="/auth/github" class="button success login-btn">Login with Github</a>\n  </div>\n</div> \n';

}
return __p
};

this["JST"]["client/app/scripts/templates/schedule.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav class="top-bar" data-topbar role="navigation">\n  <ul class="title-area">\n    <li class="name">\n      <h1><a href="#">Schedule</a></h1>\n    </li>\n     <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->\n    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>\n  </ul>\n\n  <section class="top-bar-section">\n    <!-- Right Nav Section -->\n    <ul class="right">\n      <li class="active"><a href="#">Right Button Active</a></li>\n      <li class="has-dropdown">\n        <a href="#">Right Button Dropdown</a>\n        <ul class="dropdown">\n          <li><a href="#">First link in dropdown</a></li>\n          <li class="active"><a href="#">Active link in dropdown</a></li>\n        </ul>\n      </li>\n    </ul>\n\n    <!-- Left Nav Section -->\n    <ul class="left">\n      <li><a href="#">Left Nav Button</a></li>\n    </ul>\n  </section>\n</nav>\n';

}
return __p
};