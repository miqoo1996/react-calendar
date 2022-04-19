import '../../public/Calendar.scss';
import GlobalHelper from "../../Helpers/GlobalHelper";
import {CalendarContext} from "../../AppContext";
import {useContext} from "react";
import CalendarUser from "./CalendarUser";

const CalendarRightSide = () => {
    const {calendar, selectedUsers, slotSectionStyles} = useContext(CalendarContext);

    GlobalHelper.date = calendar.activeDate;

    return (
        <div className="mt-8 flex flex-col text-center sm:mt-0 sm:w-1/3 sm:pl-4 md:-mb-5">
            {GlobalHelper.getCalendarWeekText()}

            <div style={slotSectionStyles} className="slots-section flex-grow overflow-y-auto md:h-[364px]">
                {selectedUsers?.map((user, key) => {
                    return (
                        <CalendarUser key={key} user={user} />
                    );
                })}
            </div>
        </div>
    );
}

export default CalendarRightSide;