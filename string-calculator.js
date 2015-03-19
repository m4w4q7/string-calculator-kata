var _limit = 1000;

function _getDelimiter(delimiterSequence) {
	if (!delimiterSequence) return /[,\n]/;
	var longDelimiterRegExp  = /(?:\[(.*)\])?/;
	var longDelimiter = longDelimiterRegExp.exec(delimiterSequence)[1];
	return longDelimiter === undefined ? delimiterSequence : longDelimiter;
}

module.exports.add = function(calculatorInputString) {
		
	var delimiterSequenceRegExp = /^(?:\/\/(.+)\n)?/g;
	
	var delimiterSequence = delimiterSequenceRegExp.exec(calculatorInputString)[1];
	var numberSequence = calculatorInputString.substr(delimiterSequenceRegExp.lastIndex);
	
	if (numberSequence === "") return 0;
	
	var delimiter = _getDelimiter(delimiterSequence);
	var numbers = numberSequence.split(delimiter).map( function(s) {return parseInt(s, 10)} );
	
	var negativeNumbers = numbers.filter( function(number) {return number < 0} );
	if (negativeNumbers.length) throw new RangeError("Negatives not allowed: " + negativeNumbers.join());
	
	var numbersBeyondTheLimit = numbers.filter(function(number) {return number <= _limit});
	var sum = numbersBeyondTheLimit.reduce( function(e1, e2) {return e1 + e2}, 0 );
	return sum;
};
