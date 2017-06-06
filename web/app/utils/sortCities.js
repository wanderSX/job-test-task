export default function sortCities(cityA, cityB) {
	if(cityA.attributes.cityName < cityB.attributes.cityName) {
		return -1;
	}
	if(cityA.attributes.cityName > cityB.attributes.cityName) {
		return 1;
	}

	return 0;
}