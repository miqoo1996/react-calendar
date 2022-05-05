import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import {useState} from "react";
import List from "@mui/material/List";
import {toast} from "react-toastify";
import TextField from "@mui/material/TextField";
import {PHONE_NUMBER_REGEX} from "../../Helpers/ConstsHelper";

const Phone = ({handelAnswerSelection}) => {
    const [value, setValue] = useState("");

    const handleClick = () => {
        if (!value || !value.match(PHONE_NUMBER_REGEX)) {
            toast('Wrong phone number specified.');
        } else {
            handelAnswerSelection({active: 'ScheduleMeeting', next: 'EmptyString', answer});
        }
    }

    const answer = {number: 8, key: 'Phone', value};

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">{answer.number} <ArrowRightAltIcon /></span>
                    Thanks! Now, what number should we call you on?
                </Typography>

                <p className="info-text">This is where the first phone call will happen. We'll include this number in the invite so your expert can call you directly.</p>
            </div>

            <div>
                <List>
                    <TextField
                        fullWidth
                        id="standard-helperText"
                        label="phone number"
                        defaultValue=""
                        helperText="Type your answer here"
                        variant="standard"
                        onChange={e => setValue(e.target.value)}
                    />
                </List>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" disableElevation onClick={handleClick}>
                        OK <span className="add-box-icon-btn" style={{marginLeft: "5px"}}><DoneIcon /></span>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Phone;