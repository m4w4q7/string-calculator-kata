var _limit = 1000;


function _getDelimiters(delimiterSequence) {
	
	if (!delimiterSequence) return [/[,\n]/];
	
	var delimitersFromBrackets = [];
	var delimiterSplitterRegExp  = /(?:\[([^\[\]\n]*)\])?/g;
	var delimiter = delimiterSplitterRegExp.exec(delimiterSequence)[1];
	while (delimiter !== undefined) {
		delimitersFromBrackets.push(delimiter);
		delimiter = delimiterSplitterRegExp.exec(delimiterSequence)[1];
	}
	
	return delimitersFromBrackets.length ? delimitersFromBrackets : [delimiterSequence];
}


function _getNumbers(numberSequence, delimiters) {
	
	var numbersAsStrings = [numberSequence];
	for (var i = 0; i < delimiters.length; i++) {
		numbersAsStrings = _refineSplit(numbersAsStrings, delimiters[i]);
	}
	
	var numbers = numbersAsStrings.map( function(s) {return parseInt(s, 10)} );
	return numbers;
}


function _refineSplit(stringArray, delimiter) {
	
	var refinedStringArray = [];
	
	for (var i = 0; i < stringArray.length; i++) {
		_extendArray(refinedStringArray, stringArray[i].split(delimiter));
	}
	
	return refinedStringArray;
}


function _extendArray(array1, array2) {
	Array.prototype.push.apply(array1, array2);
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
