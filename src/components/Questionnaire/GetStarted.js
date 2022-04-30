import Button from "@mui/material/Button";
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const GetStarted = ({handelAnswerSelection}) => {
    return (
        <div className="center-column">
            <div className="question-title" style={{marginBottom: 0}}>
                <div>
                    <p className="page-title">With one click, interview with "Better Help Therapy".</p>
                    <p className="info-text">Book a time with one of our licensed professional therapists online today!</p>
                </div>
            </div>

            <div>
                <small><WatchLaterIcon /> Takes 2 minutes</small>
            </div>

            <div>
                <Button onClick={e => handelAnswerSelection({active: 'AmountOfPeople', next: 'DateAndTime'})} variant="contained" disableElevation>
                    Get Started
                </Button>
            </div>
        </div>
    );
}

export default GetStarted;