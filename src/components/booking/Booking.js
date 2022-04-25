import {useParams} from "react-router";
import Calendar from "./Calendar";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useLayoutEffect} from "react";
import axios from "axios";
import {AppContext} from "../../AppContext";
import GlobalHelper from "../../Helpers/GlobalHelper";
import {useSearchParams} from "react-router-dom";

const Booking = () => {
    const { apiUrl } = useContext(AppContext);

    const dispatch = useDispatch();

    const { selectedUsers, calendar} = useSelector(state => {
        return {
            calendar: state.calendar,
            selectedUsers: state.agencies?.selectedUsers || [],
        };
    });

    let { ids, eventId } = useParams();

    ids = ids.split(',');

    const [searchParams, setSearchParams] = useSearchParams();

    const updateSelectedUsersDetails = () => {
        const activeDate = GlobalHelper.getUTCDateTimeString(searchParams.get('date'));

        axios.get(`${apiUrl}/user?ids=${ids.join(',')}&eventId=${eventId}&timezone=${calendar.timeZoneName}&activeDate=${activeDate}`).then((response) => {
            const {users, event, pagination} = response.data;

            dispatch({type: "update-items", payload: {event, pagination, selectedUsers: users}});
        });
    };

    useLayoutEffect(() => {
        updateSelectedUsersDetails();
    }, [calendar.activeDate]);

    return (
        <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="top-50 booking-calendar">
                <Calendar selectedUsers={selectedUsers} />
            </div>
        </div>
    );
}

export default Booking;