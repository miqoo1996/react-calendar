import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const Agency = ({id, name, description, image}) => {
    const dispatch = useDispatch();

    const { selectedAgencies } = useSelector(state => {
        return {
            selectedAgencies: state.agencies?.selectedAgencies,
        };
    });

  const [selected, setSelected] = useState(selectedAgencies.indexOf(id.toString()) !== -1);

  const onAgencyClickHandle = (id) => {
    setSelected(!selected);

    if (!selected) {
      dispatch({type: 'add', payload: {id}});
    } else {
      dispatch({type: 'remove', payload: {id}});
    }
  };

  return (
    <div className='agency' onClick={e => onAgencyClickHandle(id)}>
      <svg style={{display: selected ? 'block' : 'none'}} className="w-6 h-6 dark:text-white selected-item" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>

      <div className="agency-image">
        <img src={image} />
      </div>
      <p style={{marginBottom: "10px"}}><strong>{name}</strong></p>
      <p className="info-text">{description}</p>
    </div>
  );
}

export default Agency;