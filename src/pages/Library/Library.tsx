import React from 'react';
import classes from './Library.module.css';

interface Props {
  children: React.ReactNode;
}

const Wrapper = (props: Props) => {

  return (
    <div className={classes['wrapper']}>
        {props.children}
    </div>
  );
};
export default Wrapper;
