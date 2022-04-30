import "../../../public/Questionnaire.scss";
import {useDispatch, useSelector} from "react-redux";
import AmountOfPeople from "../AmountOfPeople";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import GetStarted from "../GetStarted";
import {toast} from "react-toastify";
import SubQuestionnaire1 from "./SubQuestionnaire1";
import {QuestionnaireFactory} from "./QuestionnaireFactory";
import {useParams} from "react-router";
import GlobalHelper from "../../../Helpers/GlobalHelper";
import axios from "axios";
import {AppContext} from "../../../AppContext";

const Questionnaire = () => {
    const { apiUrl } = useContext(AppContext);

    const dispatch = useDispatch();

    const [animate, setAnimate] = useState(false);

    const { teams, defaultTeamId, questionnaire, calendar } = useSelector(state => {
        return {
            questionnaire: state.questionnaire,
            calendar: state.calendar,
            teams: state.company.teams || [],
            defaultTeamId: state.company.teams?.[0]?.id,
        };
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (questionnaire.sub1Running === false) {
            setAnimate(true);

            setTimeout(() => {
                setAnimate(false);
            }, 601);
        }
    }, [questionnaire.sub1Running]);

    useLayoutEffect(() => {
        const activeDate = GlobalHelper.getUTCDateTimeString();

        axios.get(`${apiUrl}/company?timezone=${calendar.timeZoneName}&activeDate=${activeDate}`).then((response) => {
            dispatch({type: "update-company", payload: response.data});
            setIsLoading(false);
        });
    }, []);

    let { teamId } = useParams();

    teamId = teamId || defaultTeamId;

    const team = teams.find(t => t.id === parseInt(teamId));

    const handelAnswerSelection = (data, animationDuration = 601) => {
        if (!data.answer || (data.answer && data.answer.value)) {
            setAnimate(true);

            setTimeout(() => {
                setAnimate(false);
                dispatch({type: 'update-questionnaire-answer', payload: data})
            }, animationDuration);
        } else {
            toast('Please type your answer.');
        }
    };

    const questionnaireComponent = questionnaire.sub1Running ? <SubQuestionnaire1 team={team} /> : (
        <div id="questionnaire">
            <div className={'questions-section' + (animate ? ' animate' : '')}>
                <QuestionnaireFactory component={questionnaire.active} props={{handelAnswerSelection, isActive: true, ...team}} defaultComponent={
                    <GetStarted handelAnswerSelection={handelAnswerSelection} {...team} />
                } />
            </div>
            <div className={'questions-section' + (animate ? ' animate' : '')}>
                <QuestionnaireFactory component={questionnaire.next} props={{handelAnswerSelection, isNext: true, ...team}} defaultComponent={
                    <AmountOfPeople handelAnswerSelection={handelAnswerSelection} {...team} />
                } />
            </div>
        </div>
    );

    return isLoading ? <div id="questionnaire"><i>Please wait while loading data...</i></div> : questionnaireComponent;
}

export default Questionnaire;