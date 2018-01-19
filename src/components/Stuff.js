import React from "react";
import api from "../utils/api";
import flights from "../flights.json";

class Stuff extends React.Component {

	state = {
		trip: flights,
		response: null
	};

//runs right after render()
	componentDidMount () {

		api.fetchFlights(this.state.trip)
			.then( (res) => {
				//log the response data
				console.log(res);
				//put response data into variables
				const priceArrayUnsort = res.data.FlightResponse.FpSearch_AirLowFaresRS.SegmentReference.RefDetails;
				const flightArrayOutUnsort = res.data.FlightResponse.FpSearch_AirLowFaresRS.OriginDestinationOptions.OutBoundOptions.OutBoundOption;

				//log variables
				console.log(priceArrayUnsort);
				console.log(flightArrayOutUnsort);

				//loop through each array the data paths run into.
				//first, get the price from the fare path...
				var adultFares = priceArrayUnsort.map(e => e.PTC_FareBreakdown.Adult.TotalAdultFare);
				//...and the code from the fare path
				var codeFaresArrays = priceArrayUnsort.map(e => e.OutBoundOptionId);
				var codeFares = codeFaresArrays.map(e => `${e}`);
				//second, get the code from the outbound segmentid path
				var codeFlights = flightArrayOutUnsort.map(e => e.Segmentid);
				//third, get the departure and arrival times
				var flightDepartTime = flightArrayOutUnsort.map(e => e.FlightSegment);
				var departTime = [];
				var arriveTime = [];
				flightDepartTime.map(e => e).forEach(x => {
					departTime.push(x[0].DepartureDateTime);
					arriveTime.push(x[0].ArrivalDateTime);
				});

				//use insertion sort to organize from lowest to highest price
				function insertionSort(adultFares) {
				  for(var i = 0; i < adultFares.length; i++) {
				    var temp = adultFares[i];
				    var j = i - 1;
				    while (j >= 0 && adultFares[j] > temp) {
				      adultFares[j + 1] = adultFares[j];
				      j--;
				    }
				    adultFares[j + 1] = temp;
				  }
				  return adultFares;
				};
				//call the insertion sort function and log it to the console
				insertionSort(adultFares);
				console.log(adultFares);

				console.log("fare codes correct");
				console.log(codeFares);
				console.log("================================================================")
				console.log("flight codes correct");
				console.log(codeFlights);
				console.log("================================================================")
				console.log("Departure times correct");
				console.log(departTime);
				console.log("----------------------------------------------------------------")
				console.log("Arrival times correct");
				console.log(arriveTime);

				console.log(departTime[codeFlights.indexOf("DY7016L9DY")]);
				console.log(arriveTime[codeFlights.indexOf("DY7016L9DY")]);

				//if I have codeFlights and I wanted to departTime or arriveTime,
				//look into indexOf.
				//departTime[codeFlights.indexOf("DYX&HJD")] >> grabs the depart time for this exact flight
				//arriveTime[codeFlights.indexOf("DYX&HJD")] >> same
				//
				//if I have the index, I could plug it into departTime, and would get the matching flight.


				this.setState({
					flightData: res.data.FlightResponse.FpSearch_AirLowFaresRS,
					flightPrice: res.data.FlightResponse.FpSearch_AirLowFaresRS.SegmentReference.RefDetails,
					farePrice: codeFlights,
					response: res
				})

				//match id of flightData.OriginDestinationOptions.OutBoundOptions.OutBoundOption[].Segmentid ...
				// ... with firstArrayUnsort.OutBoundOptionId
				//how? first must path to each ID.
				//then loop through both.
				//if statement - if two codes match, link them together.

			})

	};

//runs first
//runs again after every setState
	render() {

		if (!this.state.flightData) {
			return (
				<div>
					Loading...
				</div>)
		}

		return (

			<div>
				<h1>Currency: {this.state.flightData.Currency.CurrencyCode}</h1>
				<h1>Banner: {this.state.flightData.Banner}</h1>
				<h1>Codes: {this.state.codeFlights}</h1>
			</div>

		)
	}

}

//NEEDED
//getting internal arrays from firstArrayUnsort
//

export default Stuff;