import Partner from "./Partner";
import AgencyBottom from "./AgencyBottom";
import TeamDialog from "./TeamDialog";
import {useEffect, useState} from "react";
import moment from "moment";
import {useDispatch} from "react-redux";

const Team = (team) => {
    const {id, users, title, description} = team;

    const dispatch = useDispatch();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        dispatch({type: 'currentFilterDate', payload: {value: moment().format("YYYY-MM-DD HH:mm:ss")}});
        dispatch({type: 'update-items', payload: {selectedUsers: []}});
        dispatch({type: 'update-filtered-users', payload: {}});
    }, [showDialog]);

    return (
        <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="page-details white-selection-section" onClick={e => setShowDialog(!showDialog)}>
                <h1 className="page-title">{title}</h1>
                <p className="info-text">{description}</p>
            </div>

            { showDialog && <TeamDialog {...team} /> }

            {users.length ? (
                <section className="agencies top-50">
                    {users.map((item, key) => <Partner key={key} teamId={id} {...item} />)}

                    <AgencyBottom {...team} />
                </section>
            ) : null}
        </div>
    );
};

export default Team;