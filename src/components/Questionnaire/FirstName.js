import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import validator from "validator";
import {toast} from "react-toastify";

const FirstName = ({handelAnswerSelection}) => {
    const [value, setValue] = useState();

    const answer = {number: 2, key: 'FirstName', value};

    const handleClick = () => {
        if (!value || !validator.isAlpha(value)) {
            toast('First name should contain only alphabetic symbols.');
        } else if (value.length < 2) {
            toast('Please provide at least 2 symbols.');
        } else {
            handelAnswerSelection({active: 'LastName', next: 'Email', answer});
        }
    }

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">2 <ArrowRightAltIcon /></span>
                    Great, now let's get a little personal. What's your first name?
                </Typography>
            </div>

            <div>
                <List>
                    <TextField
                        fullWidth
                        id="standard-helperText"
                        label="first name"
                        defaultValue=""
                        helperText="Type your answer here"
                        variant="standard"
                        onChange={e => setValue(e.target.value.trim())}
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

export default FirstName;