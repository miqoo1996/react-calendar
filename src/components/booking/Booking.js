import {useParams} from "react-router";
import Calendar from "./Calendar";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useLayoutEffect} from "react";
import axios from "axios";
import {AppContext} from "../../AppContext";
import GlobalHelper from "../../Helpers/GlobalHelper";

const Booking = () => {
    const { apiUrl } = useContext(AppContext);

    const dispatch = useDispatch();

    const { selectedUsersData, calendar} = useSelector(state => {
        return {
            calendar: state.calendar,
            selectedUsersData: state.agencies?.selectedUsersData || [],
        };
    });

    let { ids } = useParams();

    ids = ids.split(',');

    const updateSelectedAgenciesDetails = () => {
        const activeDate = GlobalHelper.getUTCDate(calendar.activeDate).getFullYear() + '-' +
            ('00' + (GlobalHelper.getUTCDate(calendar.activeDate).getMonth()+1)).slice(-2) + '-' +
            ('00' + GlobalHelper.getUTCDate(calendar.activeDate).getDate()).slice(-2);

        axios.get(`${apiUrl}/agencies?ids=${ids.join(',')}&timezone=${calendar.timeZoneName}&activeDate=${activeDate}`).then((response) => {
            const {users, event, pagination} = response.data;

            dispatch({type: "update-items", payload: {event, selectedUsersData: users, pagination, selectedAgencies: ids}});
        });
    };

    useLayoutEffect(() => {
        updateSelectedAgenciesDetails();
    }, [calendar.activeDate]);

    return (
        <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="top-50 booking-calendar">
                <Calendar selectedAgencies={selectedUsersData} />
            </div>
        </div>
    );
}

export default Booking;