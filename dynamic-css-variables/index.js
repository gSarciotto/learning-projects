document.getElementById('btn-login').addEventListener('click', () => {
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;
	let flag = false;
	let errorMessage = '';
	if (username !== 'testuser') {
		flag = true;
		//Set background color to error color
		document.getElementById(
			'username'
		).style.backgroundColor = document.styleSheets[0].cssRules[0].style.getPropertyValue(
			'--error-background-color'
		);
		errorMessage += 'Wrong username.';
	}
	if (password != 'mypassword') {
		document.getElementById(
			'password'
		).style.backgroundColor = document.styleSheets[0].cssRules[0].style.getPropertyValue(
			'--error-background-color'
		);
		if (flag) {
			errorMessage += '\nWrong password.';
		} else {
			flag = true;
			errorMessage += 'Wrong password';
		}
	}
	if (flag) {
		alert(errorMessage);
	} else {
		alert('Login sucessful!!');
	}
});

document.getElementById('btn-cancel').addEventListener('click', () => {
	let usernameField = document.getElementById('username');
	let passwordField = document.getElementById('password');
	clearField(usernameField);
	clearField(passwordField);
});

function clearField(element) {
	element.value = '';
	//Set background color
	element.style.backgroundColor = document.styleSheets[0].cssRules[0].style.getPropertyValue(
		'--default-background-color'
	);
	//Remove warning paragraph is there is any associated with that field.
	let warning = document.getElementById(`${element.id}-warning`);
	if (warning) {
		//if there is a warning paragraph
		warning.remove();
	}
}

const checkSpaces = (event) => {
	const element = event.target;
	const value = element.value;
	const field = element.id;
	let flag;
	if (document.getElementById(`${field}-warning`)) {
		//If there is an element with id username-warning
		flag = true;
	} else {
		flag = false;
	}
	if (value.includes(' ')) {
		//Input has blank spaces
		if (!flag) {
			//seta background pra warning color
			element.style.backgroundColor = document.styleSheets[0].cssRules[0].style.getPropertyValue(
				'--warning-background-color'
			);
			//Adiciona o warning paragraph
			let paragraph = document.createElement('P');
			paragraph.appendChild(document.createTextNode('Warning! Blank spaces aren`t valid.'));
			paragraph.setAttribute('id', `${field}-warning`);
			paragraph.setAttribute('class', 'warning');
			let input = document.getElementById(field);
			input.parentNode.insertBefore(paragraph, input.nextSibling);
		}
	} else {
		if (flag) {
			//Colocar o background color pro default
			element.style.backgroundColor = document.styleSheets[0].cssRules[0].style.getPropertyValue(
				'--default-background-color'
			);
			//Tirar o warning
			document.getElementById(`${field}-warning`).remove();
		}
	}
};

document.getElementById('username').addEventListener('input', checkSpaces);
document.getElementById('password').addEventListener('input', checkSpaces);
