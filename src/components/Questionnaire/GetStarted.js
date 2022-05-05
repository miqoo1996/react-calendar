import Button from "@mui/material/Button";
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const GetStarted = ({handelAnswerSelection, title, description}) => {
    localStorage.removeItem('questionnaire');

    return (
        <div className="center-column">
            <div className="question-title" style={{marginBottom: 0}}>
                <div>
                    <p className="page-title">{title}</p>
                    <p className="info-text">{description}</p>
                </div>
            </div>

            <div>
                <small><WatchLaterIcon /> Takes 2 minutes</small>
            </div>

            <div>
                <Button onClick={e => handelAnswerSelection({active: 'ServicesList', next: 'BudgetConfirmation'})} variant="contained" disableElevation>
                    Get Started
                </Button>
            </div>
        </div>
    );
}

export default GetStarted;