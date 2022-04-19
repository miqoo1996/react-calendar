import {useContext, useLayoutEffect} from "react";
import axios from "axios";
import '../../public/Agencies.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppContext} from "../../AppContext";
import GlobalHelper from "../../Helpers/GlobalHelper";
import Team from "./Team";

const Agencies = () => {
    const dispatch = useDispatch();

    const { agencies, calendar } = useSelector(state => {
        return {
            calendar: state.calendar,
            agencies: state.agencies,
        };
    });

    const { apiUrl } = useContext(AppContext);

    useLayoutEffect(() => {
        const activeDate = GlobalHelper.getUTCDate(calendar.activeDate).getFullYear() + '-' +
            ('00' + (GlobalHelper.getUTCDate(calendar.activeDate).getMonth()+1)).slice(-2) + '-' +
            ('00' + GlobalHelper.getUTCDate(calendar.activeDate).getDate()).slice(-2);

        axios.get(`${apiUrl}/agencies?timezone=${calendar.timeZoneName}&activeDate=${activeDate}`).then((response) => {
            const {users, event, pagination} = response.data;

            dispatch({type: "update-items", payload: {items: users, selectedUsers: [], event, pagination}});
        });
    }, []);

    return (
        <div className="agency-teams" style={{ marginLeft: "6%" }}>
            <Team key={0} id={1} title="Better Help Therapy" description="Book a time with one of our licensed professional therapists online today!" users={agencies.items} />
            <Team key={1} id={2} title="Better Help Therapy" description="Book a time with one of our licensed professional therapists online today!" users={agencies.items} />
            <Team key={2} id={3} title="Better Help Therapy" description="Book a time with one of our licensed professional therapists online today!" users={agencies.items} />
            <Team key={3} id={4} title="Better Help Therapy" description="Book a time with one of our licensed professional therapists online today!" users={agencies.items} />
            <Team key={4} id={5} title="Better Help Therapy" description="Book a time with one of our licensed professional therapists online today!" users={agencies.items} />
        </div>
    );
};

export default Agencies;