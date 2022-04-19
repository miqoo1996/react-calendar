import {useContext, useLayoutEffect} from "react";
import axios from "axios";
import '../../public/Agencies.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppContext} from "../../AppContext";
import GlobalHelper from "../../Helpers/GlobalHelper";
import Team from "./Team";

// TODO should be taken from request params
const company_id = 2;

const Agencies = () => {
    const dispatch = useDispatch();

    const { teams, calendar } = useSelector(state => {
        return {
            calendar: state.calendar,
            company: state.company,
            teams: state.company.teams,
        };
    });

    const { apiUrl } = useContext(AppContext);

    useLayoutEffect(() => {
        const activeDate = GlobalHelper.getUTCDate(calendar.activeDate).getFullYear() + '-' +
            ('00' + (GlobalHelper.getUTCDate(calendar.activeDate).getMonth()+1)).slice(-2) + '-' +
            ('00' + GlobalHelper.getUTCDate(calendar.activeDate).getDate()).slice(-2);

        axios.get(`${apiUrl}/company/find?id=${company_id}&timezone=${calendar.timeZoneName}&activeDate=${activeDate}`).then((response) => {
            dispatch({type: "update-company", payload: response.data});
        });
    }, []);

    return (
        <div className="agency-teams" style={{ marginLeft: "6%" }}>
            {teams.map((team, key) => <Team key={key} {...team} />)}
        </div>
    );
};

export default Agencies;