module.exports = {
    add: function(s) {
        
        var delimiter = /[,\n]/;
        
        var ds = /^\/\/(.+)\n(.*$)/.exec(s);
        if (ds) {
            delimiter = ds[1];
            s = ds[2];
        }
        
        var negativeNumbers = [];
        var result = s ? s.split(delimiter).reduce( function(e1, e2) {
            
            var e2 = parseInt(e2, 10);
            if (e2 < 0) negativeNumbers.push(e2);
            
            return (e1 + e2);
            
        }, 0) : 0;
        
        if (negativeNumbers.length) throw new RangeError("Negatives not allowed: " + negativeNumbers.join());
        
        return s ? s.split(delimiter).reduce(function(e1, e2) {return e1 + parseInt(e2, 10)}, 0) : 0;
        
    }
};