import React, { useState, useEffect } from 'react';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import axios from 'axios'
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import customClasses from './ModalButton.module.css';
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import customStyles from './Modal.module.css';

interface Props {
  onOpen: boolean;
  onHandleClose: () => void;
  onAddPlaylist: (data: Record<string, any>) => void;
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    color: 'blue',
  },
  formOutlinedInput: {
    color: 'white',
  },
}));

const Dialog = withStyles((theme) => ({
  paper: {
    background: '#161A1A',
    width: '30rem',
  },
}))(MuiDialog);

export default function AnimatedModal(props: Props) {
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  
  const URL = 'https://music-box-b.herokuapp.com/api/v1/music-box-api';

  const classes = useStyles();

  const fetchGenre = async (): Promise<void> => {
    const response = await axios.get(`${URL}/genres`)
    setGenres(response.data.data)
  }
  useEffect(() => {
    fetchGenre()
  })

  const handleChange = (event: any) => {
    setType(event.target.value);
  };

  const handleChangeTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const handleChangeDesc = (event: any) => {
    setDesc(event.target.value);
  };

  const handleChangeGenre = (event: any) => {
    setGenre(event.target.value)
  }

  const handleSubmit = (event: any) => {
    console.log(desc);
    const data = {
      name: title,
      genreId: genre,
      isPublic: type === 'Public' ? true : false,
    };
    console.log(data)
    setTitle('');
    setDesc('');
    setType('');
    console.log(data);
    props.onAddPlaylist(data);
    props.onHandleClose();
  };

  return (
    <div>
      <Dialog
        className={customStyles.white}
        open={props.onOpen}
        onClose={props.onHandleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Create New Playlist</DialogTitle>
        <DialogContent>
          <TextField
            value={title}
            color='secondary'
            autoFocus
            margin='dense'
            id='title'
            label='Title'
            type='text'
            fullWidth
            onChange={handleChangeTitle}
            InputLabelProps={{
              classes: {
                root: classes.input,
                focused: classes.input,
              },
            }}
          />

          <TextField
            value={desc}
            id='standard-multiline-static'
            label='Write a Description'
            color='secondary'
            multiline
            rows={5}
            onChange={handleChangeDesc}
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.input,
                focused: classes.input,
              },
            }}
          />


          <FormControl className={classes.formControl} fullWidth>
            <TextField
              label='Genre'
              id='demo-simple-genre'
              value={genre}
              onChange={handleChangeGenre}
              select
              size='small'
              color='secondary'
              InputLabelProps={{
                classes: {
                  root: classes.input,
                  focused: classes.input,
                },
              }}
            >
              { genres.map((gen: Record<string, any>) => {
                return <MenuItem key={gen.id} value={gen._id}>{gen.name}</MenuItem>
              })}
            </TextField>
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <TextField
              label='type'
              id='demo-simple-select'
              value={type}
              onChange={handleChange}
              select
              size='small'
              color='secondary'
              InputLabelProps={{
                classes: {
                  root: classes.input,
                  focused: classes.input,
                },
              }}
            >
              <MenuItem value={'Public'}>Public</MenuItem>
              <MenuItem value={'Private'}>Private</MenuItem>
            </TextField>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className={customClasses['modal-button-link']} onClick={props.onHandleClose}>
            CANCEL
          </button>
          <button className={customClasses['modal-button']} onClick={handleSubmit}>
            CREATE
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
