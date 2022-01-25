import React, {useState} from 'react'
import { Typography, Button, Container, makeStyles, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  }
});

export default function Create() {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('todos');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === '') {
      setTitleError(true);
    }

    if (details === '') {
      setDetailsError(true);
    }

    if (title && details) {
     axios.post('http://localhost:8000/notes', {
       title: title,
       details: details,
       category: category,
     })
     .then(res => {
      console.log('Sucessfully added!');
      history.push('/');
     })
     .catch(err => console.log(err));
    }
  }

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a new node
      </Typography>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
         variant="outlined" label="Title" color="primary"
         fullWidth
         className={classes.field}
         onChange={(e) => setTitle(e.target.value)}
         required
         error={titleError}
         />

        <TextField
         variant="outlined" label="Details" color="primary"
         fullWidth
         className={classes.field}
         multiline
         rows={4}
         required
         onChange={(e) => setDetails(e.target.value)}
         error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel> Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel control={<Radio />} value="money" label="Money" />
            <FormControlLabel control={<Radio />} value="todos" label="Todos" />
            <FormControlLabel control={<Radio />} value="reminder" label="Reminder" />
          </RadioGroup>
        </FormControl>
        


        <Button type="submit"
        color="secondary"
        variant="contained" 
        startIcon={<Send />}
        >
          Submit
        </Button>
      </form>
     

    </Container>
  )
}
