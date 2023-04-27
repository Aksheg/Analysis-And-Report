const { getTrips, getDriver, getVehicle } = require("api");

/**
 * This function should return the data for drivers in the specified format
 *
 * Question 4
 *
 * @returns {any} Driver report data
 */
async function driverReport() {
  const trips = await getTrips();
  const drivers = trips.map(trip => trip.driverID);
  const uniqueDrivers = [...new Set(drivers)];
  uniqueDrivers;
  const driverReport = [];

  for (const driver of uniqueDrivers) {
    const driverTrips = trips.filter(trip => trip.driverID === driver);
    const driverDetails = await getDriver(driver);
    const { name, email, phone, noOfTrips, noOfVehicles } = driverDetails;

    driverReport.push({
      driverID: driver,
      fullName: name,
      phone,
      email,
      noOfTrips: trips,
    });

console.log(driverDetails);

  }

  return driverReport;
  
}

driverReport()


module.exports = driverReport;





























// async function driverReport() {
//   // Your code goes here
//   const trips = await getTrips();
//   const drivers = trips.map(trip => trip.driverID);
//   const uniqueDrivers = [...new Set(drivers)];
//   uniqueDrivers;
//   // const details = []
//   const driverReport = uniqueDrivers.map(driver => {
//     const driverTrips = trips.filter(trip => trip.driverID === driver);
//     return {
//       driverID: driver
//     };
//   }
//   );

//   return driverReport;
// }

// driverReport() 

// module.exports = driverReport;





























    //  driverID: driver,
    //   name,
    //   email,
    //   noOfTrips: driverTrips.length