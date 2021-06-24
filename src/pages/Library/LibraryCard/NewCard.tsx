import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent/CardContent';
// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface Props {
  avatar: string;
  name: string;
  description: string;
}

export default function MediaCard(props: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={props.avatar} title='Contemplative Reptile' />
      </CardActionArea>
      {/* <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {props.name}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
         {props.description}
        </Typography>
      </CardContent> */}
    </Card>
  );
}
