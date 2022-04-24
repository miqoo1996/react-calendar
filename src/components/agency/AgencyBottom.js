import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const AgencyBottom = ({id, groupId}) => {
  const { agencies, teams } = useSelector(state => {
    return {
      agencies: state.agencies,
      teams: state.company.teams
    };
  });

  const team = teams.find(t => parseInt(t.id) === parseInt(id));
  const event = team?.event || {id: 0};

  return (
    <>
      {agencies.selectedUsers.filter(u => u.teamId === id && u.groupId === groupId).length ? (
        <div className="book-call-btn">
          <Link to={{pathname: "/book-call/" + event.id + '/' + agencies.selectedUsers.filter(u => u.teamId === id && u.groupId === groupId).map(u => u.id).join(',') + "?gid=" + groupId}} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Book call with agencies
          </Link>
        </div>
      ) : ''}
    </>
  );
}

export default AgencyBottom;