const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const weekDayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
const shortWeekDayNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

const GlobalHelper = {
    monthNames,
    weekDayNames,
    shortWeekDayNames,

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
        return parseInt(date.toLocaleString('default', {day:'numeric'})); // eg. 11
    },

    getYearFromDate: (date = new Date()) => {
        return date.toLocaleString('default', {year:'numeric'}); // eg. 2022
    },

    getFirsEmptyDaysCount: (date = new Date()) => {
        return weekDayNames.indexOf(GlobalHelper.getMonthDaysData(date)[0].name);
    },

    getFirstDayOfMonth: (date = new Date()) => {
        return GlobalHelper.getMonthDaysData(date)[0].day;
    },

    getLastDayOfMonth: (date = new Date()) => {
        return GlobalHelper.getMonthDaysData(date)[GlobalHelper.getMonthDaysData(date).length - 1].day;
    },

    getShortDate: (date = new Date()) => {
        return <span
            className="w-1/2 dark:text-white"><strong
            className="text-bookingdarker dark:text-white">{monthNames[date.getUTCMonth()]}</strong> <span
            className="text-bookinglight">{date.getUTCFullYear()}</span></span>
    },

    getCalendarWeekText: (date = new Date()) => {
        return <div className="mb-4 text-left text-lg font-light text-gray-600"><span
            className="text-bookingdarker w-1/2 dark:text-white"><strong>{GlobalHelper.getWeekdayFromDate()}</strong><span
            className="text-bookinglight">, {GlobalHelper.getDayFromDate()} {monthNames[date.getUTCMonth()]}</span></span></div>;
    },

    getMonthDaysData: (date = new Date()) => {
        return  GlobalHelper.getDaysInMonthUTC(date.getUTCMonth(), date.getUTCFullYear()).map(date => {
            return {
                day: GlobalHelper.getDayFromDate(date),
                name: GlobalHelper.getWeekdayFromDate(date),
            };
        });
    },
};

export default GlobalHelper;