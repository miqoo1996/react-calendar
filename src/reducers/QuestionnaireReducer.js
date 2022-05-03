import {AMOUNT_OF_PEOPLE_NUMBER} from "../Helpers/ConstsHelper";

const initialState = {
    active: null,
    next: null,
    sub1Running: null,
    answers: [],
};

const questionnaireAction = (state, action, key) => {
    const prevState = state;

    if (action.type === `update-${key}-answer`) {
        if (action.payload.active) {
            prevState.active = action.payload.active;
        }
        if (action.payload.next) {
            prevState.next = action.payload.next;
        }

        if (action.payload?.answer) {
            const answers = prevState.answers.filter(a => a.number < action.payload.answer.number);
            answers.push(action.payload.answer);
            prevState.answers = answers;
        }

        if (key === 'questionnaire') {
            if (action.payload.answer?.number === AMOUNT_OF_PEOPLE_NUMBER) {
                prevState.sub1Running = true;
            } else if (typeof action.payload.sub1Running === 'boolean') {
                prevState.sub1Running = !! action.payload?.sub1Running;
            }
        }
    }

    if (action.type === `remove-${key}-all`) {
        return {
            ...initialState,
        };
    }

    return {
        ...prevState,
    };
}

const QuestionnaireReducer = (state = initialState, action) => {
    return {...questionnaireAction(state, action, 'questionnaire')};
};

const sub1InitialState = {
    active: null,
    next: null,
    answers: [],
};

const SubQuestionnaire1Reducer = (state = sub1InitialState, action) => {
    return {...questionnaireAction(state, action, `sub1-questionnaire`)};
};

export {
    QuestionnaireReducer,
    SubQuestionnaire1Reducer,
};