// iss_promised.js
const request = require('request-promise-native');

const fetchISSFlyOverTimes = (coords) => request(`http://api.open-notify.org/iss-pass.json?lat=${coords[0]}&lon=${coords[1]}`)
.then((data) => JSON.parse(data).response);

const fetchCoordsByIP = (ip) => request(`https://freegeoip.app/json/${ip}`)
.then((data) => [JSON.parse(data).latitude, JSON.parse(data).longitude]);

const fetchMyIP = () => request('https://api.ipify.org?format=json')
.then((data) => JSON.parse(data).ip);


const nextISSTimesForMyLocation = () => {

return fetchMyIP()
  .then((data) => fetchCoordsByIP(data))
  .then((data) => fetchISSFlyOverTimes(data))
}



module.exports = {
  nextISSTimesForMyLocation
}
