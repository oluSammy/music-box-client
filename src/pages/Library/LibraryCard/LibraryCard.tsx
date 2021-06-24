import React from 'react';
import classes from './LibraryCard.module.css'

interface Props {
    children: React.ReactNode
}

const LibraryCard = (props: Props) => {
    return <div className={classes['library-card']}>
        {props.children}
    </div>
}
export default LibraryCard