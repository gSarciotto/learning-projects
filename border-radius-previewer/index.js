const box = document.querySelector('.inner');

box.setAttribute('style', 'border-radius: 30% 15%');

const radiuses = [
	box.style.borderTopLeftRadius,
	box.style.borderTopRightRadius,
	box.style.borderBottomRightRadius,
	box.style.borderBottomLeftRadius
];
//radiuses[0]=top-left, radiuses[1]=top-right, radiuses[2]=bottom-right, radiuses[3]=bottom-left;

function updateOutput() {
	document.querySelector(
		'.output-box'
	).innerHTML = `border-radius: ${radiuses[0]} ${radiuses[1]} ${radiuses[2]} ${radiuses[3]}`;
}

updateOutput();

//Event handler to sliders
document.querySelector('.sliders-div').addEventListener('change', (e) => {
	const value = `${e.target.value}%`;
	switch (e.target.id) {
		case 'top-left':
			radiuses[0] = value;
			box.style.borderTopLeftRadius = value;
			break;
		case 'top-right':
			radiuses[1] = value;
			box.style.borderTopRightRadius = value;
			break;
		case 'bottom-right':
			radiuses[2] = value;
			box.style.borderBottomRightRadius = value;
			break;
		case 'bottom-left':
			radiuses[3] = value;
			box.style.borderBottomLeftRadius = value;
			break;

		default:
			alert('Error updating values.');
			break;
	}
	updateOutput();
});

//event handler to copy button
document.querySelector('#btn-copy').addEventListener('click', () => {
	let text = `border-radius: ${radiuses[0]} ${radiuses[1]} ${radiuses[2]} ${radiuses[3]};`;
	navigator.clipboard.writeText(text).catch(() => alert('Couldn`t copy to clipboard.'));
});

/*Possible extra features:
Size adjustment
8 border radius selectors
Color change
Export the generated shape to an image?
*/
