import _ from "lodash";
import React, {useState} from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import {Checkbox, ListItemButton} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const ServicesList = ({handelAnswerSelection, questions}) => {
    const [value, setValue] = useState([]);

    const answer = {number: 1, key: 'ServicesList', value};

    const questionItems = _.merge([], ...questions.filter(question => question.question_type === 'service').map(question => question.questionnaireItems));

    const options = questionItems.sort((prev, next) => prev.order - next.order).map(question => {
        return {
            id: question.id,
            value: question.title,
        };
    });

    const handleClick = () => {
        if (!value.length) {
            toast("Please select an answer from the list.");
        } else {
            handelAnswerSelection({active: 'BudgetConfirmation', next: 'AmountOfPeople', answer});
        }
    }

    const handleToggle = (v) => () => {
        const currentIndex = value.indexOf(v);
        const newChecked = [...value];

        if (currentIndex === -1) {
            newChecked.push(v);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setValue(newChecked);
    };

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">{answer.number} <ArrowRightAltIcon /></span>
                    Let's start here. Select the services you are most interested in.
                </Typography>

                <p className="info-text">We'll pick the right marketer(s) and ensure they are prepared for the call.</p>
            </div>

            <div>
                <div style={{overflow: "auto", maxHeight: "43vh", marginBottom: "20px"}}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: "10px" }}>
                        {options.map((option, number) => {
                            const labelId = `checkbox-list-secondary-label-${option.id}`;
                            return (
                                <React.Fragment key={option.id}>
                                    {number ? <Divider /> : null}
                                    <ListItem
                                        secondaryAction={
                                            <Checkbox
                                                edge="end"
                                                checked={value.indexOf(option.id) !== -1}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        }
                                        disablePadding
                                        onClick={handleToggle(option.id)}
                                    >
                                        <ListItemButton>
                                            <ListItemText id={labelId} primary={option.value} />
                                        </ListItemButton>
                                    </ListItem>
                                </React.Fragment>
                            );
                        })}
                    </List>
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" disableElevation onClick={handleClick}>
                        OK <span className="add-box-icon-btn" style={{marginLeft: "5px"}}><DoneIcon /></span>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ServicesList;