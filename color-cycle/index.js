const startingColors = [];
const increments = [];

function getStartingColor() {
	//Function to get the starting colors and return the starting color as a hex color string, ie rrggbb
	let red, green, blue;
	red = document.getElementById('starting-red').value.toUpperCase();
	green = document.getElementById('starting-green').value.toUpperCase();
	blue = document.getElementById('starting-blue').value.toUpperCase();
	startingColors[0] = red;
	startingColors[1] = green;
	startingColors[2] = blue;
	return `${red}${green}${blue}`;
}

function getIncrements() {
	//Function to get the increments and return the total increment as a hex color string, ie #rrggbb.
	let redInc, greenInc, blueInc;
	redInc = document.getElementById('increment-red').value.toUpperCase();
	greenInc = document.getElementById('increment-green').value.toUpperCase();
	blueInc = document.getElementById('increment-blue').value.toUpperCase();
	increments[0] = redInc;
	increments[1] = greenInc;
	increments[2] = blueInc;
	return `${redInc}${greenInc}${blueInc}`;
}

function validateInput(input) {
	//Function to validate if each input (text) field was entered with a valid value. An input is considered valid if it contains only hexadecimal digits and non-negative non-empty values.
	if (!input instanceof String) return false;
	if (
		input === '' //empty fields
	)
		return false;
	if (
		input[0] === '-' //negative values
	)
		return false;
	let valid = true;
	for (let i = 0; i < input.length && valid; i++) {
		if (!input[i].match(/[0-9A-F]/i)) {
			//if there is a character that isnt in 0-9 or A-F
			valid = false;
		}
	}
	return valid;
}

function calculateColors() {
	//Returns a 10 lenght array with the colors calculated with startingColors and increments. The 0 position is the starting color. For each other poisition, it takes the last position and sums (hexadecimal sum) with the increment. If the color would be greater than FFFFFF, then it gets set to FFFFFF. These numbers then are converted to strings.
	let colors = new Array();
	const increment = parseInt(`${increments[0]}${increments[1]}${increments[2]}`, 16);
	colors[0] = parseInt(`${startingColors[0]}${startingColors[1]}${startingColors[2]}`, 16);
	for (let i = 1; i < 10; i++) {
		colors[i] = colors[i - 1] + increment;
		if (colors[i] > 0xffffff) colors[i] = 0xffffff;
	}
	for (let i = 0; i < 10; i++) {
		colors[i] = colors[i].toString(16).toUpperCase();
		for (let j = colors[i].length; j < 6; j++) colors[i] = '0' + colors[i]; //Fix string to lenght 6
	}
	return colors;
}

function findKeyframe(name) {
	//Function that will find the keyframe rule object that will do the filling of the app
	let ss = document.styleSheets[0]; //get the CSS stylesheet
	for (let i = 0; i < ss.cssRules.length; i++) {
		//loop through the rules to find the keyframes rule
		if (ss.cssRules[i].type === 7 && ss.cssRules[i].name === name) return ss.cssRules[i];
	}
	return null;
}

let btn = document.querySelector('button');
let btnStatus = 'start';
btn.addEventListener('click', () => {
	if (btnStatus === 'start') {
		getStartingColor();
		getIncrements();
		let valid = true;
		for (const input of [ ...startingColors, ...increments ]) {
			if (!validateInput(input)) valid = false;
		}
		if (!valid) {
			alert('Invalid input');
		} else {
			const colors = calculateColors();
			let keyframe = findKeyframe('fill');
			if (!keyframe) {
				alert('Not able to find CSS Keyframe Rule');
			} else {
				for (let i = 0; i < colors.length; i++) {
					//Generate ruleset for the animation and remove old ruleset
					if (keyframe.findRule(`${10 * i}%`)) {
						keyframe.deleteRule(`${10 * i}%`);
					}
					keyframe.appendRule(`${10 * i}% {background-color: #${colors[i]};}`);
				}
				//Add animation
				document.querySelector('.box').classList.add('box-animation');
				//Block all inputs
				document.querySelectorAll('input').forEach((el) => {
					el.disabled = true;
				});
				//Update Button
				btn.innerText = 'Stop';
				btn.classList.remove('btn-start');
				btn.classList.add('btn-stop');
				btnStatus = 'stop';
			}
		}
	} else if (btnStatus === 'stop') {
		//Stop animation
		document.querySelector('.box').classList.remove('box-animation');
		//Unblock inputs
		document.querySelectorAll('input').forEach((el) => {
			el.disabled = false;
		});
		//Change button
		btn.innerText = 'Start';
		btn.classList.remove('btn-stop');
		btn.classList.add('btn-start');
		btnStatus = 'start';
	}
});
