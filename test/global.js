var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('global', function (t) {
    t.plan(2);
    
    var b = browserify();
    b.add(__dirname + '/global/main.js');
    b.bundle(function (err, src) {
        var c = {
            t : t,
            a : 555,
        };
        c.window = c;
        vm.runInNewContext(src, c);
    });
});

test('__filename and __dirname', function (t) {
    t.plan(2);
    
    var b = browserify();
    b.expose('x', __dirname + '/global/filename.js');
    b.bundle(function (err, src) {
        var c = {};
        vm.runInNewContext(src, c);
        var x = c.require('x');
        t.equal(x.filename, '/filename.js');
        t.equal(x.dirname, '/');
    });
});
