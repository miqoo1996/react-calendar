import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from '@mui/icons-material/Done';
import Button from "@mui/material/Button";
import {useContext, useLayoutEffect, useState} from "react";
import Partner from "../../agency/Partner";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {AppContext} from "../../../AppContext";

const Agencies = ({handelAnswerSelection, team}) => {
    const { apiUrl } = useContext(AppContext);

    const dispatch = useDispatch();

    const { questionnaire, subQuestionnaire1, calendar, selectedUsers, users } = useSelector(state => {
        return {
            questionnaire: state.questionnaire,
            subQuestionnaire1: state.subQuestionnaire1,
            calendar: state.calendar,
            selectedUsers: state.agencies?.selectedUsers || [],
            users: state.users,
        };
    });

    const usersAmountNeeded = questionnaire.answers[0].value;

    const previousAnswer = subQuestionnaire1.answers[subQuestionnaire1.answers.length - 1]?.value;

    const num = subQuestionnaire1.answers.length ? (subQuestionnaire1.answers.length + 1) : 2;

    const answer = {number: "1." + num, key: 'Agencies', value: selectedUsers};

    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        if (typeof previousAnswer === 'string' && team.id) {
            axios.post(`${apiUrl}/user/team-available-users?timezone=${calendar.timeZoneName}&activeDate=${previousAnswer}&team_id=${team.id}`, {
                selectedUsers: selectedUsers.map(u => u.id),
            }).then((response) => {
                const usersFiltered = users.usersFiltered;

                usersFiltered[previousAnswer] = response.data;

                setIsLoading(false);

                if (response.data.length) {
                    dispatch({type: 'update-filtered-users', payload: usersFiltered});
                }
            });
        }
    }, [isLoading]);

    const handleClick = () => {
        if (users.usersFiltered?.[previousAnswer]?.length && usersAmountNeeded && usersAmountNeeded === selectedUsers.length) {
            dispatch({type: 'update-questionnaire-answer', payload: {active: 'FirstName', next: 'FirstName', sub1Running: false}});

            // setTimout is used for smooth moving from sub-questionnaire component to main questionnaire component
            setTimeout(() => {
                dispatch({type: 'update-questionnaire-answer', payload: {active: 'FirstName', next: 'LastName', sub1Running: false}});
            }, 800);
        } else if (!users.usersFiltered?.[previousAnswer]?.length) {
            // forward to previous step
            handelAnswerSelection({active: 'DateAndTime', next: 'Agencies', answer});
        } else {
            // forward to previous step
            handelAnswerSelection({active: 'DateAndTime', next: 'Agencies', answer});
        }
    }

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">{answer.number} <ArrowRightAltIcon /></span>
                    {usersAmountNeeded ? 'Select people you want to chat with.' : 'Please wait...'}
                </Typography>
            </div>

            <div>
                {users?.usersFiltered?.[previousAnswer]?.length ? (
                    <section className="agencies top-50">
                        {users?.usersFiltered[previousAnswer].map((item, key) => <Partner key={key} teamId={team.id} maxLimit={1} {...item} />)}
                    </section>
                ) : (
                    <section className="agencies top-50">
                        <i>{isLoading ? 'Please wait while loading data...' : 'No agencies available for the date you selected.'}</i>
                    </section>
                )}

                {isLoading ? null : (
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick={handleClick} variant="contained" disableElevation>
                            OK <span className="add-box-icon-btn" style={{marginLeft: "5px"}}><DoneIcon /></span>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Agencies;