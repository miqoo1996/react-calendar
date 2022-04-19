import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

const Partner = (user) => {
    const {teamId, id, name, bio, image} = user;

    const dispatch = useDispatch();

    const { selectedUsers, userStored } = useSelector(state => {
        return {
            users: state.agencies.items,
            selectedUsers: state.agencies.selectedUsers.length
                ? state.agencies.selectedUsers.filter(u => u.teamId === parseInt(teamId))
                : [],
            userStored: state.agencies.selectedUsers.length
                ? state.agencies.selectedUsers.find(u => u.id === parseInt(id))
                : null,
        };
    });

    const onAgencyClickHandle = () => {
        if (!userStored) {
            if (selectedUsers.length <= 4) {
                dispatch({type: 'add-selected-user', payload: user});
            } else {
                toast("You can select maximum 5 items.");
            }
        } else {
            dispatch({type: 'remove-selected-user', payload: user});
        }
    };

    return (
        <div className='agency' onClick={e => onAgencyClickHandle()}>
            <svg style={{display: userStored ? 'block' : 'none'}} className="w-6 h-6 dark:text-white selected-item" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <div className="agency-image">
                <img src={image} alt={name} />
            </div>
            <p style={{marginBottom: "10px"}}><strong>{name}</strong></p>
            <p className="info-text">{bio}</p>
        </div>
    );
}

export default Partner;