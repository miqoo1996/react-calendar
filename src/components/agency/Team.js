import Partner from "./Partner";
import AgencyBottom from "./AgencyBottom";
import TeamDialog from "./TeamDialog";
import {useState} from "react";

const Team = (team) => {
    const {id, users, title, description} = team;

    const [showDialog, setShowDialog] = useState(false);

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