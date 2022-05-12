import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import validator from 'validator'
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const Email = ({handelAnswerSelection}) => {
    const [value, setValue] = useState();

    const {questionnaire} = useSelector(state => {
        return {
            questionnaire: state.questionnaire,
        };
    });

    const stepFirstName = questionnaire.answers.find(a => a.key === 'FirstName');

    const handleClick = () => {
        if (!value || !validator.isEmail(value)) {
            toast('Wrong email specified.');
        } else {
            handelAnswerSelection({active: 'Website', next: 'Phone', answer});
        }
    }

    const answer = {number: 6, key: 'Email', value};

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">{answer.number} <ArrowRightAltIcon /></span>
                    Great, thanks, {stepFirstName.value}! Where should we send the calendar invite?
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