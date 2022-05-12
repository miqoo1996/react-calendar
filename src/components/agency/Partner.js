import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

const Partner = (user) => {
    const {teamId, id, groupId, name, bio, image} = user;
    let {maxLimit} = user;

    maxLimit = maxLimit || user?.maxLimit || 4;

    const dispatch = useDispatch();

    const { selectedUsers, userStored, currentFilterDate } = useSelector(state => {
        return {
            currentFilterDate: state.users.currentFilterDate,
            users: state.agencies.items,
            selectedUsers: state.agencies.selectedUsers.length
                ? state.agencies.selectedUsers.filter(u => u.teamId === parseInt(teamId) && u.groupId === groupId)
                : [],
            userStored: state.agencies.selectedUsers.length
                ? state.agencies.selectedUsers.find(u => u.id === parseInt(id) && u.groupId === groupId)
                : null,
        };
    });

    const onAgencyClickHandle = () => {
        if (!userStored) {
            if (selectedUsers.findIndex(u => u.currentFilterDate === currentFilterDate) !== -1) {
                toast("You can only select one person at a time.");
            } else if (selectedUsers.filter(u => u.currentFilterDate === currentFilterDate).length <= (maxLimit - 1)) {
                dispatch({type: 'add-selected-user', payload: {
                        ...user,
                        groupId,
                        currentFilterDate
                    }});
            } else {
                toast(`You can choose maximum ${maxLimit} item.`);
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