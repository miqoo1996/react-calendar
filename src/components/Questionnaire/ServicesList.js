import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import {useState} from "react";
import {toast} from "react-toastify";
import {Checkbox, ListItemButton} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {number} from "tailwindcss/lib/util/dataTypes";
import Divider from "@mui/material/Divider";

const ServicesList = ({handelAnswerSelection}) => {
    const [value, setValue] = useState([]);

    const answer = {number: 1, key: 'ServicesList', value};

    const options = [
        {
            id: 1,
            value: "Test List item 1",
        },
        {
            id: 2,
            value: "Test List item 2",
        },
        {
            id: 3,
            value: "Test List item 3",
        },
        {
            id: 4,
            value: "Test List item 4",
        },
    ];

    const handleClick = () => {
        if (!value.length) {
            toast("Please select an answer from the list.");
        } else {
            handelAnswerSelection({active: 'AmountOfPeople', next: 'DateAndTime', answer});
        }
    }

    const handleToggle = (v) => () => {
        const currentIndex = value.indexOf(v);
        const newChecked = [...value];

        if (currentIndex === -1) {
            newChecked.push(v);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setValue(newChecked);
    };

    return (
        <>
            <div className="question-title">
                <Typography variant="h5" component="h6">
                    <span className="question-number">1 <ArrowRightAltIcon /></span>
                    Let's start here. Select the services you are most interested in.
                </Typography>

                <p className="info-text">We'll pick the right marketer(s) and ensure they are prepared for the call.</p>
            </div>

            <div>
                <List sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: "10px" }}>
                    {options.map((option, number) => {
                        const labelId = `checkbox-list-secondary-label-${option.id}`;
                        return (
                            <>
                                {number ? <Divider /> : null}
                                <ListItem
                                    key={option.id}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            checked={value.indexOf(option.id) !== -1}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    }
                                    disablePadding
                                    onClick={handleToggle(option.id)}
                                >
                                    <ListItemButton>
                                        <ListItemText id={labelId} primary={option.value} />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        );
                    })}
                </List>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" disableElevation onClick={handleClick}>
                        OK <span className="add-box-icon-btn" style={{marginLeft: "5px"}}><DoneIcon /></span>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ServicesList;