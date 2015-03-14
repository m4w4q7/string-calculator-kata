var express = require("express")();

module.exports = {
    configure: function() {
        express
            .get("/string-calculator", function(req, res) {
                res.sendStatus(200);
            });
        return this;
    },
    start: function() {
        express.listen(process.env.PORT);
    },
    getExpressServer: function() {
        return express;
    }
}
