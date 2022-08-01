let HOURS_IN_DAY = 24;

function calculateHoursOnMoon(days) {
    let HOURS_IN_DAY = 29.5;
    return days * HOURS_IN_DAY;
}

function calculateHoursOnEarth(days) {
    return days * HOURS_IN_DAY;
}

//#region Task
function crashMeteorite() {
    HOURS_IN_DAY = 22;
}
//#endregion Task

export const calculateHours = {onEarth: calculateHoursOnEarth, onMoon: calculateHoursOnMoon};
export default crashMeteorite;
