import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

export default function IssueForm({ handleSubmit, current = {}}) {
    const { title, description, status, priority } = current;

    const [titleForm, setTitle] = React.useState(title ?? '' );
    const [descriptionForm, setDescription] = React.useState(description ?? '');
    const [statusForm, setStatus] = React.useState(status ?? 'Open');
    const [priorityForm, setPriority] = React.useState(priority ?? 'Low');
    const [errors, setErrors] = React.useState({
        title: '',
        description: ''
    });

    const validateForm = () => {
        const newErrors = { title: '', description: '' };
        let isValid = true;

        if (!titleForm) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!descriptionForm.length) {
            newErrors.description = 'Description is required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    return (
    <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
    >
        <TextField
          id="outlined-controlled"
          label="Title"
          value={titleForm}
          error={!!errors.title}
          helperText={errors.title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          id="outlined-controlled"
          label="Descriptions"
          value={descriptionForm}
          error={!!errors.description}
          helperText={errors.description}
          onChange={(event) => { setDescription(event.target.value); }}
        />
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={statusForm}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value={"Open"}>Open</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Resolved"}>Resolved</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priorityForm}
              label="Priority"
              onChange={handlePriorityChange}
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
        </FormControl>
        <Button 
            variant="contained"
            onClick={() => {
                if (validateForm()) {
                    handleSubmit(titleForm, descriptionForm, statusForm, priorityForm);
                }
            }}
        >
            Submit
        </Button>
      </Box>
    )
}