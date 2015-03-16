module.exports = {
    add: function(s) {
        
        return s ? s.split(/[,\n]/).reduce(function(e1, e2) {return e1 + parseInt(e2, 10)}, 0) : 0;
        
    }
};