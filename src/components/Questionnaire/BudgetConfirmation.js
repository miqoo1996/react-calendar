import React, {useState} from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import {Radio, ListItemButton} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {ANSWER_YES_ID, ANSWER_NO_ID} from "../../Helpers/ConstsHelper";
import {useDispatch} from "react-redux";

const BudgetConfirmation = ({handelAnswerSelection}) => {
    const dispatch = useDispatch();

    const [value, setValue] = useState({});

    const answer = {number: 9, key: 'BudgetConfirmation', value};

    const options = [
        {
            id: ANSWER_YES_ID,
            value: "Yes",
        },
        {
            id: ANSWER_NO_ID,
            value: "No",
        },
    ];

    const handleClick = () => {
        if (!value.id) {
            toast("Please select an answer from the list.");
        } else {
            if (value.id === ANSWER_YES_ID) {
                handelAnswerSelection({active: 'ScheduleMeeting', next: 'EmptyString', answer});
            } else {
                dispatch({type: 'update-questionnaire-answer', payload: {active: 'BudgetConfirmation', next: 'BudgetNotConfirmed'}});
                handelAnswerSelection({active: 'BudgetNotConfirmed', next: 'EmptyString'});
            }
        }
    }

    const handleToggle = (v) => () => {
        setValue(v);
    };

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">{answer.number} <ArrowRightAltIcon /></span>
                    For the right strategy, do you have a budget of $1,000+?
                </Typography>

                <p className="info-text">Our marketers are incredibly talented, but not magicians.</p>
            </div>

            <div>
                <List sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: "10px" }}>
                    {options.map((option, number) => {
                        const labelId = `checkbox-list-secondary-label-${option.id}`;
                        return (
                            <React.Fragment key={option.id}>
                                {number ? <Divider /> : null}
                                <ListItem
                                    secondaryAction={
                                        <Radio
                                            edge="end"
                                            checked={value.id === option.id}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    }
                                    disablePadding
                                    onClick={handleToggle(option)}
                                >
                                    <ListItemButton>
                                        <ListItemText id={labelId} primary={option.value} />
                                    </ListItemButton>
                                </ListItem>
                            </React.Fragment>
                        );
                    })}
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

export default BudgetConfirmation;