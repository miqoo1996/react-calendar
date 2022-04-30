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
import GlobalHelper from "../../Helpers/GlobalHelper";
import {toast} from "react-toastify";
import moment from "moment/moment";

const DateAndTime = ({handelAnswerSelection}) => {
    const [value, setValue] = useState();

    const answer = {number: 2, key: 'DateAndTime', value};

    const handleChange = (value) => {
        setValue(GlobalHelper.getUTCDateTimeString(value));
    }

    const handleClick = () => {
        if (!answer.value) {
            answer.value = GlobalHelper.getUTCDateTimeString();
        }

        if (! moment(answer.value).isValid()) {
            toast('Wrong date specified.');
        } else {
            handelAnswerSelection({active: 'FirstName', next: 'LastName', answer});
        }
    }

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">1.1 <ArrowRightAltIcon /></span>
                    Please select the date and time you want to chat with.
                </Typography>
            </div>

            <div>
                <List>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DateTimePicker
                                label="Date&Time you want to chat with"
                                value={GlobalHelper.getUTCDateTimeString(value)}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </List>

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