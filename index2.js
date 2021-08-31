const {nextISSTimesForMyLocation}=require('./iss_promised')

const printPassTimes = (passTimes)=>{
  for (const passTime of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(passTime.risetime);
    const time = passTime.duration;
    console.log(`Next pass at ${date} for ${time} seconds!`);
  }
    
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })