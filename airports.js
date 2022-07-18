const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c5021b9093msh0940257b8e45e67p131856jsnd843a61c28e2',
		'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
	}
};

fetch('https://airport-info.p.rapidapi.com/airport', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));