import {useParams} from "react-router";
import Calendar from "./Calendar";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useLayoutEffect} from "react";
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

    const updateSelectedAgenciesDetails = () => {
        const activeDate = calendar.activeDate.getFullYear() + '-' +
            ('00' + (calendar.activeDate.getMonth()+1)).slice(-2) + '-' +
            ('00' + calendar.activeDate.getDate()).slice(-2);

        axios.get(`${apiUrl}/agencies?ids=${ids.join(',')}&timezone=${calendar.timeZoneName}&activeDate=${activeDate}`).then((response) => {
            const {users, event, pagination} = response.data;

            dispatch({type: "update-items", payload: {items: users, event, pagination, selectedAgencies: ids}});
        });
    };

    useLayoutEffect(() => {
        updateSelectedAgenciesDetails();

        console.log("yyyyy");
    }, [calendar.activeDate]);

    return (
        <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="top-50 booking-calendar">
                <Calendar selectedAgencies={agencies.filter(u => selectedAgencies.indexOf(u.id.toString()) !== -1)} />
            </div>
        </div>
    );
}

export default Booking;