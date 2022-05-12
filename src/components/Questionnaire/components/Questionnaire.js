import "../../../public/Agencies.scss";
import "../../../public/Questionnaire.scss";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useState} from "react";
import GetStarted from "../GetStarted";
import {toast} from "react-toastify";
import SubQuestionnaire1 from "./SubQuestionnaire1";
import {QuestionnaireFactory} from "./QuestionnaireFactory";
import {useParams} from "react-router";
import GlobalHelper from "../../../Helpers/GlobalHelper";
import axios from "axios";
import {AppContext} from "../../../AppContext";
import ServicesList from "../ServicesList";
import useDocumentOnEnter from "../../../hooks/useDocumentOnEnter";

const Questionnaire = () => {
    const { slug } = useParams();

    const [data, setData] = useState({});

    const { apiUrl } = useContext(AppContext);

    const dispatch = useDispatch();

    const [animate, setAnimate] = useState(false);

    const { questionnaire } = useSelector(state => {
        return {
            questionnaire: state.questionnaire,
            teams: state.company.teams || [],
        };
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (questionnaire.answers.length) {
            dispatch({type: "remove-questionnaire-all"});
            dispatch({type: "remove-sub1-questionnaire-all"});
        }
    }, []);

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
        axios.get(`${apiUrl}/questionnaire/find/?slug=${slug}&activeDate=${activeDate}`).then((response) => {
            setData(response.data);
            setIsLoading(false);
        });
    }, [slug]);

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

    const entersCount = useDocumentOnEnter();

    useEffect(() => {
        const element = document.querySelector('.MuiPaper-root');

        const button = document.querySelector('.question.active .add-box-icon-btn');

        if (button && !element && entersCount) {
            button.click();
        }
    }, [entersCount]);

    if (!slug || !data) {
        return (
            <div id="questionnaire">
                <div className='questions-section'>
                    <p className='page-title'>Please pass the survey before booking a call!</p>
                    <p className="info-text" style={{fontSize: '15px'}}>You need to ask the owner of the website for the URL of the "Survey" in case you don't have it.</p>
                </div>
            </div>
        );
    }

    const questionnaireComponent = questionnaire.sub1Running ? <SubQuestionnaire1 data={data} /> : (
        <div id="questionnaire">
            <div className={'questions-section' + (animate ? ' animate' : '')}>
                <QuestionnaireFactory component={questionnaire.active} props={{handelAnswerSelection, isActive: true, ...data}} defaultComponent={
                    <GetStarted handelAnswerSelection={handelAnswerSelection} {...data} />
                } />
            </div>
            <div className={'questions-section' + (animate ? ' animate' : '')}>
                <QuestionnaireFactory component={questionnaire.next} props={{handelAnswerSelection, isNext: true, ...data}} defaultComponent={
                    <ServicesList handelAnswerSelection={handelAnswerSelection} {...data} />
                } />
            </div>
        </div>
    );

    return isLoading ? <div id="questionnaire"><i>Please wait while loading data...</i></div> : questionnaireComponent;
}

export default Questionnaire;