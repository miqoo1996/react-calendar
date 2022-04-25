import * as React from 'react';
import moment from "moment";
import {SingleDateFilterItems} from "./DateFilterItems";
import GlobalHelper from "../../Helpers/GlobalHelper";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {AppContext} from "../../AppContext";

export default function TeamDialogFilter({id}) {
    const dispatch = useDispatch();

    const { apiUrl } = React.useContext(AppContext);

    const {users, selectedUsers, calendar, currentFilterDate} = useSelector(state => {
        return {
            calendar: state.calendar,
            selectedUsers: state.agencies?.selectedUsers || [],
            users: state.users,
            currentFilterDate: state.users.currentFilterDate,
        };
    });

    const handleFilterClick = () => {
        const activeDate = GlobalHelper.getUTCDateTimeString();

        axios.post(`${apiUrl}/user/team-available-users?timezone=${calendar.timeZoneName}&activeDate=${activeDate}&team_id=${id}`, {
            selectedUsers: selectedUsers.map(u => u.id),
        }).then((response) => {
            const usersFiltered = users.usersFiltered;

            usersFiltered[currentFilterDate] = response.data;

            dispatch({type: 'update-filtered-users', payload: usersFiltered});
        });
    };

    const handleChange = (newValue) => {
        dispatch({type: 'update-current-filter-date', payload: {value: GlobalHelper.getUTCDateTimeString(newValue)}});
    };

    return (
        <>
            <SingleDateFilterItems value={currentFilterDate} handleChange={handleChange} />

            <div style={{marginTop: "10px", display: "flex", justifyContent: "space-between"}}>
                {selectedUsers.length ? (
                    <div>
                        <div className="label-items-selected">
                            Selected agencies:

                            {selectedUsers.map((user, key) => {
                                return (
                                    <span key={key} onClick={e => dispatch({type: 'remove-selected-user', payload: user})}>
                                        {user.name} <span className="remove-selected-label"><CloseIcon /></span>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                ) : <div />}

                <Button onClick={handleFilterClick} variant="contained" disableElevation>
                    <span className="add-box-icon-btn"><FilterAltIcon /></span> Filter Agencies
                </Button>
            </div>
        </>
    );
}