import Partner from "./Partner";
import AgencyBottom from "./AgencyBottom";

const Team = (team) => {
    const {id, users, title, description} = team;

    if (!users.length) {
        return "";
    }

    return (
        <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="page-details">
                <h1 className="page-title">{title}</h1>
                <p className="info-text">{description}</p>
            </div>

            <section className="agencies top-50">
                {users.map((item, key) => <Partner key={key} teamId={id} {...item} />)}

                <AgencyBottom {...team} />
            </section>
        </div>
    );
};

export default Team;