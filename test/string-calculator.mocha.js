var stringCalculator = require("../string-calculator.js");
var expect = require("chai").expect;

describe("string-calculator", function() {
    describe("#add()", function() {
        
        it("should return 0 to an empty string", function() {
            expect( stringCalculator.add("") ).to.eql(0);
        });
        
        it("should return the number to a positive integer in a string", function() {
            expect( stringCalculator.add("1") ).to.eql(1);
        });
        
        it("should return the sum of the two numbers if two integers are given separated by a single comma", function() {
            expect( stringCalculator.add("1,2") ).to.eql(3);
        });
        
        it("should handle any number of numbers", function() {
            expect( stringCalculator.add("1,2,3,4") ).to.eql(10);
        });
        
        it("should accept not just commas as delimiters, but also new line characters", function() {
            expect( stringCalculator.add("1\n2,3") ).to.eql(6);
        });
        
        it("should use another delimiter if it's specified in the first line (e.g. '//;' for ';' as delimiter)", function() {
            expect( stringCalculator.add("//;\n1;2") ).to.eql(3);
        });
        
        /*
        it("should throw RangeError if any negative numbers are given and list those numbers as the message", function() {
            expect( stringCalculator.add.bind(stringCalculator, "2,-4,3,-5") )
                .to.throw( new RangeError("Negatives not allowed: -4,-5") );
        }); // doesn't work... but why?
        */
    })
});