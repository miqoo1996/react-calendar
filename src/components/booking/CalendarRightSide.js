import '../../public/Calendar.scss';
import styled from 'styled-components';
import GlobalHelper from "../../Helpers/GlobalHelper";
import {CalendarContext} from "../../AppContext";
import {useContext, useLayoutEffect, useState} from "react";
import CalendarUser from "./CalendarUser";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from "@mui/material/Divider";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import moment from "moment/moment";
import {useDispatch} from "react-redux";

const CalendarRightSide = () => {
    const {calendar, selectedUsers, slotSectionStyles} = useContext(CalendarContext);

    const [showUsersSlots, setShowUsersSlots] = useState(false);

    const questionnaire = JSON.parse(localStorage.getItem('questionnaire')) || {users: [], answers: [], answersSub1: []};

    const dispatch = useDispatch();

    const selectedSlotsData = [];

    const dates = [];

    calendar.selectedSlots?.map(slot => {
        if (dates.indexOf(slot.date) === -1) {
            dates.push(slot.date);
        }
    })

    if (questionnaire?.users?.length) {
        questionnaire.users.map(u => {
            const now = moment(new Date(), 'YYYY-MM-DD HH');
            const date = moment(u.filterDate, 'YYYY-MM-DD HH');

            if (moment(now).diff(date) <= 0) {
                selectedSlotsData.push({userId: u.id, date: date.format("YYYY-MM-DD"), slot: date.format('hh:mma')});
            }
        });
    }

    useLayoutEffect(() => {
        if (selectedSlotsData.length) {
            dispatch({type: 'update-all-selected-slots', payload: selectedSlotsData});
        }
    }, []);

    GlobalHelper.date = calendar.activeDate;

    const BookedMeetingSectionItem = styled.div`
    margin: 0;
    min-width: 160px;
    margin-bottom: 50px;
    `;

    const BookedMeetingSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    `;

    const BookedMeetingWrapper = styled.div`
     text-align: initial;
     margin-bottom: 20px;
    `;
    const BookedMeetingSlot = styled.div`
    color: #948ca9;
    `;
    const BookedMeetingUserName = styled.div`
    color: black;
    font-weight: 500;
    `;
    const DividerSection = styled.div`
    margin-bottom: 30px;
    `;

    return (
        <div className="mt-8 flex flex-col text-center sm:mt-0 sm:w-1/3 sm:pl-4 md:-mb-5">
            {GlobalHelper.getCalendarWeekText({},
                <div className="text-bookingdarker dark:text-white">
                    <small>You've booked <strong>{Object.values(calendar.selectedSlots).length}</strong> of <strong>{selectedUsers.length}</strong> agencies</small>
                    <div>
                        <FormControlLabel
                            sx={{
                                display: 'block',
                            }}
                            control={
                                <Switch
                                    checked={showUsersSlots}
                                    onChange={() => setShowUsersSlots(!showUsersSlots)}
                                    name="loading"
                                    color="primary"
                                />
                            }
                            label="Switch to time slots"
                        />
                    </div>
                </div>,
                <InfoOutlinedIcon />
            )}

            {showUsersSlots ? (
                <div style={slotSectionStyles} className="slots-section flex-grow overflow-y-auto md:h-[364px]">
                    {selectedUsers?.map((user, key) => {
                        return (
                            <CalendarUser key={key} user={user} />
                        );
                    })}
                </div>
            ) : (
                <div className="booked-meetings-section flex-grow overflow-y-auto md:h-[364px]">
                    <DividerSection>
                        <Divider />
                    </DividerSection>

                    <BookedMeetingSection>
                        {dates.map((date, key) => {
                            return (
                                <BookedMeetingSectionItem key={key}>
                                    <BookedMeetingWrapper>
                                        {GlobalHelper.getCalendarDateTextSimple(date)}
                                    </BookedMeetingWrapper>

                                    {calendar.selectedSlots.filter(s => s.date === date).map((slot, key) => {
                                        const user = selectedUsers.find(u => u.id === slot.userId);

                                        return (
                                            <BookedMeetingWrapper key={key}>
                                                <BookedMeetingSlot>{slot.slot} - {slot.slot}</BookedMeetingSlot>
                                                <BookedMeetingUserName>{user?.name}</BookedMeetingUserName>
                                            </BookedMeetingWrapper>
                                        );
                                    })}
                                </BookedMeetingSectionItem>
                            );
                        })}
                    </BookedMeetingSection>
                </div>
            )}
        </div>
    );
}

export default CalendarRightSide;