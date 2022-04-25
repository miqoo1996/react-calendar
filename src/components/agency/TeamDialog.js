import * as React from 'react';
import moment from "moment";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TeamDialogDatePicker from "./TeamDialogDatePicker";
import {useDispatch, useSelector} from "react-redux";
import GlobalHelper from "../../Helpers/GlobalHelper";
import AgencyBottom from "./AgencyBottom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TeamDialog = ({id, buttonRef}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [usersCount, setUsersCount] = React.useState(0);
    const [fullScreen, setFullScreen] = React.useState(false);
    const [dateSelectionStep, setDateSelectionStep] = React.useState(false);

    const {usersFiltered} = useSelector(state => {
        return {
            usersFiltered: state.users.usersFiltered,
        };
    });

    const handleClickListItem = (value) => {
        setUsersCount(value);
        setDateSelectionStep(true);
        setFullScreen(true);
    };

    const handleClickOpen = () => {
        setUsersCount(0);
        setDateSelectionStep(false);
        setFullScreen(false);
        setOpen(true);

        dispatch({type: 'update-items', payload: {selectedUsers: []}});
        dispatch({type: 'update-filtered-users', payload: {}});
    };

    const handleClose = () => {
        setOpen(false);
    };

    const filters = [
        <div key={-1} className="date-picker-dialog" style={{padding: "50px"}}>
            <TeamDialogDatePicker id={id} maxLabelLimit={usersCount}/>
        </div>,
    ];

    for (let date in usersFiltered) {
        const newDate = moment(date).add(1, 'hours').format("YYYY-MM-DD HH:mm:ss");

        filters.push(
            <div key={Math.random()} className="date-picker-dialog" style={{padding: "0 50px 50px"}}>
                <TeamDialogDatePicker id={id} defaultValue={newDate} maxLabelLimit={usersCount}/>
            </div>
        );
    }

    return (
        <>
            <Button hidden ref={buttonRef} variant="outlined" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: Object.keys(usersFiltered).length ? 'fixed' : 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {dateSelectionStep ? <div style={{display:  "flex", justifyContent: "space-between"}}>
                                <span className="tablet-desktop-only">Please select the date and time you want to chat with.</span>

                                <AgencyBottom id={id} />
                            </div> : 'how many people do you want to chat with?'}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {dateSelectionStep ? (
                    <List>
                        {filters}
                    </List>
                ) : (
                    <List>
                        <ListItem button onClick={e => handleClickListItem(1)}>
                            <ListItemText primary="1 people" secondary="" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={e => handleClickListItem(2)}>
                            <ListItemText primary="2 people" secondary="" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={e => handleClickListItem(3)}>
                            <ListItemText primary="3 people" secondary="" />
                        </ListItem>
                    </List>
                )}
            </Dialog>
        </>
    );
};

export default TeamDialog;