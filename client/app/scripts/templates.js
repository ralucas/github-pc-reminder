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
__p += '<p>Schedule Page</p>\n\n<div class="icon-bar five-up">\n  <a class="item">\n    <i class="fi-home"></i>\n    <label>Home</label>\n  </a>\n  <a class="item">\n    <i class="fi-bookmark"></i>\n    <label>Bookmark</label>\n  </a>\n  <a class="item">\n    <i class="fi-info"></i>\n    <label>Info</label>\n  </a>\n  <a class="item">\n    <i class="fi-mail"></i>\n    <label>Mail</label>\n  </a>\n  <a class="item">\n    <i class="fi-like"></i>\n    <label>Like</label>\n  </a>\n</div>';

}
return __p
};