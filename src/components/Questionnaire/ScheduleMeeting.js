import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import AgencyBottom from "../agency/AgencyBottom";
import {useSelector} from "react-redux";

const ScheduleMeeting = (props) => {
    const {slug} = props;

    const { questionnaire, subQuestionnaire1, selectedUsers } = useSelector(state => {
        return {
            selectedUsers: state.agencies.selectedUsers,
            questionnaire: state.questionnaire,
            subQuestionnaire1: state.subQuestionnaire1,
        };
    });

    const users = [];
    selectedUsers.map(user => {
        users.push({
            ...user,
            filterDate: user.currentFilterDate,
        });
    });

    localStorage.setItem('questionnaire', JSON.stringify({
        slug,
        users,
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
                        <AgencyBottom {...props} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScheduleMeeting;