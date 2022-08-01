//#region Task
let HOURS_IN_DAY = 24;

function calculateHoursOnMoon(days) {
    return days * HOURS_IN_DAY;
}

function calculateHoursOnEarth(days) {
    return days * HOURS_IN_DAY;
}
//#endregion Task

export default {onMoon: calculateHoursOnMoon, onEarth: calculateHoursOnEarth};
