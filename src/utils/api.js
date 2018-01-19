var axios = require('axios');

const api = {

	fetchFlights: function (body) {
		var encodedURI = window.encodeURI(
			'https://api-dev.fareportallabs.com/air/api/search/searchflightavailability'
			);

		var headers = {
			headers: {
	            'Content-Type': 'application/json',
	            'Authorization': 'Basic anVzdGlubWNsYXJlbjYzQGdtYWlsLmNvbTpTd29yZGZpc2gx' 
	        }
        }

		return axios.post(encodedURI, body, headers)
			.then(function (response) {
				
				return response;

			});
	}
}

export default api;