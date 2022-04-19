import '../../public/Calendar.scss';
import {useDispatch, useSelector} from "react-redux";
import {useContext} from "react";
import {CalendarContext} from "../../AppContext";
import GlobalHelper from "../../Helpers/GlobalHelper";

const CalendarUser = ({user}) => {
    const dispatch = useDispatch();

    const { calendar } = useSelector(state => {
        return {
            calendar: state.calendar,
        };
    });

    GlobalHelper.date = new Date(calendar.activeDate);

    const { selectedSlots } = calendar;

    const {setSlotSectionStyles} = useContext(CalendarContext);

    const { availability } = user;

    const weekdaysAvailable = availability?.weekdaysAvailable?.indexOf(GlobalHelper.getWeekdayFromDate().toLowerCase()) !== -1 ? availability?.weekdaysAvailable : [];

    const hoursData = weekdaysAvailable?.length ? availability.working_time_diff.hoursData : [];

    return (
        <div className="calendar-agency-item">
            <div className="calendar-agency-item-top">
                <div className="calendar-agency-item-content">
                    <div className="agency-image">
                        <img src={user.image} alt="user" />
                    </div>
                </div>

                <div className="agency-info">
                    {user.bio}
                </div>

                <p style={{marginBottom: "10px"}}><strong>{user.name}</strong></p>
            </div>

            <div className="calendar-available-block">
                <div className="calendar-available-slots">
                    {hoursData.length ? hoursData.map((time, key) => {
                        return (
                            <div key={key} className={"available-slot " + (selectedSlots?.[user.id] === time ? 'active' : '')}
                                 onClick={e => dispatch({type: "update-selected-slots", payload: {userId: user.id, slot: time}}) && setSlotSectionStyles({})}>
                                <a style={{cursor: "pointer"}}
                                   className="text-bookingdarker hover:bg-brand hover:text-brandcontrast dark:hover:bg-darkmodebrand dark:hover:text-darkmodebrandcontrast mb-2 block rounded-sm border bg-white py-4 font-medium hover:text-white dark:border-transparent dark:bg-gray-600 dark:text-neutral-200 dark:hover:border-black border-brand"
                                   data-testid="time">{time}</a>
                            </div>
                        );
                    }) : (
                        <div>
                            <small><i>no available slots</i></small>
                            <hr />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CalendarUser;