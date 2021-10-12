import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import './SingleAnime.scss';
import AddReview from './AddReview'
import {
  getFromStorage,
  setInStorage,
} from '../context/storage'

const SingleAnime = (props) => {
  console.log("props.info", props.info);
  console.log(".............", props.info.data.documents[0].titles.en)
  const title = props.info.data.documents[0].titles.en;
  const imageUrl = props.info.data.documents[0].cover_image;
  // const rating = props.info.rating;
  // const airing = String(props.info.airing);
  // const broadcast = props.info.broadcast;
  const score = props.info.data.documents[0].score;
  const url = props.info.data.documents[0].trailer_url;
  const genres = props.info.data.documents[0].genres.join(' ');
  const description = props.info.data.documents[0].descriptions.en;
  const season_year = props.info.data.documents[0].season_year
  const episodes = props.info.data.documents[0].episodes_count
  const mal_id = props.info.data.documents[0].mal_id;
  console.log(title)
  const token = localStorage.getItem("the_main_app")
  console.log("token single naime page",token)
  return (
    <Grid
      container
      spacing={10}
      direction="row"
      justify="center"
      alignContent="center"
      alignItems="center"
      className="singleanime__container"
    >
      <Grid item>
        <img src={imageUrl} alt={title} className="singleanime__image" />
      </Grid>
      <Grid item>
        <Paper elevation={3} className="singleanime__description">
          <Typography variant="h5" component="h5">
            {title}
          </Typography>
          <Typography variant="h6" component="h6">
            Season Year: {season_year}
          </Typography>
          <Typography variant="h6" component="h6">
            Episodes: {episodes}
          </Typography>
          <Typography variant="h6" component="h6">
            Score: {score}
          </Typography>
          <Typography variant="h6" component="h6">
            Genres: {genres}
          </Typography>
          <Typography variant="h6" component="h6">
            Trailer: {url}
          </Typography>
          <Typography>
            Description: {description}
          </Typography>

          <Button href="/" variant="body1" >
            Any Anime
          </Button>
        </Paper>
      </Grid>
      <Grid item>
        {/* <Button href="/addreview" variant="body1">Add Review
      </Button> */}
        <Link to={{
          pathname: '/addreview',
          state: [{ mal_id: mal_id}]
        }}> Add Review </Link>
      </Grid>
    </Grid>
  );
};

export default SingleAnime;