(function(brainFuck) {

	// DOM Elements
	var taIn = document.getElementById('in');
	var taOut = document.getElementById('out');
	var bRun = document.getElementById('run');
	var tfInput = document.getElementById('input');
	
	bRun.addEventListener('click', function() {
		brainFuck.setInput(taIn.value);
		brainFuck.setInputParameters(tfInput.value.split(' '));
		brainFuck.run();
		taOut.value = brainFuck.getOutput();
	});

}(BrainFuck));