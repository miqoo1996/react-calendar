import {useParams} from "react-router";
import {Link} from "react-router-dom";
import Calendar from "./Calendar";
import {useCallback, useLayoutEffect, useState} from "react";

const Booking = () => {
    let { ids } = useParams();
    ids = ids.split(',');

    const [items, setItems] = useState([]);

    useCallback(() => {
        // TODO call to API for fetching agencies
        setItems([]);
    }, []);

    // console.log(ids, items);

    return (
        <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="page-details">
                <h1 className="page-title">Book a call</h1>
                <p className="info-text">Book a call with selected agencies</p>
            </div>

            <div className="top-50 booking-calendar">
                <Calendar users={items} />
            </div>

            <p>
                <Link to="/" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Back to agencies page
                </Link>
            </p>
        </div>
    );
}

export default Booking;