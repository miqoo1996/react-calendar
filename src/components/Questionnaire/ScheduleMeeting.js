import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import AgencyBottom from "../agency/AgencyBottom";
import {useSelector} from "react-redux";

const ScheduleMeeting = ({handelAnswerSelection, id}) => {
    const { questionnaire, subQuestionnaire1 } = useSelector(state => {
        return {
            questionnaire: state.questionnaire,
            subQuestionnaire1: state.subQuestionnaire1,
        };
    });

    localStorage.setItem('questionnaire', JSON.stringify({
        answers: {
            ...questionnaire.answers
        },
        answersSub1: {
            ...subQuestionnaire1.answers
        },
    }));

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <div className="question-title">
                    <Typography variant="h5" component="h6">
                        <span className="question-number">&nbsp; <DoneIcon /></span>
                        Thank you! You're all set.
                    </Typography>
                </div>

                <div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <AgencyBottom id={id} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScheduleMeeting;