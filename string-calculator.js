module.exports = (function() {
	
	var _limit = 1000;
	
	var _getDelimiter = function(calculatorInputString) {
		var delimiterRegExp = /^\/\/(.)\n/;
		return delimiterRegExp.test(calculatorInputString) ? delimiterRegExp.exec(calculatorInputString)[1] : /[,\n]/;
	};
	
	var _getNumberSequence = function(calculatorInputString) {
		var numberSequenceRegExp = /^(?:\/\/.\n)?((?:.|[\n\r])*)$/;
		return numberSequenceRegExp.exec(calculatorInputString)[1];
	};
	
	var _removeNumbersBeyondTheLimit = function(numbers) {
		return numbers.filter(function(number) {return number <= _limit});
	};
	
	var sum = function(numbers) {
		return numbers.reduce( function(e1, e2) {return e1 + e2}, 0 );
	}
	
	var add = function(calculatorInputString) {
		
		var delimiter = _getDelimiter(calculatorInputString);
		var numberSequence = _getNumberSequence(calculatorInputString);
		
		if (numberSequence === "") return 0;
		
		var numbers = numberSequence.split(delimiter).map( function(s) {return parseInt(s, 10)} );
		
		var negativeNumbers = numbers.filter( function(number) {return number < 0} );
		
		if (negativeNumbers.length) throw new RangeError("Negatives not allowed: " + negativeNumbers.join());
		
		return sum(_removeNumbersBeyondTheLimit(numbers));
	};
	
	return {
		add: add
	};
})();