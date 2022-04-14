import {useLayoutEffect, useReducer, useState} from "react";
import '../../public/Agencies.scss';
import Agency from './Agency';
import AgencyBottom from './AgencyBottom';
import {AgencyReducer} from '../../reducers/AgencyReducer';

const Agencies = () => {
    const [items, setItems] = useState([]);

    const [context, dispatch] = useReducer(AgencyReducer, {selectedAgencies: []});

    useLayoutEffect(() => {
        // TODO should come from API.
        setItems([
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
        ]);
    }, []);

    return (
        <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="page-details" style={{ marginLeft: "6%" }}>
                <h1 className="page-title">Better Help Therapy</h1>
                <p className="info-text">Book a time with one of our licensed professional therapists online today!</p>
            </div>

            <section className="agencies top-50">
                {items.map((item, key) => {
                    return (
                        <Agency
                            key={key}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            image={item.image}
                            dispatch={dispatch}
                        />
                    )
                })}

                <AgencyBottom context={context} />
            </section>
        </div>
    );
};

export default Agencies;