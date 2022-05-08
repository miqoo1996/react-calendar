import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import validator from 'validator'
import {toast} from "react-toastify";

const Website = ({handelAnswerSelection}) => {
    const [value, setValue] = useState();

    const handleClick = () => {
        if (!value || !validator.isURL(value)) {
            toast('Wrong website URL specified.');
        } else {
            handelAnswerSelection({active: 'Phone', next: 'BudgetConfirmation', answer});
        }
    }

    const answer = {number: 7, key: 'Website', value};

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">{answer.number} <ArrowRightAltIcon /></span>
                    Awesome. Now, what is your company website?
                </Typography>

                <p className="info-text">It really helps our experts to check out your online presence (no matter its condition).</p>
            </div>

            <div>
                <List>
                    <TextField
                        fullWidth
                        id="standard-helperText"
                        label="website"
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

export default Website;