import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import moment from "moment";

const AgencyBottom = ({id, groupId, event}) => {
  const { agencies, teams, usersFilteredDates } = useSelector(state => {
    return {
      agencies: state.agencies,
      teams: state.company.teams,
      usersFilteredDates: Object.keys(state.users.usersFiltered),
    };
  });

  let smallestDate = usersFilteredDates[0];

  usersFilteredDates.map(date => {
    if (moment(date).diff(smallestDate) < 0) {
      smallestDate = date;
    }
  });

  const team = teams.find(t => parseInt(t.id) === parseInt(id));
  event = event || team?.event || {id: 0};

  const linkUrl = groupId
      ? "/book-call/" + event.id + '/' + agencies.selectedUsers.filter(u => u.teamId === id && u.groupId === groupId).map(u => u.id).join(',') + "?date=" + groupId
      : "/book-call/" + event.id + '/' + agencies.selectedUsers.filter(u => u.teamId === id).map(u => u.id).join(','); // + "?date=" + smallestDate;

  const active = groupId
      ? agencies.selectedUsers.filter(u => u.teamId === id && u.groupId === groupId).length
      : agencies.selectedUsers.filter(u => u.teamId === id).length;

  return (
    <>
      {active ? (
        <div className="book-call-btn">
          <Link to={{pathname: linkUrl}} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Book call with agencies
          </Link>
        </div>
      ) : ''}
    </>
  );
}

export default AgencyBottom;