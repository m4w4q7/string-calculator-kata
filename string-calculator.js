module.exports = {
    add: function(s) {
        
        /* Y U NO WORK?
        var args = /^(-?\d+)(?:,(-?\d+))?$/.exec(s);
        if (args) {
            args.shift();
            return args.reduce(function(e1, e2) {return e1 + parseInt(e2, 10)}, 0);
        } ...
        */
        
        return s ? s.split(",").reduce(function(e1, e2) {return e1 + parseInt(e2, 10)}, 0) : 0;
        
    }
};