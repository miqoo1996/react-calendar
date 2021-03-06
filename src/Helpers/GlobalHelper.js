import moment from "moment";
import styled from 'styled-components';

const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const weekDayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
const shortWeekDayNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

const GlobalHelper = {
    date: new Date(),

    monthNames,
    weekDayNames,
    shortWeekDayNames,

    getUTCDate: (date) => {
        date = date || GlobalHelper.date;

        return moment(date).toDate();
    },

    getUTCDateTimeString: (date) => {
        date = date || GlobalHelper.date;

        if (date) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }

        return moment().format("YYYY-MM-DD HH:mm:ss");
    },

    getUTCDateTimeWithoutMinsSecsString: (date) => {
        date = date || GlobalHelper.date;

        if (date) {
            return moment(date).format("YYYY-MM-DD HH:00:00");
        }

        return moment().format("YYYY-MM-DD HH:00:00");
    },

    getUTCDateString: (date) => {
        date = date || GlobalHelper.date;

        if (date) {
            return moment(date).format("YYYY-MM-DD");
        }

        return moment().format("YYYY-MM-DD");
    },

    changeDay: (number = 1) => {
        return GlobalHelper.date = new Date(GlobalHelper.getUTCDate().setDate(number));
    },

    changeMonth: (number = 1, getDate = false) => {
        const now = GlobalHelper.getUTCDate(new Date());

        const newDate = new Date(GlobalHelper.getUTCDate().setMonth(GlobalHelper.getUTCDate().getMonth() + number));

        if (newDate.getMonth() <= now.getMonth()) {
            GlobalHelper.date = now;
        } else {
            GlobalHelper.date = newDate;
            GlobalHelper.changeDay(1);
        }

        return getDate ? GlobalHelper.getUTCDate() : GlobalHelper;
    },

    isCurrentMonthActive: () => {
        const now = new Date();

        return GlobalHelper.getUTCDate().getMonth() === now.getMonth();
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
        return moment(date).format('MMMM'); // eg. April
    },

    getWeekdayFromDate: (date) => {
        date = date || GlobalHelper.date;
        return moment(date).format('dddd'); // eg. Saturday
    },

    getDayFromDate: (date) => {
        date = date || GlobalHelper.date;
        return parseInt(moment(date).format('D')); // eg. 11
    },

    getYearFromDate: (date) => {
        date = date || GlobalHelper.date;
        return moment(date).format('YYYY'); // eg. 2022
    },

    getFirsEmptyDaysCount: (date) => {
        date = date || GlobalHelper.date;
        return weekDayNames.indexOf(GlobalHelper.getMonthDaysData(GlobalHelper.getUTCDate(date))[0].name);
    },

    getFirstDayOfMonth: () => {
        return GlobalHelper.getMonthDaysData(GlobalHelper.getUTCDate())[0].day;
    },

    getLastDayOfMonth: () => {
        const days = GlobalHelper.getMonthDaysData(GlobalHelper.getUTCDate());

        return days[days.length - 1].day;
    },

    getShortDate: () => {
        return <span
            className="w-1/2 dark:text-white"><strong
            className="text-bookingdarker dark:text-white">{GlobalHelper.getWeekdayFromDate()}</strong> <span
            className="text-bookinglight">{GlobalHelper.getYearFromDate()}</span></span>
    },

    getCalendarWeekText: (props = {}, element, element2) => {
        const Wrapper = styled.div`
                          display: flex;
                          width: 100%;
                          align-items: center;
                          justify-content: space-between;
                        `;

        return <div {...props} className="mb-4 text-left text-lg font-light text-gray-600">
            <Wrapper className="text-bookingdarker w-1/2 dark:text-white">
                <div>
                    <strong>{GlobalHelper.getWeekdayFromDate()}</strong>
                    <span className="text-bookinglight">, {GlobalHelper.getDayFromDate()} {GlobalHelper.getMonthFromDate()}</span>
                </div>
                <div>
                    {element2}
                </div>
            </Wrapper>
            {element}
        </div>;
    },

    getCalendarDateTextSimple: (date, props = {}) => {
        return <div {...props} className="mb-4 text-left text-lg font-light text-gray-600">
            <div className="text-bookingdarker w-1/2 dark:text-white">
                <div>
                    <strong>{GlobalHelper.getWeekdayFromDate(date)}</strong>
                    <span style={{whiteSpace: 'nowrap'}} className="text-bookinglight">, {GlobalHelper.getDayFromDate(date)} {GlobalHelper.getMonthFromDate(date)}</span>
                </div>
            </div>
        </div>;
    },

    getMonthDaysData: () => {
        const M = moment(GlobalHelper.date).format('M');
        return GlobalHelper.getDaysInMonth(parseInt(M), GlobalHelper.getYearFromDate()).map(date => {
            return {
                day: GlobalHelper.getDayFromDate(date),
                name: GlobalHelper.getWeekdayFromDate(date),
            };
        });
    },

    objectNextElement: (db, key) => {
        for (let i = 0; i < db.length; i++) {
            if (db[i].key === key) {
                return db[i + 1] && db[i + 1].value;
            }
        }

        return null;
    },
};

export default GlobalHelper;