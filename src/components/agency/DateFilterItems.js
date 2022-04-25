import * as React from 'react';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export function SingleDateFilterItems({value, defaultValue, handleChange, secondary, children}) {
    const [active, setActive] = React.useState(true);

    if (!value) {
        value = defaultValue || new Date();
        handleChange(value);
    }

    return active ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                {secondary ? (
                    <div className="additional-filter-item">
                        <DateTimePicker
                            label="Date&Time picker"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        {children}

                        <div>
                            <IconButton aria-label="delete" size="large" onClick={e => setActive(false)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    </div>
                ) : (
                    <>
                        <DateTimePicker
                            label="Date&Time picker"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        {children}
                    </>
                )}
            </Stack>
        </LocalizationProvider>
    ) : null;
}

export default function DateFilterItems({value, handleChange, children}) {
    const [items, setItems] = React.useState([]);

    const handelClick = () => {
        setItems(prevState => {
            const item = <SingleDateFilterItems key={Math.random()} value={value} secondary={true} handleChange={handleChange}>
                <div>
                    <Button variant="contained" disableElevation onClick={handelClick}>
                        <span className="add-box-icon-btn"><FilterAltIcon /></span> Filter
                    </Button>

                    {children}
                </div>
            </SingleDateFilterItems>;

            if (item) {
                prevState.push(item);
            }

            return [...prevState];
        });
    }

    return (
        <section className="top-50">
            {items.length ? (
                <div style={{marginTop: "10px"}}>
                    {items}
                </div>
            ) : null}

            <div className="addNewFilterBtn">
                <Button variant="contained" disableElevation onClick={handelClick}>
                    <span className="add-box-icon-btn"><AddBoxIcon /></span> Add new filter for next date
                </Button>
            </div>
        </section>
    );
};