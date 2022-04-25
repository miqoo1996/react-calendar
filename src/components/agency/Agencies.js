import {useContext, useLayoutEffect} from "react";
import axios from "axios";
import '../../public/Agencies.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppContext} from "../../AppContext";
import GlobalHelper from "../../Helpers/GlobalHelper";
import Team from "./Team";

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
        const activeDate = GlobalHelper.getUTCDateTimeString();

        axios.get(`${apiUrl}/company?timezone=${calendar.timeZoneName}&activeDate=${activeDate}`).then((response) => {
            dispatch({type: "update-company", payload: response.data});
        });
    }, []);

    return (
        <div className="agency-teams row">
            {teams.map((team, key) => <Team key={key} {...team} />)}
        </div>
    );
};

export default Agencies;