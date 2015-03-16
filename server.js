var app = require("express")();
var stringCalculator = require("./string-calculator.js");

module.exports = {
    
    configure: function() {
        app
            .get("/string-calculator", function(req, res) {
                if ("add" in req.query) {
                    res.send(stringCalculator.add(req.query.add).toString());
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
