import Partner from "./Partner";
import AgencyBottom from "./AgencyBottom";
import TeamDialog from "./TeamDialog";
import {createRef} from "react";

const Team = (team) => {
    const {id, users, title, description} = team;

    const dialogBtnRef = createRef();

    return (
        <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="page-details white-selection-section" onClick={e => dialogBtnRef.current?.click()}>
                <h1 className="page-title">{title}</h1>
                <p className="info-text">{description}</p>
            </div>

            <TeamDialog {...team} buttonRef={dialogBtnRef} />

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