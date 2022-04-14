export default {
    monthNames: [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ],

    /**
     * Use for Localized time zone.
     *
     * @param {int} month The month number, 0 based
     * @param {int} year The year, not zero based, required to account for leap years
     * @return {Date[]} List with date objects for each day of the month
     */
    getDaysInMonth: (month, year) => {
        let date = new Date(year, month, 1);
        let days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    },
    /**
     * UTC methods instead of the standard methods that return the localized time zone.
     *
     * @param {int} month The month number, 0 based
     * @param {int} year The year, not zero based, required to account for leap years
     * @return {Date[]} List with date objects for each day of the month
     */
    getDaysInMonthUTC: (month, year) => {
        let date = new Date(Date.UTC(year, month, 1));
        let days = [];
        while (date.getUTCMonth() === month) {
            days.push(new Date(date));
            date.setUTCDate(date.getUTCDate() + 1);
        }
        return days;
    },

    getMonthFromDate: (date = new Date()) => {
        return date.toLocaleString('default', { month: 'long'}); // eg. April
    },

    getWeekdayFromDate: (date = new Date()) => {
        return date.toLocaleString('default', { weekday:'long'}); // eg. Saturday
    },

    getDayFromDate: (date = new Date()) => {
        return date.toLocaleString('default', {day:'numeric'}); // eg. 11
    },

    getYearFromDate: (date = new Date()) => {
        return date.toLocaleString('default', {year:'numeric'}); // eg. 2022
    },
};