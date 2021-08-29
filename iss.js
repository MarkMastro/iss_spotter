const request = require('request');


// const fetchMyIP = (callback) =>{
//   request('https://api.ipify.org?format=json',(error,response,body)=>{
//     if (error) return  callback(error, null);
      
//     // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
//     const ip = JSON.parse(body).ip;
//     callback(null,ip);
//   // use request to fetch IP address from JSON API
//   });
// };

//Waterfall callbacks each function 
const nextISSTimesForMyLocation = (callback) =>{
 
//call fetchCoordsbyIP
  fetchCoordsByIP((error, loc) => {
    if (error) {
      return callback(error, null);
    }
    //while still in the callback thats passed to fetchCoords, call fetchISSFlyoverTimes
    fetchISSFlyOverTimes(loc, (error, nextPasses) => {
      if (error) {
        return callback(error, null);
      }
      //call the callback thats passed from nextISSTimes from index.js
      //callback gets called within fetchISS..
      callback(null, nextPasses);
    });
  });
};
const fetchCoordsByIP = (callback)=>{
  request('https://freegeoip.app/json/',(error,response, body)=>{
    if (error) {
      callback(error,null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const {latitude, longitude} = JSON.parse(body);
    callback(null,{latitude,longitude});
  });
};

const fetchISSFlyOverTimes = (coords, callback)=>{
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,(error,response,body)=>{

    if (error) {
      callback(error,null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(error,JSON.parse(body).response);
  });
};
module.exports = { nextISSTimesForMyLocation };