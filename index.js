// index.js
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (passTimes)=>{
  for (const passTime of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(passTime.risetime);
    const time = passTime.duration;
    console.log(`Next pass at ${date} for ${time} seconds!`);
  }
    
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
  printPassTimes(passTimes);
});


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP((error,coordinates)=>{
//   if (error) {
//     console.log('there has been an error ', error);
//     return;
//   }
//   return coordinates;
// });
// fetchISSFlyOverTimes({coordinates},(error,flybys)=>{
//   if (error) {
//     console.log('There has been an error ', error);
//     return;
//   }
//   console.log('The fly by times are as follows \n',flybys);

// });
