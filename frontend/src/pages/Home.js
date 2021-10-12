import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../context/search';
import { useHistory } from 'react-router-dom';
import { FormControl, Input, IconButton, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './Home.scss'

const Home = () => {
    // const search = useContext(SearchContext)
    const history = useHistory();
    const search = useContext(SearchContext);
    const [input, setInput] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        search.search(input).then((data) => {
            console.log(data.results)
            search.setData(data.results);
            localStorage.setItem('myData', JSON.stringify(data.results));
            history.push('/results');
        });
    };
    // useEffect(() => {
    //     search.search('Naruto').then((data) => {
    //         console.log(data)
    //     })
    // }, [search])

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            alignContent="center"
        >
            <Grid item>
                <img
                    alt="doraemon"
                    src={process.env.PUBLIC_URL + '/dora.jpg'}
                    height={420}
                    width={550}
                />
            </Grid>
            <Grid item>
                <form className="home__form">
                    Enter the name of the anime in the search bar at top right corner
                </form>
            </Grid>
            {/* <Grid item>
                <form className="home__form">
                    <FormControl className="home__formControl" type="submit">
                        <Input placeholder="Search for yor fav anime.."
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            className="home__input"
                        />
                        <IconButton
                            className="hoome__iconButton"
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!input}
                            onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </FormControl>
                </form>
            </Grid> */}
        </Grid>
    )
}

export default Home;