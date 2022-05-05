import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import {useState} from "react";
import List from "@mui/material/List";
import {TextareaAutosize} from "@mui/material";
import {toast} from "react-toastify";

const AdditionalNotes = ({handelAnswerSelection}) => {
    const [value, setValue] = useState();

    const answer = {number: 5, key: 'AdditionalNotes', value};

    const handleClick = () => {
        if (value && value.length < 10) {
            toast('Please provide at least 10 symbols.');
        } else {
            handelAnswerSelection({active: 'ScheduleMeeting', next: 'EmptyString', answer}, false);
        }
    }

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">{answer.number} <ArrowRightAltIcon /></span>
                    Additional notes
                </Typography>

                <p className="info-text">Please share anything that will help prepare for our meeting.</p>
            </div>

            <div>
                <List>
                    <TextareaAutosize
                        onChange={e => setValue(e.target.value.trim())}
                        aria-label="minimum height"
                        minRows={1}
                        placeholder="Please share anything that will help prepare for our meeting."
                        style={{ width: "100%" }}
                        className="transparent-textarea mt-1 block w-full rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 sm:text-sm"
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

export default AdditionalNotes;