import React, {useEffect} from 'react';
import styled from 'styled-components';
import CalendarLeftSide from "./CalendarLeftSide";
import CalendarContent from "./CalendarContent";
import CalendarRightSide from "./CalendarRightSide";
import {AppContextDefaultValue, CalendarContext} from "../../AppContext";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import GlobalHelper from "../../Helpers/GlobalHelper";
import axios from "axios";
import {toast} from "react-toastify";
import moment from "moment/moment";
import {Link} from "react-router-dom";

const StyledSuccessBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Calendar = ({selectedUsers}) => {
    const questionnaire = JSON.parse(localStorage.getItem('questionnaire')) || {slug: null, isBooked: false, users: [], answers: [], answersSub1: []};
    const answers = questionnaire.answers;

    const getAnswer = key => {
        for (const i in answers) {
            if (answers[i]?.key === key) {
                return answers[i]?.value || '';
            }
        }

        return '';
    };

    const dispatch = useDispatch();

    const { calendar, agencies, event } = useSelector(state => {
        return {
            calendar: state.calendar,
            agencies: state.agencies,
            event: state.agencies.event,
        };
    });

    const users = agencies?.items || [];

    const { selectedSlots, activeDate } = calendar;

    GlobalHelper.date = new Date(activeDate);

    const [success, setSuccess] = useState(questionnaire.isBooked);

    const [switchToForm, setSwitchToForm] = useState(false);

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [showAdditionalGuestsInput, setShowAdditionalGuestsInput] = useState(false);

    const [slotSectionStyles, setSlotSectionStyles] = useState({});

    const {apiUrl} = AppContextDefaultValue;

    const slotsWarningStyle = {
        border: "dashed red 3px",
        padding: "5px",
    };

    useEffect(() => {
        onSwitchToFormHandler();
    }, []);

    const onSwitchToFormHandler = () => {
        const hasSelectedSlots = Object.values(calendar.selectedSlots).length > 0;

        if (!hasSelectedSlots) {
            setSlotSectionStyles(slotsWarningStyle);
        }

        setSwitchToForm(true);
    };

    const onFormSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        formData.append('event_id', event.id);

        const activeDate = GlobalHelper.getUTCDateTimeString(calendar.activeDate);

        formData.append('calendar', JSON.stringify({
            ...calendar,
            activeDate,
        }));

        selectedUsers.map(agent => formData.append('selectedAgencies[]', agent.id));

        axios.post(`${apiUrl}/calendar/book-call?timezone=${calendar.timeZoneName}&activeDate=${activeDate}`, formData).then(response => {
            const { success, errors } = response.data;

            setIsFormSubmitted(false);

            if (success) {
                dispatch({type: "remove-agencies"});
                dispatch({type: "remove-calendar"});
                setSuccess(true);
                questionnaire.isBooked = true;
                localStorage.setItem('questionnaire', JSON.stringify(questionnaire));
            } else {
                toast((Object.values(errors)?.[0] || "Oops! something went wrong."));
            }
        });

        setIsFormSubmitted(true);

        return false;
    };

    return (
        <CalendarContext.Provider value={{users, selectedUsers, slotsWarningStyle, slotSectionStyles, setSlotSectionStyles, calendar}}>
            <section className="calendar-wrapper">
                <div className="page-details">
                    <h1 className="page-title">Book a call</h1>
                    <p className="info-text">Book a call with selected agencies</p>
                </div>

                {switchToForm ? (
                    <div className="bg-white dark:bg-gray-800 sm:dark:border-gray-600 border-bookinglightest rounded-sm md:border max-w-5xl__disable_class">
                        {success ? (
                            <StyledSuccessBlock className="px-4 sm:flex sm:p-4 sm:py-5">
                                <p className="success-message-text">
                                    Thank you! you've successfully booked the call with our agencies.
                                </p>

                                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                                    <Link to={{pathname: "/" + questionnaire.slug}} type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                        Back
                                    </Link>
                                </div>
                            </StyledSuccessBlock>
                        ) : (
                            <div className="px-4 sm:flex sm:p-4 sm:py-5">
                                <div className="sm:w-1/2 sm:border-r sm:dark:border-gray-700">
                                    {event.imageUrl ? (
                                        <div style={{maxWidth: "150px", marginBottom: "30px"}} className="text-bookinglight mt-2 font-medium dark:text-gray-300">
                                            <img alt="Brand Logo" src={event.imageUrl}/>
                                        </div>
                                    ) : null}
                                    <h2 className="font-cal text-bookinglight mt-2 font-medium dark:text-gray-300">
                                        {event.title}
                                    </h2>
                                    <h1 className="text-bookingdark mb-4 text-xl font-semibold dark:text-white">
                                        {event.extra}
                                    </h1>

                                    <p className="text-bookinglight mb-2 dark:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                             aria-hidden="true"
                                             className="mr-[10px] ml-[2px] -mt-1 inline-block h-4 w-4 text-gray-400">
                                            <path fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                  clipRule="evenodd" />
                                        </svg>
                                        {event.description}
                                    </p>

                                    <p className="text-bookinglight mb-2 dark:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                             aria-hidden="true"
                                             className="mr-[10px] -mt-1 ml-[2px] inline-block h-4 w-4 text-gray-400">
                                            <path fillRule="evenodd"
                                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                  clipRule="evenodd" />
                                        </svg>
                                        {event.duratiion} Minutes
                                    </p>

                                    {selectedSlots.map((s, number) => {
                                        GlobalHelper.date = moment(s.date, 'YYYY-MM-DD').format();

                                        const user = questionnaire.users.find(u => u.id === s.userId);

                                        return (
                                            <React.Fragment key={number}>
                                                <p className="text-bookinghighlight mb-2">
                                                    <svg className="mr-[10px] ml-[2px] -mt-1 inline-block h-4 w-4"
                                                         fill="none" stroke="currentColor"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                    </svg>

                                                    {user.name}
                                                </p>

                                                <p className="text-bookinghighlight mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                                         aria-hidden="true" className="mr-[10px] ml-[2px] -mt-1 inline-block h-4 w-4">
                                                        <path fillRule="evenodd"
                                                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                              clipRule="evenodd" />
                                                    </svg>

                                                    {Object.values(s.slot)}, {GlobalHelper.getWeekdayFromDate()}, {GlobalHelper.getMonthFromDate()} {GlobalHelper.getDayFromDate()}, {GlobalHelper.getYearFromDate()}
                                                </p>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                                <div className="sm:w-1/2 sm:pl-8 sm:pr-4">
                                    <form onSubmit={e => onFormSubmitHandler(e)}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                Your name
                                            </label>
                                            <div className="mt-1">
                                                <input name="name" type="text" id="name" required=""
                                                       defaultValue={(getAnswer('FirstName') + ' ' + getAnswer('LastName')).trim()}
                                                       className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 sm:text-sm"
                                                       placeholder="John Doe" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                Email address
                                            </label>
                                            <div className="mt-1">
                                                <input type="email"
                                                       defaultValue={getAnswer('Email')}
                                                       autoCapitalize="none" autoComplete="email" autoCorrect="off" inputMode="email" name="email" required="" className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 sm:text-sm"
                                                       placeholder="you@example.com" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                Phone number
                                            </label>
                                            <div className="mt-1">
                                                <input type="text"
                                                       defaultValue={getAnswer('Phone')}
                                                       autoCapitalize="none" autoComplete="phone" autoCorrect="off" inputMode="phone" name="phone" required="" className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 sm:text-sm"
                                                       placeholder="" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                Website
                                            </label>
                                            <div className="mt-1">
                                                <input type="text"
                                                       defaultValue={getAnswer('Website')}
                                                       autoCapitalize="none" autoComplete="website" autoCorrect="off" inputMode="website" name="website" required="" className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 sm:text-sm"
                                                       placeholder="" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label onClick={e => setShowAdditionalGuestsInput(!showAdditionalGuestsInput)} htmlFor="guests" className="mb-1 block text-sm font-medium hover:cursor-pointer dark:text-white">
                                                {showAdditionalGuestsInput ? "-" : "+"} Additional Guests
                                            </label>
                                            {showAdditionalGuestsInput && <div className="mt-1">
                                                <input name="guests" type="text" id="guests"
                                                       className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 sm:text-sm"
                                                       placeholder="example1@example.com, example2@example.com"/>
                                            </div>}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="notes" className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
                                                Additional notes
                                            </label>
                                            <textarea
                                                defaultValue={getAnswer('AdditionalNotes')}
                                                name="notes" id="notes" rows="3" className="mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 sm:text-sm" placeholder="Please share anything that will help prepare for our meeting." />
                                        </div>
                                        <div className="flex items-start space-x-2 rtl:space-x-reverse">
                                            <button type={isFormSubmitted ? 'button' : 'submit'} data-testid="confirm-book-button" className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border border-transparent dark:text-darkmodebrandcontrast text-brandcontrast bg-brand dark:bg-darkmodebrand hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900">
                                                {isFormSubmitted ? 'Processing...' : 'Confirm'}
                                            </button>
                                            <Link to={{pathname: "/" + questionnaire.slug}} type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 dark:bg-transparent dark:text-white dark:border-gray-800 dark:hover:bg-gray-800">
                                                Cancel
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="bg-white dark:bg-gray-800 sm:dark:border-gray-600 border-bookinglightest rounded-sm md:border max-w-5xl__disable_class">
                            <div className="px-4 sm:flex sm:p-4 sm:py-5">
                                <CalendarLeftSide />
                                <CalendarContent />
                                <CalendarRightSide />
                            </div>
                        </div>

                        <div className="calendar-top-button clearfix">
                            {/*<Link to="/" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">*/}
                            {/*    Back to agencies page*/}
                            {/*</Link>*/}

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

export default Calendar;