const request=require('request-promise-native')

const fetchMyIp=()=>{
  return request('https://api.ipify.org?format=json');
}
const fetchCoords=()=>{
  return request('https://freegeoip.app/json/')
}

const fetchISSFlyOverTimes=(body)=>{
 const {latitude,longitude}=JSON.parse(body)  
 return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
 
}
const nextISSTimesForMyLocation = function() {
  return fetchMyIp()
    .then(fetchCoords)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};
module.exports={nextISSTimesForMyLocation};