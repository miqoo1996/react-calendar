import {Link} from "react-router-dom";
import {connect} from "react-redux";

const AgencyBottom = ({agencies}) => {
  return (
    <>
      {agencies?.selectedAgencies?.length > 0 ? (
        <div style={{ marginLeft: "6%" }} className="book-call-btn">
          <Link to={{pathname: "/book-call/" + agencies.selectedAgencies.join(',')}} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Book call with agencies
          </Link>
        </div>
      ) : ''}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    agencies: state.agencies,
  };
}

export default connect(mapStateToProps)(AgencyBottom);