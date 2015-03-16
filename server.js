var app = require("express")();
var stringCalculator = require("./string-calculator.js");

module.exports = {
    
    configure: function() {
        app
            .get("/string-calculator", function(req, res) {
                if ("add" in req.query) {
                    var response;
                    try {
                        response = stringCalculator.add(req.query.add).toString();
                    } catch(e) {
                        response = e.message;
                    }
                    res.send(response);
                } else {
                    res.sendStatus(200);
                }
            });
        return this;
    },
    
    start: function() {
        app.listen(process.env.PORT);
    },
    
    getExpressServer: function() {
        return app;
    }
}
