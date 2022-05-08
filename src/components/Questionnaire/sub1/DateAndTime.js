import styled from 'styled-components';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from '@mui/icons-material/Done';
import Button from "@mui/material/Button";
import {useState} from "react";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import {toast} from "react-toastify";
import moment from "moment/moment";
import GlobalHelper from "../../../Helpers/GlobalHelper";
import {useSelector} from "react-redux";

const StyledDateTimePicker = styled.div`
    width: 100%;
    
    & label {
        color: inherit !important;
    }
    
    & fieldset {
        border-color: ${props => props.fieldsetColor} !important;
    }
`;

const DateAndTime = ({handelAnswerSelection}) => {
    const [value, setValue] = useState();

    const { subQuestionnaire1, selectedUsers } = useSelector(state => {
        return {
            subQuestionnaire1: state.subQuestionnaire1,
            selectedUsers: state.agencies.selectedUsers,
        };
    });

    const num = subQuestionnaire1.answers.length ? subQuestionnaire1.answers.length + 1 : 1;

    const answer = {number: "3." + num, key: 'DateAndTime', value};

    const handleChange = (value) => {
        setValue(GlobalHelper.getUTCDateTimeWithoutMinsSecsString(value));
    }

    const handleClick = () => {
        if (!answer.value) {
            answer.value = GlobalHelper.getUTCDateTimeWithoutMinsSecsString();
        }

        const now = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');

        if (! moment(answer.value).isValid()) {
            toast('Wrong date specified.');
        } else if (selectedUsers.findIndex(u => u.currentFilterDate === answer.value) !== -1) {
            toast("You have already chosen the date.");
        } else if (moment(answer.value, 'YYYY-MM-DD HH:mm:ss').isBefore(now)) {
            toast("meeting date must be greater then the current time.");
        } else {
            handelAnswerSelection({active: 'Agencies', next: 'DateAndTime', answer});
        }
    }

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">{answer.number} <ArrowRightAltIcon /></span>
                    {num <=1 ? 'Choose the date and time for the first meeting.' : 'Choose the next date and time, and then person.'}
                </Typography>
            </div>

            <div>
                <StyledDateTimePicker fieldsetColor="rgba(0, 0, 0, 0.23)">
                    <List>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DateTimePicker
                                    disablePast
                                    label="Date&Time you want to chat with"
                                    value={GlobalHelper.getUTCDateTimeWithoutMinsSecsString(value)}
                                    ampmInClock={true}
                                    ampm={true}
                                    openTo="day"
                                    views={["day","hours"]}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </List>
                </StyledDateTimePicker>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={handleClick} variant="contained" disableElevation>
                        OK <span className="add-box-icon-btn" style={{marginLeft: "5px"}}><DoneIcon /></span>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default DateAndTime;