import CalendarLeftSide from "./CalendarLeftSide";
import CalendarContent from "./CalendarContent";
import CalendarRightSide from "./CalendarRightSide";
import {CalendarReducer} from "../../reducers/CalendarReducer";
import GlobalHelper from "../../Helpers/GlobalHelper";
import {useReducer} from "react";
import {CalendarContext} from "../../AppContext";

const Calendar = ({users}) => {
    const [context, dispatch] = useReducer(CalendarReducer, {activeDate: GlobalHelper.getDayFromDate()})

    return (
        <CalendarContext.Provider value={{context, dispatch}}>
            <section className="calendar-wrapper">
                <div className="bg-white dark:bg-gray-800 sm:dark:border-gray-600 border-bookinglightest rounded-sm md:border max-w-5xl">
                    <div className="px-4 sm:flex sm:p-4 sm:py-5">
                        <CalendarLeftSide users={users} />
                        <CalendarContent users={users} />
                        <CalendarRightSide users={users} />
                    </div>
                </div>
            </section>
        </CalendarContext.Provider>
    );
}

export default Calendar;