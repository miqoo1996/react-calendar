import styled from 'styled-components';
import useGoogle, {useBackendGoogleAuth, fetchEvents} from "../../hooks/useGoogle";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {useContext, useEffect, useState} from "react";
import moment from "moment/moment";
import axios from "axios";
import {AppContext} from "../../AppContext";

const StyledEventsCalendar = styled.div`
   
`;

const CalendarButtonsWrapper = styled.div`
    
`;

const CalendarWrapper = styled.div`
    margin-top: 20px;
`;

const GoogleCalendar = () => {
    const {authUrl} = useBackendGoogleAuth();

    const {isUserLogged, setIsUserLogged} = useGoogle();

    const {websiteUrl} = useContext(AppContext);

    const [events, setEvents] = useState();

    const [isFullyComplete, setIsFullyComplete] = useState(false);

    const handleSignoutClick = () => {
        axios.post(`${websiteUrl}/user/social-auth/google-sign-out`).then((response) => {
            setIsUserLogged(false);
            localStorage.removeItem('google_access_token');
        });
    }

    useEffect(() => {
        if (isUserLogged) {
            fetchEvents(moment().subtract(1, 'month').startOf('month')).then(respone => {
                setEvents(respone);
            }).then(() => {
                // fetch again for full year.
                fetchEvents(moment().subtract(1, 'year').startOf('year')).then(respone => {
                    setEvents(respone);
                    setIsFullyComplete(true);
                });
            });
        } else {
            setEvents(null);
            setIsFullyComplete(true);
        }

    }, [isUserLogged]);

    return (
        <StyledEventsCalendar>
            <CalendarButtonsWrapper>
                {isUserLogged ? (
                    <button type="button" onClick={handleSignoutClick}
                            className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                        <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab"
                             data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor"
                                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Disconnect Google Calendar
                    </button>
                ) : (
                    <a href={authUrl}
                            className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                        <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab"
                             data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor"
                                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Connect Google Calendar
                    </a>
                )}
            </CalendarButtonsWrapper>

            <CalendarWrapper>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                />
            </CalendarWrapper>
        </StyledEventsCalendar>
    );
};

export default GoogleCalendar;