import {useParams} from "react-router";
import Calendar from "./Calendar";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useLayoutEffect} from "react";
import axios from "axios";
import {AppContext} from "../../AppContext";

const Booking = () => {
    const { apiUrl } = useContext(AppContext);

    const dispatch = useDispatch();

    const { agencies, selectedAgencies, calendar} = useSelector(state => {
        return {
            calendar: state.calendar,
            agencies: state.agencies?.items || [],
            selectedAgencies: state.agencies?.selectedAgencies || [],
        };
    });

    let { ids } = useParams();

    ids = ids.split(',');

    useLayoutEffect(() => {
        if (!agencies.length) {
            axios.get(`${apiUrl}/agencies?ids=${ids.join(',')}&timezone=${calendar.timeZoneName}`).then((response) => {
                const {users, event, pagination} = response.data;

                dispatch({type: "update-items", payload: {items: users, event, pagination, selectedAgencies: ids}});
            });
        } else {
            dispatch({type: "update-items", payload: {items: agencies, selectedAgencies: ids}});
        }
    }, [])

    return (
        <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="top-50 booking-calendar">
                <Calendar selectedAgencies={agencies.filter(u => selectedAgencies.indexOf(u.id.toString()) !== -1)} />
            </div>
        </div>
    );
}

export default Booking;