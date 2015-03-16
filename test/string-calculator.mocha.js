var stringCalculator = require("../string-calculator.js");
var expect = require("chai").expect;

describe("string-calculator", function() {
    describe("#add()", function() {
        
        it("should return 0 to an empty string", function() {
            expect( stringCalculator.add("") ).to.eql(0);
        });
        
        it("should return the number to a positive integer in a string", function() {
            expect( stringCalculator.add("4") ).to.eql(4);
        });
        
        it("should return the number to a negative integer in a string", function() {
            expect( stringCalculator.add("-4") ).to.eql(-4);
        });
        
        it("should return the sum of two numbers if two integers are given separated by a single comma", function() {
            expect( stringCalculator.add("-4,-1") ).to.eql(-5);
        });
        
        it("should accept not just commas as delimiters, but also new line characters", function() {
            expect( stringCalculator.add("1\n2,3") ).to.eql(6);
        });
        
        it("should use another delimiter if it's specified in the first line (e.g. '//;' for ';' as delimiter)", function() {
           expect( stringCalculator.add("//;\n1;2") ).to.eql(3);
        });
        
    })
});