import {SubQuestionnaire1Factory} from "./QuestionnaireFactory";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useState} from "react";
import DateAndTime from "../sub1/DateAndTime";
import Agencies from "../sub1/Agencies";

const SubQuestionnaire1 = (team) => {
    const dispatch = useDispatch();

    const [animate, setAnimate] = useState(false);

    const { subQuestionnaire1 } = useSelector(state => {
        return {
            questionnaire: state.questionnaire,
            subQuestionnaire1: state.subQuestionnaire1,
        };
    });

    const handelAnswerSelection = (data, animationDuration = 601) => {
        if (!data.answer || (data.answer && data.answer.value)) {
            setAnimate(true);

            setTimeout(() => {
                setAnimate(false);
                dispatch({type: 'update-sub1-questionnaire-answer', payload: data})
            }, animationDuration);
        } else {
            toast('Please type your answer.');
        }
    };

    return (
        <div id="questionnaire">
            <div className={'questions-section' + (animate ? ' animate' : '')}>
                <SubQuestionnaire1Factory component={subQuestionnaire1.active} props={{handelAnswerSelection, isActive: true, ...team}} defaultComponent={
                    <DateAndTime handelAnswerSelection={handelAnswerSelection} {...team} subNumber={1} />
                } />
            </div>
            <div className={'questions-section' + (animate ? ' animate' : '')}>
                <SubQuestionnaire1Factory component={subQuestionnaire1.next} props={{handelAnswerSelection, isNext: true, ...team}} defaultComponent={
                    <Agencies handelAnswerSelection={handelAnswerSelection} {...team} subNumber={2} />
                } />
            </div>
        </div>
    );
}

export default SubQuestionnaire1;