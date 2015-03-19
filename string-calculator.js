var _limit = 1000;


var _DelimiterSplitter = (function() {
	
	var DelimiterSplitter = function(delimiterSequence) {
		this._delimiterSplitterRegExp = /(?:\[([^\[\]]*)\])?/g;
		this._delimiterSequence = delimiterSequence;
	};
	
	DelimiterSplitter.prototype.nextDelimiterFromBracket = function() {
		return this._delimiterSplitterRegExp.exec(this._delimiterSequence)[1];
	};
	
	return DelimiterSplitter;
})();


function _getDelimiters(delimiterSequence) {
	
	if (!delimiterSequence) return [/[,\n]/];
	
	var delimitersFromBrackets = [];
	var delimiterSplitter = new _DelimiterSplitter(delimiterSequence);
	
	var delimiter = delimiterSplitter.nextDelimiterFromBracket();
	while (delimiter !== undefined) {
		delimitersFromBrackets.push(delimiter);
		delimiter = delimiterSplitter.nextDelimiterFromBracket();
	}
		
	return delimitersFromBrackets.length ? delimitersFromBrackets : [delimiterSequence];
}


function _getNumbers(numberSequence, delimiters) {
	
	var delimitersOrderedByDescendingLength = delimiters.sort(function(e1, e2) {return e2.length - e1.length});
	
	var numbersAsStrings = [numberSequence];
	delimitersOrderedByDescendingLength.forEach(function(delimiter) {
		numbersAsStrings = _refineSplit(numbersAsStrings, delimiter);
	});
	
	var numbers = numbersAsStrings.map( function(s) {return parseInt(s, 10)} );
	return numbers;
}


function _refineSplit(stringArray, delimiter) {
	
	var refinedStringArray = [];
	stringArray.forEach(function(s) {_extendArray(refinedStringArray, s.split(delimiter))});
	
	return refinedStringArray;
}


function _extendArray(array1, array2) {
	array1.push.apply(array1, array2);
}



module.exports.add = function(calculatorInputString) {
	
	var delimiterSequenceRegExp = /^(?:\/\/(.+)\n)?/g;
	
	var delimiterSequence = delimiterSequenceRegExp.exec(calculatorInputString)[1];
	var numberSequence = calculatorInputString.substr(delimiterSequenceRegExp.lastIndex);
	
	if (numberSequence === "") return 0;
	
	var delimiters = _getDelimiters(delimiterSequence);
	var numbers = _getNumbers(numberSequence, delimiters);
	
	var negativeNumbers = numbers.filter( function(number) {return number < 0} );
	if (negativeNumbers.length) throw new RangeError("Negatives not allowed: " + negativeNumbers.join());
	
	var numbersBeyondTheLimit = numbers.filter(function(number) {return number <= _limit});
	var sum = numbersBeyondTheLimit.reduce( function(e1, e2) {return e1 + e2}, 0 );
	return sum;
};
