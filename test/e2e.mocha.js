var supertest = require("supertest");
var server = require("../server.js");

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
    });
});
