import Partner from "./Partner";
import AgencyBottom from "./AgencyBottom";

const Team = ({id, users, title, description}) => {
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
                {users?.map((item, key) => {
                    return (
                        <Partner
                            key={key}
                            id={item.id}
                            name={item.name}
                            description={item.bio}
                            image={item.image}
                        />
                    )
                })}

                <AgencyBottom />
            </section>
        </div>
    );
};

export default Team;