module.exports = {
    add: function(s) {
        
        var delimiter = /[,\n]/;
        
        var ds = /^\/\/(.)\n(.*$)/.exec(s);
        if (ds) {
            delimiter = ds[1];
            s = ds[2]
        };
        
        return s ? s.split(delimiter).reduce(function(e1, e2) {return e1 + parseInt(e2, 10)}, 0) : 0;
        
    }
};