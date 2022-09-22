import { useState, useRef, useEffect } from 'react'
import Cards from './Cards'
import './App.css';
import { Form, Input, Container, Segment, Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';
import { Details } from './Details'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  const [filteredResult, setFilteredResult] = useState([]);
  const [result, setResult] = useState([]);
  const [genre, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current = _.debounce(onSearchText, 500);
  }, []);

  const onSearchText = async (input) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${input}`)
      setResult(res.data);

      const genreArr = res.data.map(record => (record.show.genres))

      const flatten = genreArr.flat()

      const uniqueGenre = [...new Set(flatten)]

      const dropDownOptions = uniqueGenre.map(genre => {
        return {
          key: genre,
          text: genre,
          value: genre,
        }
      })

      setGenres(dropDownOptions)
      setIsLoading(false);
    } catch (err) {
      console.log(err, 'Something went wrong')
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    inputRef.current(event.target.value);
  };


  const filteredByGenre = ((shows, genre) => {
    const filtered = shows.filter(item => {
      return item.show.genres.includes(genre)
    })

    return filtered
  })

  const dropDownChange = (e, data) => {
    const value = data.value
    setFilteredResult(filteredByGenre(result, value))
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Router>
            <Switch>
              <Route exact path="/" >
                <Container>
                  <Segment basic size='mini'/>
                  <Form>
                    <Input
                      placeholder='Search for a tv show'
                      size='massive' fluid
                      onChange={(e) => handleChange(e)}
                      icon='search'
                      loading={isLoading}
                    />
                  </Form>
                  <Dropdown
                    placeholder='Select Genre'
                    fluid
                    selection
                    options={genre}
                    onChange={(e, data) => dropDownChange(e, data)}
                  />
                </Container>
                <Segment basic/>
                <Cards data={filteredResult.length > 0 ? filteredResult : result} title='seasonCards'/>
                <Segment basic/>
              </Route>
              <Route path="/:id"><Details /></Route>
            </Switch>
          </Router>
        </Container>
      </header>
    </div>
  );
}

export default App;
