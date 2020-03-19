const people = [
	{
		name: 'Pedro',
		surname: 'de Oliveira',
		street: 'Rua Duque de Caxias, 2568',
		city: 'São Paulo',
		country: 'Brazil',
		email: 'pedro@example.com',
		job: 'Analyst',
		photo:
			'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-grey-photo-placeholder-illustrations-vectors-default-avatar-profile-icon-grey-photo-placeholder-99724602.jpg'
	},
	{
		name: 'Gabriela',
		surname: 'Moura',
		street: 'Rua D. Pedro, 568',
		city: 'Porto',
		country: 'Portugal',
		email: 'gabriela@example.com',
		job: 'Informant',
		photo:
			'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-default-avatar-photo-placeholder-profile-icon-female-eps-file-easy-to-edit-124557835.jpg'
	},
	{
		name: 'Jonas',
		surname: 'Vasconcelos',
		street: 'Rua Duque de Caxias, 2568',
		city: 'São Paulo',
		country: 'Brazil',
		email: 'jonas@example.com',
		job: 'Writer',
		photo:
			'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-grey-photo-placeholder-illustrations-vectors-default-avatar-profile-icon-grey-photo-placeholder-99724602.jpg'
	}
];

const contentDiv = document.querySelector('.content');
const peopleList = Array.from(document.querySelectorAll('.personItem'));
let activeItem;

//Adding event handler for list items
peopleList.forEach((el) => {
	el.addEventListener('click', () => {
		//Change the item style in the list
		if (activeItem !== undefined) {
			activeItem.classList.remove('activeItem'); //remove activeItem class from last clicked item
		}
		activeItem = el;
		activeItem.classList.add('activeItem'); //add activeItem class to clicked item

		displayContent(activeItem);
	});
});

function displayContent(el) {
	//Function that display the content of the received item element of the peopleList.
	const personName = el.textContent;
	const person = people.find((person) => person.name === personName);
	if (person) {
		//If it found the person on the people array
		let image = document.createElement('IMG');
		image.src = person.photo;
		image.classList.add('photo');

		let fullName = document.createElement('H3');
		fullName.appendChild(document.createTextNode(`${person.name} ${person.surname}`));

		let address = document.createElement('P');
		address.appendChild(document.createTextNode(`${person.street}, ${person.city}, ${person.country}`));

		let job = document.createElement('P');
		job.appendChild(document.createTextNode(`${person.job}`));

		let email = document.createElement('A');
		email.appendChild(document.createTextNode(`${person.email}`));
		email.href = `mailto:${person.email}`;

		contentDiv.innerHTML = '';
		contentDiv.appendChild(image);
		contentDiv.appendChild(fullName);
		contentDiv.appendChild(job);
		contentDiv.appendChild(address);
		contentDiv.appendChild(email);
	}
}
