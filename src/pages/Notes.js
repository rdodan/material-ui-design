import React, { useState, useEffect }from 'react';
import { Paper, Box, styled, makeStyles, Container } from '@material-ui/core';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';

const useStyles = makeStyles({
  item: {
    display: 'flex'
  }
})



export default function Notes() {
  const [notes, setNotes] = useState([]);

  const classes = makeStyles();

  useEffect(() => {
    axios.get('http://localhost:8000/notes')
    .then(res => setNotes(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:8000/notes/' + id)
    .then(res => {
     const newNotes = notes.filter(note => note.id !== id);
     setNotes(newNotes);
      console.log('Sucessfully deleted');
    })
    .catch(err => console.log(err))
  }  
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }


  return (
    <Container>  
      <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      >
        {notes.map(note => (
          <div key={note.id} className={classes.item}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        ))}   
      </Masonry>
    </Container>
  )
}
