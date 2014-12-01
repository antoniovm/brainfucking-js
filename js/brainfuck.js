var BrainFuck = (function(window, document){
	
	// DOM Elements
	/*var taIn = document.getElementById('in');
	var taOut = document.getElementById('out');
	var bRun = document.getElementById('run');
	var tfInput = document.getElementById('input');*/
	
	var input = '';
	var output = ''; 
	var parameters = [];
	
	// Local Storage Object
	var localStorage = window.localStorage;
	
	// Tape and pointer
	var tape = [0];
	var ptr = 0;
	
	//init();
	//restoreData();
	
	/**
	* Restore data from localStorage
	*/
	function restoreData(key) {
		var storedData = localStorage.getItem(key);
		
		if(storedData !== null){
			input = storedData;
		}
	}
	
	/**
	* Save data to localStorage
	*/
	function saveData(key, value) {
		localStorage.setItem(key, value);
	}
	
	/**
	*	Resets all the parameters
	*/
	function reset() {
		output = '';
		ptr = 0;
		tape = [0];
	}
	
	/**
	* Find brackets for handling loops
	*/
	function findBrackets(splitString){
		var stack = [];
		var brackets = {};
		
		for (var i = 0; i < splitString.length; i++){
			if(splitString[i] === '['){
				stack.push(i);
				continue;
			}
			
			if (splitString[i] === ']'){
				brackets[stack.pop()] = i;
				continue;
			}
		}
		return brackets;
	}
	
	function setInput(inputString) {
		input = inputString;
	}
	
	
	/**
	* 
	*/
	function setInputParameters(params) {
		parameters = params;
	}

	function run() {
		
		reset();
		
		var inputString = input.replace(/[^+-<>\[\]\.]/g,'');
		var splitString = inputString.split('');
		
		var brackets = findBrackets(splitString);
		var currentBrackets = [];
		
		// var input = readInput();
		
		for (var i = 0; i < splitString.length; i++) {
			var elem = splitString[i];
			
			switch(elem){
				
				case '>':
					ptr++;
					if(ptr >= tape.length){
						tape.push(0);
					}
					break;
					
				case '<':
					if(ptr === 0){
						ptr = 0;
					}
					else {
						ptr--;
					}
					break;
					
				case '+':
					tape[ptr]++;
					break;
					
				case '-':
					tape[ptr]--;
					break;
					
				case '.':
					output += tape[ptr];
					break;
					
				case ',':
					if(parameters.length > 0) {
						tape[ptr] = parameters.shift();
					}
					break;
					
				case '[':
					currentBrackets.push(i);
					if (tape[ptr] === 0) {
						i = brackets[i] + 1;
					}
					break;
					
				case ']':
					if(tape[ptr] !== 0){
						i = parseInt(currentBrackets[currentBrackets.length - 1], 10);
					}
					else {
						currentBrackets.pop();
					}
				default: break;
			}
		}
		
		
	}
	
	function getOutput() {
		return output;
	}
	
	return {
		getOutput: getOutput,
		run: run,
		setInput: setInput,
		setInputParameters: setInputParameters
	};
	

})(window,document);