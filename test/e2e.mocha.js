var supertest = require("supertest");
var server = require("../server.js");
var stringCalculator = require("../string-calculator.js");

describe("server.js", function() {
    
    before(function() {
        server.configure().start();
    });
    
    describe("GET /string-calculator", function() {
        it("should respond 200", function() {
            supertest(server.getExpressServer())
                .get("/string-calculator")
                .expect(200);
        });
        
        it("should respond the result of string-calculator#add(s) if the \"add\" key is present in the query string and s is the value for it", function() {
            supertest(server.getExpressServer())
                .get("/string-calculator?add=1,2")
                .expect(200, stringCalculator.add("1,2")); // ignoring the logic of #add
        });
        
        it("should catch errors thrown by #add and respond the error message", function() {
            var s = "2,-4,3,-5";
            var message;
            try {stringCalculator.add(s);} catch (e) {message = e.message} // ignoring the logic of #add
            supertest(server.getExpressServer())
                .get("/string-calculator?add=" + s)
                .expect(200, message);
        });
    });
});
