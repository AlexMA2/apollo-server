export const users = [
	{
		id: '1',
		username: 'Miguel',
		email: 'Miguel@hotmail.com',
		playedGames: [
			{
				id: '1',
				puntuation: 500.5,
				time: 'SLOW',
				date: '2021-10-10T10:00:00+00',
				user: {
					id: '1',
					username: 'Miguel',
					email: 'Miguel@hotmail.com'
				}
			}
		]
	},
	{
		id: '2',
		username: 'Carlos',
		email: 'Carlos@gmail.com'
	},
	{
		id: '3',
		username: 'John',
		email: 'john@gmail.com'
	}
]

export const games = [
	{
		id: '1',
		puntuation: 10.5,
		time: 'SLOW',
		date: '2021-10-10T10:00:00',
		user: {
			id: '1',
			username: 'Miguel',
			email: 'Miguel@hotmail.com'
		}
	},
	{
		id: '2',
		puntuation: 100.5,
		time: 'MEDIUM',
		date: '2023-10-10T10:00:00',
		user: {
			id: '1',
			username: 'Miguel',
			email: 'Miguel@hotmail.com'
		}
	},
	{
		id: '3',
		puntuation: 5400.5,
		time: 'SLOW',
		date: '2021-11-10T10:00:00',
		user: {
			id: '1',
			username: 'Miguel',
			email: 'Miguel@hotmail.com'
		}
	},
	{
		id: '4',
		puntuation: 200.5,
		time: 'FAST',
		date: '2021-03-10T05:00:00',
		user: {
			id: '1',
			username: 'Miguel',
			email: 'Miguel@hotmail.com'
		}
	}
]

export const tournaments = []
