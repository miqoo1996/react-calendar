import {useContext, useLayoutEffect} from "react";
import axios from "axios";
import '../../public/Agencies.scss';
import Agency from './Agency';
import AgencyBottom from './AgencyBottom';
import {connect} from "react-redux";
import {AppContext} from "../../AppContext";

const Agencies = ({dispatch, agencies}) => {
    const { apiUrl } = useContext(AppContext);

    useLayoutEffect(() => {
        // TODO should come from API.
         dispatch({type: "update-items", payload: {items: [
                     {
                         id: 1,
                         name: "Jilian Erics, MD",
                         email: 'eric@outbound.consulting',
                         description: "Licensed therapist with 10 years of experience",
                         image: "https://cxl.com/wp-content/uploads/2016/03/aurora_bedford.jpg",
                     },
                     {
                         id: 2,
                         name: "Lawrence Hunter, MD",
                         email: 'eric@outbound.consulting',
                         description: "Cardiologist from California focusing on fitness and performance",
                         image: "https://cxl.com/wp-content/uploads/2016/03/craig_kistler.jpg",
                     },
                     {
                         id: 3,
                         name: "Tam Warner, MD",
                         email: 'eric@outbound.consulting',
                         description: "Dermatologist from United Kingdom. Book me for a telemedicine session",
                         image: "https://cxl.com/wp-content/uploads/2016/03/hannah_alvarez.jpg",
                     },
                     {
                         id: 4,
                         name: "Jilian Erics, MD",
                         email: 'eric@outbound.consulting',
                         description: "Licensed therapist with 10 years of experience",
                         image: "https://cxl.com/wp-content/uploads/2016/03/aurora_bedford.jpg",
                     },
                     {
                         id: 5,
                         name: "Lawrence Hunter, MD",
                         email: 'eric@outbound.consulting',
                         description: "Cardiologist from California focusing on fitness and performance",
                         image: "https://cxl.com/wp-content/uploads/2016/03/craig_kistler.jpg",
                     },
                     {
                         id: 6,
                         name: "Tam Warner, MD",
                         email: 'eric@outbound.consulting',
                         description: "Dermatologist from United Kingdom. Book me for a telemedicine session",
                         image: "https://cxl.com/wp-content/uploads/2016/03/hannah_alvarez.jpg",
                     },
                     {
                         id: 7,
                         name: "Jilian Erics, MD",
                         email: 'eric@outbound.consulting',
                         description: "Licensed therapist with 10 years of experience",
                         image: "https://cxl.com/wp-content/uploads/2016/03/aurora_bedford.jpg",
                     },
                     {
                         id: 8,
                         name: "Lawrence Hunter, MD",
                         email: 'eric@outbound.consulting',
                         description: "Cardiologist from California focusing on fitness and performance",
                         image: "https://cxl.com/wp-content/uploads/2016/03/craig_kistler.jpg",
                     },
                     {
                         id: 9,
                         name: "Tam Warner, MD",
                         email: 'eric@outbound.consulting',
                         description: "Dermatologist from United Kingdom. Book me for a telemedicine session",
                         image: "https://cxl.com/wp-content/uploads/2016/03/hannah_alvarez.jpg",
                     },
                     {
                         id: 10,
                         name: "Jilian Erics, MD",
                         email: 'eric@outbound.consulting',
                         description: "Licensed therapist with 10 years of experience",
                         image: "https://cxl.com/wp-content/uploads/2016/03/aurora_bedford.jpg",
                     },
                     {
                         id: 11,
                         name: "Lawrence Hunter, MD",
                         email: 'eric@outbound.consulting',
                         description: "Cardiologist from California focusing on fitness and performance",
                         image: "https://cxl.com/wp-content/uploads/2016/03/craig_kistler.jpg",
                     },
                     {
                         id: 12,
                         name: "Tam Warner, MD",
                         email: 'eric@outbound.consulting',
                         description: "Dermatologist from United Kingdom. Book me for a telemedicine session",
                         image: "https://cxl.com/wp-content/uploads/2016/03/hannah_alvarez.jpg",
                     },
                 ]}});
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
                            description={item.description}
                            image={item.image}
                        />
                    )
                })}

                <AgencyBottom />
            </section>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        agencies: state.agencies,
    };
}

export default connect(mapStateToProps)(Agencies);