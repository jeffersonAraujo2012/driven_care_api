export function generateBasicSchedule() {
  const DAY_IN_MILISECONDS = 86400000;
  const HOUR_IN_MILISECONDS = 3600000;
  const basicSchedules = [];

  //Generate current date
  const date = new Date();

  for (let i = 0; i < 30; i++) {
    //Set initial hour to 08:00:00
    date.setHours(8);
    date.setMinutes(0);
    date.setSeconds(0);

    //Check what weekday is today.
    let finalHour;
    const weekday = date.getDay();
    if (weekday >= 1 && weekday <= 5) {
      finalHour = 17;
    } else if (weekday === 6) {
      finalHour = 12;
    } else {
      //sunday -- go to next day
      date.setTime(date.valueOf() + DAY_IN_MILISECONDS);
      continue;
    }

    while (date.getHours() < finalHour) {
      //If the time is in the break, skip to the next period
      if (date.getHours() === 12) {
        date.setTime(date.valueOf() + HOUR_IN_MILISECONDS / 2);
        continue;
      }

      //For every 30 minutes, a timestamp is generated and added to the vector
      basicSchedules.push({
        date: date.toLocaleDateString(),
        start: date.toLocaleTimeString(),
        end: new Date(
          date.valueOf() + HOUR_IN_MILISECONDS / 2
        ).toLocaleTimeString(),
      });
      date.setTime(date.valueOf() + HOUR_IN_MILISECONDS / 2);
    }

    date.setTime(date.valueOf() + DAY_IN_MILISECONDS);
  }

  return basicSchedules;
}

export default {
  generateBasicSchedule,
};
