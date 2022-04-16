import '../../public/Calendar.scss';
import {useDispatch, useSelector} from "react-redux";
import {useContext} from "react";
import {CalendarContext} from "../../AppContext";

const CalendarAgency = ({user}) => {
    const dispatch = useDispatch();

    const { calendar } = useSelector(state => {
        return {
            calendar: state.calendar,
        };
    });

    const { selectedSlots } = calendar;

    const {setSlotSectionStyles} = useContext(CalendarContext);

    return (
        <div className="calendar-agency-item">
            <div className="calendar-agency-item-content">
                <div className="agency-image">
                    <img src={user.image} alt="user" />
                </div>
                <p style={{marginBottom: "10px"}}><strong>{user.name}</strong></p>
            </div>

            <div className="calendar-available-slots">
                <div className={"available-slot " + (selectedSlots?.[user.id] === "7:00pm" ? 'active' : '')}
                     onClick={e => dispatch({type: "update-selected-slots", payload: {userId: user.id, slot: "7:00pm"}}) && setSlotSectionStyles({})}>
                    <a
                        className="text-bookingdarker hover:bg-brand hover:text-brandcontrast dark:hover:bg-darkmodebrand dark:hover:text-darkmodebrandcontrast mb-2 block rounded-sm border bg-white py-4 font-medium hover:text-white dark:border-transparent dark:bg-gray-600 dark:text-neutral-200 dark:hover:border-black border-brand"
                        data-testid="time"
                        href="#">7:00pm</a>
                </div>

                <div className={"available-slot " + (selectedSlots?.[user.id] === "8:00pm" ? 'active' : '')}
                     onClick={e => dispatch({type: "update-selected-slots", payload: {userId: user.id, slot: "8:00pm"}}) && setSlotSectionStyles({})}>
                    <a
                        className="text-bookingdarker hover:bg-brand hover:text-brandcontrast dark:hover:bg-darkmodebrand dark:hover:text-darkmodebrandcontrast mb-2 block rounded-sm border bg-white py-4 font-medium hover:text-white dark:border-transparent dark:bg-gray-600 dark:text-neutral-200 dark:hover:border-black border-brand"
                        data-testid="time"
                        href="#">8:00pm</a>
                </div>
            </div>
        </div>
    );
}

export default CalendarAgency;