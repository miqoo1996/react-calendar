import '../../public/Calendar.scss';
import GlobalHelper from "../../Helpers/GlobalHelper";
import {connect} from "react-redux";
import {CalendarContext} from "../../AppContext";
import {useContext} from "react";

const CalendarRightSide = ({calendar}) => {
    const {users} = useContext(CalendarContext);

    GlobalHelper.date = calendar.activeDate;

    return (
        <div className="mt-8 flex flex-col text-center sm:mt-0 sm:w-1/3 sm:pl-4 md:-mb-5">
            {GlobalHelper.getCalendarWeekText()}

            <div className="flex-grow overflow-y-auto md:h-[364px]">
                {users.map((user, key) => {
                    return (
                        <div key={key} className="calendar-agency-item">
                            <div className="calendar-agency-item-content">
                                <div className="agency-image">
                                    <img src="https://cxl.com/wp-content/uploads/2016/03/aurora_bedford.jpg" alt="user" />
                                </div>
                                <p style={{marginBottom: "10px"}}><strong>Jilian Erics, MD</strong></p>
                            </div>

                            <div style={{ width: "80%", marginTop: '10px', marginBottom: "30px" }}>
                                <div>
                                    <a
                                        className="text-bookingdarker hover:bg-brand hover:text-brandcontrast dark:hover:bg-darkmodebrand dark:hover:text-darkmodebrandcontrast mb-2 block rounded-sm border bg-white py-4 font-medium hover:text-white dark:border-transparent dark:bg-gray-600 dark:text-neutral-200 dark:hover:border-black border-brand"
                                        data-testid="time"
                                        href="#">7:00pm</a>
                                </div>

                                <div>
                                    <a
                                        className="text-bookingdarker hover:bg-brand hover:text-brandcontrast dark:hover:bg-darkmodebrand dark:hover:text-darkmodebrandcontrast mb-2 block rounded-sm border bg-white py-4 font-medium hover:text-white dark:border-transparent dark:bg-gray-600 dark:text-neutral-200 dark:hover:border-black border-brand"
                                        data-testid="time"
                                        href="#">8:00pm</a>
                                </div>
                            </div>
                        </div>
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