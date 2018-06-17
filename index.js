var m = require('./node_modules/mithril');
var biwas = require('./node_modules/biwascheme');
var bfs = require('./node_modules/browserfs');
var root = document.body;

m.render(root, "Hello."); // debug

var errhook = function(e) { console.error(e); }
var biwa = new biwas.Interpreter(errhook);

// (js-invoke/async js-obj "method" args ...)
biwas.define_libfunc("js-invoke/async", 2, null, function(ar){
    var js_obj = ar.shift();
    var func_name = ar.shift(); // FIXME: Require underscorejs for isString??
    return new biwas.Pause(function(pause){
        var cb = function(){return pause.resume(arguments);};
        ar.push(cb);
        js_obj[func_name].apply(js_obj, ar);
    });
});

m.request({
    method: "GET",
    url: "/check.scm",
    deserialize: function(v){return v;},
}).then(function(str){
    biwa.evaluate(str, function(res){m.render(root, res);});
});


