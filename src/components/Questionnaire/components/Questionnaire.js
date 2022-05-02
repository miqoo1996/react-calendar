import "../../../public/Questionnaire.scss";
import {useDispatch, useSelector} from "react-redux";
import AmountOfPeople from "../AmountOfPeople";
import {useContext, useEffect, useState} from "react";
import GetStarted from "../GetStarted";
import {toast} from "react-toastify";
import SubQuestionnaire1 from "./SubQuestionnaire1";
import {QuestionnaireFactory} from "./QuestionnaireFactory";
import {useParams} from "react-router";
import GlobalHelper from "../../../Helpers/GlobalHelper";
import axios from "axios";
import {AppContext} from "../../../AppContext";

const Questionnaire = () => {
    const { teamId } = useParams();

    const [team, setTeam] = useState({});

    const { apiUrl } = useContext(AppContext);

    const dispatch = useDispatch();

    const [animate, setAnimate] = useState(false);

    const { questionnaire, calendar } = useSelector(state => {
        return {
            questionnaire: state.questionnaire,
            calendar: state.calendar,
            teams: state.company.teams || [],
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

    useEffect(() => {
        const activeDate = GlobalHelper.getUTCDateTimeString();

        axios.get(`${apiUrl}/team/find/?team_id=${teamId}&type=only-team&timezone=${calendar.timeZoneName}&activeDate=${activeDate}`).then((response) => {
            setTeam(response.data);
            setIsLoading(false);
        });
    }, []);

    const handelAnswerSelection = (data, validate = true, animationDuration = 601) => {
        if (!validate || (!data.answer || (data.answer && data.answer.value))) {
            setAnimate(true);

            setTimeout(() => {
                setAnimate(false);
                dispatch({type: 'update-questionnaire-answer', payload: data})
            }, animationDuration);
        } else {
            toast('Please type your answer.');
        }
    };

    if (!teamId || !team) {
        return (
            <div id="questionnaire">
                <div className='questions-section'>
                    <p className='page-title'>Please pass the survey before booking a call!</p>
                    <p className="info-text" style={{fontSize: '15px'}}>You need to ask the owner of the website for the URL of the "Survey" in case you don't have it.</p>
                </div>
            </div>
        );
    }

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