import { makeStyles } from '@material-ui/core';

const playlistTableStyles = makeStyles((theme) => ({
  table: {
    marginTop: 40,
    paddingBottom: 50,
  },
  tableHeading: {
    display: 'grid',
    gridTemplateColumns: '.1fr .2fr 1.2fr 1.2fr 1.4fr .2fr .2fr',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',

    '@media (max-width: 982px)': {
      gridTemplateColumns: '.1fr .2fr .5fr .5fr .7fr .2fr .2fr',
    },

    '@media (max-width: 552px)': {
      gridTemplateColumns: '.2fr 1fr .2fr',
    },
  },
  title: {
    fontSize: 13,
    opacity: 0.7,
    fontWeight: 300,
  },
  gridEnd: {
    justifySelf: 'end',
  },
  gridImg: {
    height: 35,
    width: 35,
  },
  trackCover: {
    height: '100%',
    width: '100%',
    display: 'block',
    objectFit: 'cover',
  },
  contentTxt: {
    fontWeight: 300,
  },
  contentOpacity: {
    opacity: 0.7,
  },
  hideOnMobile: {
    '@media (max-width: 552px)': {
      display: 'none',
    },
  },
  nameMobile: {
    display: 'flex',
    flexDirection: 'column',
  },
  spanMobile: {
    opacity: 0.7,
  },
}));

export default playlistTableStyles;
