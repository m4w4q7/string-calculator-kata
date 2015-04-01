var LIMIT = 1000;



var DelimiterSplitter = (function() {	
	
	var DelimiterSplitter = function(delimiterSequence) {
		this._delimiterSplitterRegExp = /(?:\[([^\[\]]*)\])?/g;
		this._delimiterSequence = delimiterSequence;
	};
	
	DelimiterSplitter.prototype.nextDelimiterFromBracket = function() {
		return this._delimiterSplitterRegExp.exec(this._delimiterSequence)[1];
	};
	
	return DelimiterSplitter;
})();


var StringSplitter = (function() {
	
	var StringSplitter = function(inputString, delimiters) {
		this.stringArray = [inputString];
		if (delimiters) this.split(delimiters);
	};
	
	StringSplitter.prototype.split = function(delimiters) {
		var delimitersOrderedByDescendingLength = orderDelimitersByDescendingLength(delimiters);
		delimitersOrderedByDescendingLength.forEach(this._refineSplit.bind(this));
	};
	
	StringSplitter.prototype.getSplittedStrings = function() {
		return this.stringArray.slice();
	};
	
	StringSplitter.prototype._refineSplit = function(delimiter) {
		var refinedStringArray = [];
		this.stringArray.forEach(function(s) {extendArray(refinedStringArray, s.split(delimiter))});
		this.stringArray = refinedStringArray;
	};
	
	function orderDelimitersByDescendingLength(delimiters) {
		return delimiters.sort(function(e1, e2) {return e2.length - e1.length});
	}
	
	function extendArray(array1, array2) {
		array1.push.apply(array1, array2);
	}
	
	return StringSplitter;
})();



function getDelimiters(delimiterSequence) {
	
	if (!delimiterSequence) return [/[,\n]/];
	
	var delimitersFromBrackets = [];
	var delimiterSplitter = new DelimiterSplitter(delimiterSequence);
	
	var delimiter = delimiterSplitter.nextDelimiterFromBracket();
	while (delimiter !== undefined) {
		delimitersFromBrackets.push(delimiter);
		delimiter = delimiterSplitter.nextDelimiterFromBracket();
	}
		
	return delimitersFromBrackets.length ? delimitersFromBrackets : [delimiterSequence];
}


function getNumbers(numberSequence, delimiters) {
	
	var numberSequenceSplitter = new StringSplitter(numberSequence, delimiters);
	var numbers = numberSequenceSplitter.getSplittedStrings().map( function(s) {return parseInt(s, 10)} );
	
	return numbers;
}



module.exports.add = function(calculatorInputString) {
	
	var delimiterSequenceRegExp = /^(?:\/\/(.+)\n)?/g;
	
	var delimiterSequence = delimiterSequenceRegExp.exec(calculatorInputString)[1];
	var numberSequence = calculatorInputString.substr(delimiterSequenceRegExp.lastIndex);
	
	if (numberSequence === "") return 0;
	
	var delimiters = getDelimiters(delimiterSequence);
	var numbers = getNumbers(numberSequence, delimiters);
	
	var negativeNumbers = numbers.filter( function(number) {return number < 0} );
	if (negativeNumbers.length) throw new RangeError("Negatives not allowed: " + negativeNumbers.join());
	
	var numbersBelowTheLimit = numbers.filter( function(number) {return number <= LIMIT} );
	var sum = numbersBelowTheLimit.reduce( function(e1, e2) {return e1 + e2}, 0 );
	return sum;
};
