import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import {AMOUNT_OF_PEOPLE_NUMBER} from "../../Helpers/ConstsHelper";
import useDocumentOnEnter from "../../hooks/useDocumentOnEnter";
import {useSelector} from "react-redux";

const QuestionWrapper = styled.div`

`;

const AmountOfPeople = ({handelAnswerSelection}) => {
    const [value, setValue] = useState(1);

    const entersCount = useDocumentOnEnter();

    const {activeStep} = useSelector(state => {
        return {
            activeStep: state.questionnaire.active,
        };
    });

    useEffect(() => {
        if (entersCount && activeStep === answer.key) {
            handleClick();
        }
    }, [entersCount]);

    const answer = {number: AMOUNT_OF_PEOPLE_NUMBER, key: 'AmountOfPeople', value};

    const options = [1, 2, 3];

    const handleClick = () => {
        if (options.indexOf(value) < 0) {
            toast("Please select an answer from the list.");
        } else {
            handelAnswerSelection({active: 'DateAndTime', next: 'Agencies', answer});
        }
    }

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">{answer.number} <ArrowRightAltIcon /></span>
                    How different experts do you want to chat with?
                </Typography>
            </div>

            <QuestionWrapper>
                <List>
                    <ListItem button>
                        <TextField
                            fullWidth
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            helperText="Please select an answer"
                        >
                            {options.map((option, number) => {
                                return (
                                    <MenuItem key={number} value={option}>
                                        {option} {option > 1 ? 'people' : 'person'}
                                    </MenuItem>
                                );
                            })}
                        </TextField>
                    </ListItem>
                </List>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" disableElevation onClick={handleClick}>
                        OK <span className="add-box-icon-btn" style={{marginLeft: "5px"}}><DoneIcon /></span>
                    </Button>
                </div>
            </QuestionWrapper>
        </>
    );
}

export default AmountOfPeople;