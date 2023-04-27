const { getTrips, getDriver, getVehicle } = require("api");
//console.log(trips);

/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */

async function analysis() {

  const getTotalAmount = (arr) => {
    let billedTotal = arr
      .map((element) => {
        if (typeof element.billedAmount === "string") {
          return convertStringToNumber(element.billedAmount);
        } else {
          return element.billedAmount;
        }
      })

      .reduce((a, b) => a + b)
      .toFixed(2);

    return billedTotal;
  };
  const convertStringToNumber = (string) => {
    let newString = string.replace(",", "");
    return parseFloat(newString);
  };
 
  const trips = await getTrips();
  trips;

  let cashTrips = trips.filter((trip) => trip.isCash === true);
  let noOfCashTrips = cashTrips.length;
 

  let nonCashTrips = trips.filter((trip) => trip.isCash === false);
  let noOfNonCashTrips = nonCashTrips.length;
 

  let billedTotal = getTotalAmount(trips);
  billedTotal;

  let cashBilledTotal = getTotalAmount(cashTrips);
  cashBilledTotal;

  let nonCashBilledTotal = getTotalAmount(nonCashTrips);
  nonCashBilledTotal;

  let driversObj = {};

  for (const trip of trips) {
    if (!driversObj[trip.driverID]) {
      driversObj[trip.driverID] = 1;
    } else {
      driversObj[trip.driverID]++;
    }
  }

 driversObj;

  let driversIdArr = Object.keys(driversObj);


  let driverDetailsPromise = driversIdArr.map((driversId) =>
    getDriver(driversId)
  );

  let driverDetails = await Promise.allSettled(driverDetailsPromise);


  let fulfilledDriverDetails = driverDetails.filter(
    (driverDetail) =>
      driverDetail.status === "fulfilled" &&
      driverDetail.value.vehicleID.length >= 2
  );


  noOfDriversWithMoreThanOneVehicle = fulfilledDriverDetails.length;



  let driversTrip = Object.values(driversObj);
  driversTrip;
  let maxTrip = Math.max(...driversTrip);
 
  let driverIdWithTheMostTrip;
  for (const key in driversObj) {
    if (driversObj[key] === maxTrip) {
      driverIdWithTheMostTrip = key;
      break;
    }
  }

  let driverWithTheMostTrip = await getDriver(driverIdWithTheMostTrip);
  driverWithTheMostTrip;

  let mostTripsByDriver = trips.filter(
    (trip) => trip.driverID === driverIdWithTheMostTrip
  );

  let totalAmountEarnedFromTrips = getTotalAmount(mostTripsByDriver);
 

  let contain = driversIdArr.map((driverId) => {
    let filteredTrips = trips.filter((trip) => trip.driverID === driverId);
    filteredTrips;
  
    return {
      driverId,
      totalBilledAmount: +getTotalAmount(filteredTrips),
      noOfTrips: filteredTrips.length,
    };
  });


  let highestEarningDriverDetails = contain.sort(
    (a, b) => b.totalBilledAmount - a.totalBilledAmount
  )[0];


  let highestEarningDriver = await getDriver(highestEarningDriverDetails.driverId);



  let result = {
    noOfCashTrips: noOfCashTrips,
    noOfNonCashTrips: noOfNonCashTrips,
    billedTotal: +billedTotal,
    cashBilledTotal: +cashBilledTotal,
    nonCashBilledTotal: +nonCashBilledTotal,
    noOfDriversWithMoreThanOneVehicle: noOfDriversWithMoreThanOneVehicle,
    mostTripsByDriver: {
      name: driverWithTheMostTrip.name,
      email: driverWithTheMostTrip.email,
      phone: driverWithTheMostTrip.phone,
      noOfTrips: maxTrip,
      totalAmountEarned: +totalAmountEarnedFromTrips,
    },
    highestEarningDriver: {
      name: highestEarningDriver.name,
      email: highestEarningDriver.email,
      phone: highestEarningDriver.phone,
      noOfTrips: highestEarningDriverDetails.noOfTrips,
      totalAmountEarned: highestEarningDriverDetails.totalBilledAmount,
    },
  };

  console.log(result);
  return result;
}

analysis();

module.exports = analysis;