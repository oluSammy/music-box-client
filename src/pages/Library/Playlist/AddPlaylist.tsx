import React from 'react'
import classes from './AddPlaylist.module.css';

interface Props {
    onHandleOpen: () => void
}

const AddPlaylist = (props: Props) => {
    return <div className={classes['create-playlist-card']}>
        <button onClick={props.onHandleOpen}>+</button>
        <h3>Create Playlist</h3>
    </div>
}

export default AddPlaylist