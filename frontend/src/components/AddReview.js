import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../context/search';
import { Typography, Link, Paper, GridListTile, Grid } from '@material-ui/core';
import './AnimeCard.scss';
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles"


export default function AddReview () {
    const [rate, setRate] = useState(0);
    console.log("addreview",this.props.location.state)
    let token = localStorage.getItem("the_main_app")
    console.log("token",token)
    return (
        <div>
            add review
            
        </div>
    )

};

// export default AddReview;
