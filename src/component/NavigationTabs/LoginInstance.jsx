import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchEmployeeTypes } from '../../actions/employeeActions';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: 390,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
export default function LoginInstance({ setEmployee }) {
    const classes = useStyles();
    const theme = useTheme();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [types, setTypes] = useState([]);
    const [currentType, setCurrentType] = useState('');

    const handleChange = (event) => {
        setCurrentType(event.target.value);
    };

    useEffect(() => {
        fetchEmployeeTypes().then((response) => {
            setTypes(response.data);
            setCurrentType(response.data[0]);
        });
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="first-name"
                        label="Full first name"
                        name="first-name"
                        onChange={(e) => setFirstName(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="last-name"
                        label="Full last name"
                        name="last-name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-name-label">
                            Name
                        </InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            value={currentType}
                            onChange={handleChange}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                            {types.map((type) => (
                                <MenuItem
                                    key={type}
                                    value={type}
                                    style={getStyles(type, currentType, theme)}
                                >
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            setEmployee({
                                firstName: firstName,
                                lastName: lastName,
                                type: currentType,
                            });
                        }}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}
