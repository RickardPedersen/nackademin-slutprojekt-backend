const user = {
	email: 'johan.kivi@zocom.se',
	password: 'password123',
	repeatPassword: 'password123',
	name: 'Johan Kivi',
	role: 'admin',
	adress: {
		street: 'Tokitokvägen 3',
		zip: '123 45',
		city: 'Tokberga',
	},
	orderHistory: ['123', '124', '125'],
}

const invalidUser = {
	password: 'password123',
	repeatPassword: 'password123',
	adress: {
		street: 'Tokitokvägen 3',
		zip: '123 45',
		city: 'Tokberga',
	},
	orderHistory: ['123', '124', '125'],
}

module.exports = {
	user,
	invalidUser,
}
