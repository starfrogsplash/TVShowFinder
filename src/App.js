import { useState, useRef, useEffect } from 'react'
import Cards from './Cards'
import './App.css';
import { Form, Input, Container, Segment } from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';
import { Details } from './Details'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  const [result, setResult] = useState([]);
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
      setIsLoading(false);
    } catch (err) {
      console.log(err, 'Something went wrong')
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    inputRef.current(event.target.value);
  };

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
                </Container>
                <Segment basic/>
                <Cards data={result} title='seasonCards'/>
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
