import CalendarLeftSide from "./CalendarLeftSide";
import CalendarContent from "./CalendarContent";
import CalendarRightSide from "./CalendarRightSide";
import {CalendarContext} from "../../AppContext";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {useState} from "react";

const Calendar = ({agencies, selectedAgencies}) => {
    const users = agencies?.items || [];

    const [switchToForm, setSwitchToForm] = useState(false);

    const onSwitchToFormHandler = () => {
        setSwitchToForm(true);
    };

    return (
        <CalendarContext.Provider value={{users, selectedAgencies}}>
            <section className="calendar-wrapper">
                <div className="page-details">
                    <h1 className="page-title">Book a call</h1>
                    <p className="info-text">Book a call with selected agencies</p>
                </div>

                {switchToForm ? (
                    <>
                    </>
                ) : (
                    <>
                        <div className="bg-white dark:bg-gray-800 sm:dark:border-gray-600 border-bookinglightest rounded-sm md:border max-w-5xl">
                            <div className="px-4 sm:flex sm:p-4 sm:py-5">
                                <CalendarLeftSide />
                                <CalendarContent />
                                <CalendarRightSide />
                            </div>
                        </div>

                        <div className="calendar-top-button clearfix">
                            <Link to="/" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                Back to agencies page
                            </Link>

                            <button onClick={e => onSwitchToFormHandler()} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                Submit Form to Book
                            </button>
                        </div>
                    </>
                )}
            </section>
        </CalendarContext.Provider>
    );
}

const mapStateToProps = (state) => {
    return {
        calendar: state.calendar,
        agencies: state.agencies,
    };
}

export default connect(mapStateToProps)(Calendar);