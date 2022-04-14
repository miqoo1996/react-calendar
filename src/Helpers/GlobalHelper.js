const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const weekDayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
const shortWeekDayNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

const GlobalHelper = {
    date: new Date(),

    monthNames,
    weekDayNames,
    shortWeekDayNames,

    changeDay: (number = 1) => {
        return GlobalHelper.date = new Date(GlobalHelper.date.setDate(number));
    },

    changeMonth: (number = 1) => {
        const now = new Date();

        const newDate = new Date(GlobalHelper.date.setMonth(GlobalHelper.date.getMonth() + number));

        if (newDate.getMonth() <= now.getMonth()) {
            GlobalHelper.date = now;
        } else {
            GlobalHelper.date = newDate;
            GlobalHelper.changeDay(1);
        }

        return GlobalHelper.date;
    },

    isCurrentMonthActive: () => {
        const now = new Date();

        return GlobalHelper.date.getMonth() === now.getMonth();
    },

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

    getMonthFromDate: (date) => {
        date = date || GlobalHelper.date;
        return date.toLocaleString('default', { month: 'long'}); // eg. April
    },

    getWeekdayFromDate: (date) => {
        date = date || GlobalHelper.date;
        return date.toLocaleString('default', { weekday:'long'}); // eg. Saturday
    },

    getDayFromDate: (date) => {
        date = date || GlobalHelper.date;
        return parseInt(date.toLocaleString('default', {day:'numeric'})); // eg. 11
    },

    getYearFromDate: (date) => {
        date = date || GlobalHelper.date;
        return date.toLocaleString('default', {year:'numeric'}); // eg. 2022
    },

    getFirsEmptyDaysCount: (date) => {
        date = date || GlobalHelper.date;
        return weekDayNames.indexOf(GlobalHelper.getMonthDaysData(date)[0].name);
    },

    getFirstDayOfMonth: () => {
        return GlobalHelper.getMonthDaysData(GlobalHelper.date)[0].day;
    },

    getLastDayOfMonth: () => {
        const days = GlobalHelper.getMonthDaysData(GlobalHelper.date);

        return days[days.length - 1].day;
    },

    getShortDate: () => {
        return <span
            className="w-1/2 dark:text-white"><strong
            className="text-bookingdarker dark:text-white">{monthNames[GlobalHelper.date.getMonth()]}</strong> <span
            className="text-bookinglight">{GlobalHelper.date.getFullYear()}</span></span>
    },

    getCalendarWeekText: () => {
        return <div className="mb-4 text-left text-lg font-light text-gray-600"><span
            className="text-bookingdarker w-1/2 dark:text-white"><strong>{GlobalHelper.getWeekdayFromDate()}</strong><span
            className="text-bookinglight">, {GlobalHelper.getDayFromDate()} {monthNames[GlobalHelper.date.getMonth()]}</span></span></div>;
    },

    getMonthDaysData: () => {
        return  GlobalHelper.getDaysInMonth(GlobalHelper.date.getMonth(), GlobalHelper.date.getFullYear()).map(date => {
            return {
                day: GlobalHelper.getDayFromDate(date),
                name: GlobalHelper.getWeekdayFromDate(date),
            };
        });
    },
};

export default GlobalHelper;