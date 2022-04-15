import '../../public/Calendar.scss';
import GlobalHelper from "../../Helpers/GlobalHelper";
import {connect} from "react-redux";
import {CalendarContext} from "../../AppContext";
import {useContext} from "react";
import CalendarAgency from "./CalendarAgency";

const CalendarRightSide = ({calendar}) => {
    const {selectedAgencies} = useContext(CalendarContext);

    GlobalHelper.date = calendar.activeDate;

    return (
        <div className="mt-8 flex flex-col text-center sm:mt-0 sm:w-1/3 sm:pl-4 md:-mb-5">
            {GlobalHelper.getCalendarWeekText()}

            <div className="flex-grow overflow-y-auto md:h-[364px]">
                {selectedAgencies?.map((user, key) => {
                    return (
                        <CalendarAgency key={key} user={user} />
                    );
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        calendar: state.calendar,
    };
}

export default connect(mapStateToProps)(CalendarRightSide);