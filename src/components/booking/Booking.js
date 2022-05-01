import {useParams} from "react-router";
import Calendar from "./Calendar";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useLayoutEffect} from "react";
import axios from "axios";
import {AppContext} from "../../AppContext";
import GlobalHelper from "../../Helpers/GlobalHelper";
import {useSearchParams} from "react-router-dom";
import moment from "moment/moment";

const Booking = () => {
    const questionnairePassed = !! localStorage.getItem('questionnaire');

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
        let activeDate = searchParams.get('date') ? GlobalHelper.getUTCDateTimeString(searchParams.get('date')) : GlobalHelper.getUTCDateTimeString();

        const now = moment(new Date(), 'YYYY-MM-DD');

        if (moment(activeDate, 'YYYY-MM-DD').isAfter(now)) {
            activeDate = moment(activeDate, 'YYYY-MM-DD');
        }

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
                {questionnairePassed ? <Calendar selectedUsers={selectedUsers} /> : (
                    <div className='text-center'>
                        <p className='page-title'>Please pass the survey before booking a call!</p>
                        <p className="info-text">You need to ask the owner of the website for the URL of the "Survey" in case you don't have it.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Booking;