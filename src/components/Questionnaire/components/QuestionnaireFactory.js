import AmountOfPeople from "../AmountOfPeople";
import DateAndTime from "../DateAndTime";
import FirstName from "../FirstName";
import LastName from "../LastName";
import Email from "../Email";
import AdditionalNotes from "../AdditionalNotes";
import Agencies from "../sub1/Agencies";
import ScheduleMeeting from "../ScheduleMeeting";
import GetStarted from "../GetStarted";
import EmptyString from "../EmptyString";

const QuestionnaireFactory = ({component, defaultComponent, props}) => {
    const {isActive} = props;

    let item;

    switch (component) {
        case "GetStarted":
            item = <GetStarted {...props} />;
            break;
        case "AmountOfPeople":
            item = <AmountOfPeople {...props} />;
            break;
        case "DateAndTime":
            item = <DateAndTime {...props} />;
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
        case "AdditionalNotes":
            item = <AdditionalNotes {...props} />;
            break;
        case "ScheduleMeeting":
            item = <ScheduleMeeting {...props} />;
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
            if (defaultComponent) {
                item = defaultComponent;
            }
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