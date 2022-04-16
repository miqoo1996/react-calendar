import {useContext, useLayoutEffect} from "react";
import axios from "axios";
import '../../public/Agencies.scss';
import Agency from './Agency';
import AgencyBottom from './AgencyBottom';
import {useDispatch, useSelector} from "react-redux";
import {AppContext} from "../../AppContext";

const Agencies = () => {
    const dispatch = useDispatch();

    const { agencies } = useSelector(state => {
        return {
            agencies: state.agencies,
        };
    });

    const { apiUrl } = useContext(AppContext);

    useLayoutEffect(() => {
        axios.get(`${apiUrl}/agencies`).then((response) => {
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