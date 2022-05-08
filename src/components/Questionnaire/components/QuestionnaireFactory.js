import AmountOfPeople from "../AmountOfPeople";
import FirstName from "../FirstName";
import LastName from "../LastName";
import Email from "../Email";
import AdditionalNotes from "../AdditionalNotes";
import Agencies from "../sub1/Agencies";
import ScheduleMeeting from "../ScheduleMeeting";
import GetStarted from "../GetStarted";
import EmptyString from "../EmptyString";
import DateAndTime from "../sub1/DateAndTime";
import ServicesList from "../ServicesList";
import BudgetConfirmation from "../BudgetConfirmation";
import BudgetNotConfirmed from "../BudgetNotConfirmed";
import Website from "../Website";
import Phone from "../Phone";

const QuestionnaireFactory = ({component, defaultComponent, props}) => {
    const {isActive} = props;

    let item;

    switch (component) {
        case "GetStarted":
            item = <GetStarted {...props} />;
            break;
        case "ServicesList":
            item = <ServicesList {...props} />;
            break;
        case "AmountOfPeople":
            item = <AmountOfPeople {...props} />;
            break;
        case "DateAndTime":
            item = <DateAndTime {...props} />;
            break;
        case "Agencies":
            item = <Agencies {...props} />;
            break;
        case "FirstName":
            item = <FirstName {...props} />;
            break;
        case "LastName":
            item = <LastName {...props} />;
            break;
        case "Email":
            item = <Email {...props} />;
            break;
        case "Website":
            item = <Website {...props} />;
            break;
        case "Phone":
            item = <Phone {...props} />;
            break;
        case "AdditionalNotes":
            item = <AdditionalNotes {...props} />;
            break;
        case "BudgetConfirmation":
            item = <BudgetConfirmation {...props} />;
            break;
        case "ScheduleMeeting":
            item = <ScheduleMeeting {...props} />;
            break;
        case "BudgetNotConfirmed":
            item = <BudgetNotConfirmed {...props} />;
            break;
        case "EmptyString":
            item = <EmptyString {...props} />;
            break;
        default:
            if (defaultComponent) {
                item = defaultComponent;
            }
    }

    return (
        <div className={'question' + (isActive ? ' active' : ' next-element')}>
            {item}
        </div>
    );
}

const SubQuestionnaire1Factory = ({component, defaultComponent, props}) => {
    const {isActive} = props;

    let item;

    switch (component) {
        case "DateAndTime":
            item = <DateAndTime {...props} />;
            break;
        case "Agencies":
            item = <Agencies {...props} />;
            break;
        default:
            if (component) {
                return QuestionnaireFactory({component, defaultComponent, props});
            }
    }

    if (!item && defaultComponent) {
        item = defaultComponent;
    }

    return (
        <div className={'question' + (isActive ? ' active' : ' next-element')}>
            {item}
        </div>
    );
};

export {
    QuestionnaireFactory,
    SubQuestionnaire1Factory,
};