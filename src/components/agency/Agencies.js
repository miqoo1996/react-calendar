import {useContext, useLayoutEffect} from "react";
import axios from "axios";
import '../../public/Agencies.scss';
import Agency from './Agency';
import AgencyBottom from './AgencyBottom';
import {useDispatch, useSelector} from "react-redux";
import {AppContext} from "../../AppContext";

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
        const activeDate = calendar.activeDate.getFullYear() + '-' +
            ('00' + (calendar.activeDate.getMonth()+1)).slice(-2) + '-' +
            ('00' + calendar.activeDate.getDate()).slice(-2);

        axios.get(`${apiUrl}/agencies?timezone=${calendar.timeZoneName}&activeDate=${activeDate}`).then((response) => {
            const {users, event, pagination} = response.data;

            dispatch({type: "update-items", payload: {items: users, event, pagination}});
        });
    }, []);

    return (
        <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="page-details" style={{ marginLeft: "6%" }}>
                <h1 className="page-title">Better Help Therapy</h1>
                <p className="info-text">Book a time with one of our licensed professional therapists online today!</p>
            </div>

            <section className="agencies top-50">
                {agencies?.items?.map((item, key) => {
                    return (
                        <Agency
                            key={key}
                            id={item.id}
                            name={item.name}
                            description={item.bio}
                            image={item.image}
                        />
                    )
                })}

                <AgencyBottom />
            </section>
        </div>
    );
};

export default Agencies;