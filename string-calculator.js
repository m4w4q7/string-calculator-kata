var _limit = 1000;

module.exports.add = function(calculatorInputString) {
		
	var delimiterRegExp = /^(?:\/\/(.)\n)?/g;
	
	var delimiterSequence = delimiterRegExp.exec(calculatorInputString)[1];
	var numberSequence = calculatorInputString.substr(delimiterRegExp.lastIndex);
	
	if (numberSequence === "") return 0;
	
	var delimiter = delimiterSequence || /[,\n]/;
	var numbers = numberSequence.split(delimiter).map( function(s) {return parseInt(s, 10)} );
	
	var negativeNumbers = numbers.filter( function(number) {return number < 0} );
	if (negativeNumbers.length) throw new RangeError("Negatives not allowed: " + negativeNumbers.join());
	
	var numbersBeyondTheLimit = numbers.filter(function(number) {return number <= _limit});
	var sum = numbersBeyondTheLimit.reduce( function(e1, e2) {return e1 + e2}, 0 );
	return sum;
};
