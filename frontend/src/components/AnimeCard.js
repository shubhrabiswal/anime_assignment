import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../context/search';
import { Typography, Link, Paper, GridListTile, Grid } from '@material-ui/core';
import './AnimeCard.scss';

const AnimeCard = (props) => {
  const history = useHistory();

  const search = useContext(SearchContext);
  console.log("props.anime",props.anime)
  const onClickHandler = (event) => {
    event.preventDefault();
    
    fetch(`https://api.aniapi.com/v1/anime?mal_id=${props.anime.mal_id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("anime card data",data)
        search.setSingle(data);
        localStorage.setItem('singleData', JSON.stringify(data));
        history.push('/single-view');
      });
  };

  let title =props.anime.titles.en
  // console.log(title.length,"kdsljd")
  title = title.length>20?`${title.substring(0,15)}...`:title;
  const imageUrl = props.anime.cover_image;
  let synopsis;
  if(props.anime.descriptions.en == null){
    synopsis ="none"
  }else{
    synopsis = props.anime.descriptions.en
  }
  // console.log(synopsis.length,"synopsis length")
  if(synopsis.length>20){
    synopsis = `${synopsis.substring(0,15)}...`
  }
  // console.log("title url syn",title,imageUrl,synopsis)
  return (
    <GridListTile className="animecard__container">
      <Grid container item xs={12}>
        <Paper className="animecard__paper">
          <img src={imageUrl} alt={title} style={{ maxHeight: 300 }} />
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" component="h2" paragraph={true}>
            {synopsis}
          </Typography>
          <Link
            component="button"
            variant="body1"
            style={{ marginBottom: 0 }}
            onClick={onClickHandler}
          >
            Learn More
          </Link>
        </Paper>
      </Grid>
    </GridListTile>
  );
};

export default AnimeCard;