import GlobalHelper from "../../Helpers/GlobalHelper";
import CalendarCel from "./CalendarCel";
import {connect} from "react-redux";

const now = new Date();

const currentMonthActiveDay = GlobalHelper.getDayFromDate(now);

const CalendarContent = ({dispatch}) => {
    let [emptyItems, disabledItems, availableItems] = [[], [], []];

    const onChangeDayHandler = (i) => {
        dispatch({type: 'change-active-date', payload: {activeDate: GlobalHelper.changeDay(i)}});
    }

    const [
        activeItem,
        isUnAvailableDay
    ] = [
        <CalendarCel active={1}>{GlobalHelper.getDayFromDate()}</CalendarCel>,
        day => GlobalHelper.isCurrentMonthActive() && day < currentMonthActiveDay
    ];

    for (let i = 0; i < GlobalHelper.getFirsEmptyDaysCount(); i++) {
        emptyItems.push(<CalendarCel key={i+1111} disabled={1} />);
    }

    for (let i = 1; i < GlobalHelper.getDayFromDate(); i++) {
        disabledItems.push(<CalendarCel
            key={i+2222}
            onClick={e => !isUnAvailableDay(i) && onChangeDayHandler(i)}
            disabled={isUnAvailableDay(i)}>{i}</CalendarCel>);
    }

    for (let i = GlobalHelper.getDayFromDate() + 1; i <= GlobalHelper.getLastDayOfMonth(); i++) {
        availableItems.push(<CalendarCel key={i+3333} onClick={e => onChangeDayHandler(i)}>{i}</CalendarCel>);
    }

    return (
        <div className="mt-8 sm:mt-0 sm:min-w-[455px] w-full sm:w-1/2 sm:border-r sm:pl-4 sm:pr-6 sm:dark:border-gray-700 md:w-1/3">
            <div className="mb-4 flex text-xl font-light">
                {GlobalHelper.getShortDate()}
                <div className="w-1/2 text-right dark:text-gray-400">
                    <button
                        onClick={e => !GlobalHelper.isCurrentMonthActive() && dispatch({type: 'change-active-date', payload: {activeDate: GlobalHelper.changeMonth(-1)}})}
                        className="group p-1 ltr:mr-2 rtl:ml-2 text-bookinglighter dark:text-gray-600"
                        data-testid="decrementMonth" disabled={GlobalHelper.isCurrentMonthActive()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true"
                             className="h-5 w-5 group-hover:text-black dark:group-hover:text-white">
                            <path fillRule="evenodd"
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={e => dispatch({type: 'change-active-date', payload: {activeDate: GlobalHelper.changeMonth(1)}})}
                        className="group p-1" data-testid="incrementMonth">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true"
                             className="h-5 w-5 group-hover:text-black dark:group-hover:text-white">
                            <path fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                className="border-bookinglightest grid grid-cols-7 gap-4 border-t border-b text-center dark:border-gray-800 sm:border-0">
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Sun</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Mon</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Tue</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Wed</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Thu</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Fri</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
                {emptyItems}
                {disabledItems}
                {activeItem}
                {availableItems}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
  return {
      calendar: state.calendar,
  };
}

export default connect(mapStateToProps)(CalendarContent);