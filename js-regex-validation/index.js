clear();
document.querySelector('button').setAttribute('disabled', 'true');

document.getElementById('username').addEventListener('input', (event) => {
	const field = event.target;
	const username = event.target.value;
	if (checkUsername(username)) {
		//If regex matches the username
		if (field.classList.contains('input-error')) {
			//If the input is marked with the error class
			field.classList.remove('input-error');
			removeError('username-text');
		}
	} else {
		if (!field.classList.contains('input-error')) {
			//Input isnt marked with the error class
			field.classList.add('input-error');
			insertError(field, 'Only letters allowed on username.', 'username-text');
		}
	}
});

function checkUsername(username) {
	if (typeof username != 'string') return false;
	const regex = /^[A-Z|a-z]+$/;
	return regex.test(username);
}

document.getElementById('password').addEventListener('input', (event) => {
	const field = event.target;
	const password = event.target.value;
	if (checkPassword(password)) {
		//If regex matches the username
		if (field.classList.contains('input-error')) {
			//If the input is marked with the error class
			field.classList.remove('input-error');
			removeError('password-text');
		}
	} else {
		if (!field.classList.contains('input-error')) {
			//Input isnt marked with the error class
			field.classList.add('input-error');
			insertError(field, 'Password lenght must be greater than 5 and without white spaces.', 'password-text');
		}
	}
});

function checkPassword(password) {
	if (typeof password != 'string') return false;
	const regex = /^[^\s\r\n]{5,}$/; //Anything other than white spaces, tabs, linefeeds and carriage returns
	return regex.test(password);
}

document.getElementById('email').addEventListener('input', (event) => {
	const field = event.target;
	const email = event.target.value;
	if (checkEmail(email)) {
		if (field.classList.contains('input-error')) {
			field.classList.remove('input-error');
			removeError('email-text');
		}
	} else {
		if (!field.classList.contains('input-error')) {
			field.classList.add('input-error');
			insertError(
				field,
				'Email cant begin with a number, only letters and numbers allowed and must be @gmail.com',
				'email-text'
			);
		}
	}
});

function checkEmail(email) {
	if (typeof email != 'string') return false;
	const regex = /^[a-z|A-z][a-z|A-Z|0-9]{2,}@gmail.com$/; //email com ao menos tamanho 3, somente letras e numeros e terminados com gmail.com
	return regex.test(email);
}

document.querySelector('form').addEventListener('input', () => {
	//Enable or disable button whenever user types on the inputs.
	const usernameInput = document.getElementById('username');
	const passwordInput = document.getElementById('password');
	const emailInput = document.getElementById('email');
	if (
		!usernameInput.classList.contains('input-error') &&
		!passwordInput.classList.contains('input-error') &&
		!emailInput.classList.contains('input-error') &&
		usernameInput.value !== '' &&
		passwordInput.value !== '' &&
		emailInput.value !== ''
	) {
		//If no input field is marked with the input-error class and none is empty
		document.querySelector('button').removeAttribute('disabled');
	} else {
		document.querySelector('button').setAttribute('disabled', 'true');
	}
});

document.querySelector('button').addEventListener('click', () => {
	alert('validated');
});

function clear() {
	document.getElementById('username').value = '';
	document.getElementById('password').value = '';
	document.getElementById('email').value = '';
}

function insertError(field, text, id) {
	//Inserts a error message below the input field that called the function.
	let p = document.createElement('P');
	p.appendChild(document.createTextNode(text));
	p.classList.add('error-text');
	p.setAttribute('id', id);
	field.parentNode.insertBefore(p, field.nextSibling);
}

function removeError(id) {
	//Remove error message from an input field
	document.getElementById(id).remove();
}
