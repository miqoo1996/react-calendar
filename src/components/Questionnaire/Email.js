import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import validator from 'validator'
import {toast} from "react-toastify";

const Email = ({handelAnswerSelection}) => {
    const [value, setValue] = useState();

    const handleClick = () => {
        if (!value || !validator.isEmail(value)) {
            toast('Wrong email specified.');
        } else {
            handelAnswerSelection({active: 'ScheduleMeeting', next: 'EmptyString', answer});
        }
    }

    const answer = {number: 5, key: 'Email', value};

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">5 <ArrowRightAltIcon /></span>
                    Great, thanks, sad! Where should we send the calendar invite?
                </Typography>

                <p className="info-text">We'll use this email address to send calendar invites and introductions to your marketing expert. Your work email is recommended.</p>
            </div>

            <div>
                <List>
                    <TextField
                        fullWidth
                        id="standard-helperText"
                        label="email"
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

export default Email;