import {AMOUNT_OF_PEOPLE_NUMBER} from "../Helpers/ConstsHelper";

const initialState = {
    active: null,
    next: null,
    sub1Running: null,
    answers: [],
};

const questionnaireAction = (state, action, key) => {
    if (action.type === `update-${key}-answer`) {
        state.active = action.payload?.active || null;

        state.next = action.payload?.next || null;

        if (action.payload?.answer) {
            const answers = state.answers.filter(a => a.number < action.payload.answer.number);
            answers.push(action.payload.answer);
            state.answers = answers;
        }
    }

    if (action.type === `remove-${key}-all`) {
        state = initialState;
    }

    return {
        ...state,
    };
}

const QuestionnaireReducer = (state = initialState, action) => {
    state = questionnaireAction(state, action, 'questionnaire');

    if (action.type === 'update-questionnaire-answer') {
        if (action.payload.answer?.number === AMOUNT_OF_PEOPLE_NUMBER) {
            state.sub1Running = true;
        } else if (typeof action.payload.sub1Running === 'boolean') {
            state.sub1Running = !! action.payload?.sub1Running;
        }
    }

    return {
        ...state,
    };
};

const sub1InitialState = {
    active: null,
    next: null,
    answers: [],
};

const SubQuestionnaire1Reducer = (state = sub1InitialState, action) => {
    state = questionnaireAction(state, action, `sub${AMOUNT_OF_PEOPLE_NUMBER}-questionnaire`);

    return {
        ...state,
    };
};

export {
    QuestionnaireReducer,
    SubQuestionnaire1Reducer,
};