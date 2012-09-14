var cleaner = require("./cleaner");

exports.testWrapperReturnsAFunction = function(test){
    test.expect(1);
    test.equal(typeof cleaner.wrap(function(data){}), typeof function(){});
    test.done();
};

exports.testNoNewLineProducesNoResult = function(test){
    test.expect(0);
    cleaner.wrap(function(data){
       test.ok(false);
    })('h');
    test.done();
};

exports.testOnlyNewLinesProducesNoResult = function(test){
    test.expect(0);
    cleaner.wrap(function(data){
       test.ok(false);
    })('\n\n\n\n\n\n');
    test.done();
};

exports.testSimpleNewLineProducesResult = function(test){
    test.expect(1);
    cleaner.wrap(function(data){
       test.equal(data, "h");
    })('h\n');
    test.done();
};

exports.testTwoLines = function(test) {
    var expected;
    var count = 0;
    test.expect(2);
    var c = cleaner.wrap(function(data){
        if(!expected) {
            test.ok(false);
        } else {
            test.equal(data, expected, "Failed on step " + count);
        }
    });

    expected = null;
    c("h");

    count++;
    expected = null;
    c("e");

    count++;
    expected = "hello";
    c("llo\n");
    
    count++;
    expected = null;
    c("world");

    count++;
    expected = "world";
    c("\n");

    test.done();
};

exports.testTwoNewLineSignInOneLine = function(test) {
    var count = 0;
    test.expect(2);
    var result = ["Today is Monday."," hello world"];
    var c = cleaner.wrap(function(data){      
        test.equal(data, result[count]);    
        count++;
    }); 
    c("Today is Monday.\n hello world\n...");
    test.done();
};

exports.testMultiple = function(test) {
    var count = 0;
    test.expect(5);
    var result = ["hello", "worl","d.","Today is Monday.", "Nice day"];

    var c = cleaner.wrap(function(data){
        test.equal(data, result[count]);
        count++;
    }); 

    c("hell");
    c("o\n");
    c("worl");
    c("\n");
    c("\n");
    c("d.\nToday is Monday.\nNice day\n");
    test.done();
};







