import {useParams} from "react-router";
import Calendar from "./Calendar";
import {connect} from "react-redux";
import {useLayoutEffect} from "react";

// TODO fetch items from API
const data = [
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
];

const Booking = ({dispatch, selectedAgencies}) => {
    let { ids } = useParams();

    ids = ids.split(',');

    useLayoutEffect(() => {
        dispatch({type: "update-items", payload: {items: data, selectedAgencies: ids}});
    }, [])

    return (
        <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="top-50 booking-calendar">
                <Calendar selectedAgencies={data.filter(u => selectedAgencies.indexOf(u.id.toString()) !== -1)} />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        calendar: state.calendar,
        selectedAgencies: state.agencies.selectedAgencies,
    };
}

export default connect(mapStateToProps)(Booking);