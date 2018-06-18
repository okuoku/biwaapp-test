var m = require('./node_modules/mithril');
var biwas = require('./node_modules/biwascheme');
var bfs = require('./node_modules/browserfs');
var root = document.body;

m.render(root, "Hello."); // debug

var errhook = function(e) { console.error(e); }
var biwa = new biwas.Interpreter(errhook);

var libs = {
    "biwascheme":biwas,
    "browserfs":bfs,
    "mithril":m};

// (js-import str) => module
biwas.define_libfunc("js-import", 1, 1, function(ar){
    return libs[ar[0]];
});

var scm = require('fs').readFileSync(__dirname + '/app.scm', 'utf8');

biwa.evaluate(scm, function(res){m.render(root, res);});

/*
m.request({
    method: "GET",
    url: "/check.scm",
    deserialize: function(v){return v;},
}).then(function(str){
    biwa.evaluate(str, function(res){m.render(root, res);});
});
*/


