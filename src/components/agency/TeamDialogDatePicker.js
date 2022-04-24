import * as React from 'react';
import GlobalHelper from "../../Helpers/GlobalHelper";
import {useDispatch, useSelector} from "react-redux";
import Partner from "./Partner";
import CloseIcon from "@mui/icons-material/Close";
import AgencyBottom from "./AgencyBottom";
import TeamDialogFilter from "./TeamDialogFillter";

export default function TeamDialogDatePicker({id, maxLabelLimit, date}) {
    const dispatch = useDispatch();

    const {users, selectedUsers} = useSelector(state => {
        return {
            users: state.users,
            selectedUsers: state.agencies.selectedUsers,
        };
    });

    const handleCloseUsersSection = (groupId) => {
        delete users.usersFiltered[groupId];

        dispatch({type: 'update-filtered-users', payload: {...users.usersFiltered}});

        dispatch({type: 'update-items', payload: {selectedUsers: selectedUsers.filter(u => u.groupId !== groupId)}});
    };

    const dateFormatted = GlobalHelper.getUTCDateTimeString(date);

    return (
        <>
            {users.usersFiltered[dateFormatted] ? (
                <section className="bg-gray-100" style={{position: "relative", padding: "20px", marginTop: "20px"}}>
                    <div className="right-close-icon">
                        <CloseIcon onClick={e => handleCloseUsersSection(dateFormatted)} />
                    </div>

                    <div className="agencies top-50" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {users.usersFiltered[dateFormatted].map((item, key) => <Partner key={key} groupId={dateFormatted} maxLimit={maxLabelLimit} teamId={id} {...item} />)}
                    </div>

                    <div className="top-50" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <AgencyBottom id={id} groupId={dateFormatted} />
                    </div>
                </section>
            ) : <TeamDialogFilter id={id} date={date} />}
        </>
    );
}