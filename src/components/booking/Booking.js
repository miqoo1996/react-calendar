import {useParams} from "react-router";
import {Link} from "react-router-dom";
import Calendar from "./Calendar";
import {useState} from "react";

const Booking = () => {
    let { ids } = useParams();
    ids = ids.split(',');

    const [items, setItems] = useState([[1],[2],[3]]);

    return (
        <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="top-50 booking-calendar">
                <Calendar users={items} />
            </div>
        </div>
    );
}

export default Booking;