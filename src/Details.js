import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';
import parse from 'html-react-parser';
import { Card, Image, Segment, Container, Header, Grid, Icon, Button } from 'semantic-ui-react'
import {getUniqueCast} from './util/getUniqueCast'

const Details = () => {
  const { id } = useParams()
  const [cast, setCastData] = useState([]);
  const [seasons, setSeasonData] = useState([]);
  const [isSelected, setSelected] = useState(false);
  const { show } = useLocation()

  useEffect(() => {
    const fetchAll = async () => {
      const getCast = `http://api.tvmaze.com/shows/${id}/cast`
      const getSeason = `http://api.tvmaze.com/shows/${id}/seasons`

      const resData = await Promise.all([
        axios.get(getCast),
        axios.get(getSeason)
      ])

      const [castRes, seasonRes] = resData

      setCastData(getUniqueCast(castRes));
      setSeasonData(seasonRes.data);
    };

    fetchAll()
  }, [id]);

  useEffect(()=> {
    if(localStorage.getItem(`${id}`)){
      setSelected(JSON.parse(localStorage.getItem(`${id}`)))
    }
  }, [id])

  useEffect(()=> {
    localStorage.setItem(`${id}`, isSelected)
  }, [isSelected, id])

  return (
    <div>
      <Segment basic />
      <Grid style={{ 'marginBottom': '0' }}>
        <Grid.Row>
          <Grid.Column width={2}>
            <Link to="/" >
              <Header as='h2' color='teal'>Back</Header>
            </Link>
          </Grid.Column>
          <Grid.Column width={12}>

            <Grid verticalAlign='bottom'>
              <Grid.Column width={4} >
                <Image src={show.image ? show.image.medium : './blankImage.jpeg'} />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header style={{ 'fontSize': '3rem', 'textAlign': 'left', 'lineHeight': '.9em' }} size='large' inverted color='grey'>{show.name}</Header>
              </Grid.Column>
              <Grid.Column width={3} style={{ 'textAlign': 'left' }}>
                <Button icon style={{ 'background': 'transparent', 'padding': '0.4em' }} size='big'>
                  <Icon name='star' color={isSelected ? 'yellow' : "grey"} size='big' onClick={() => setSelected(!isSelected)} />
                </Button>
              </Grid.Column>
            </Grid>
            <Segment basic size='mini' />
            <Container fluid textAlign='left' style={{ 'fontSize': '.6em'}}>{parse(show.summary ? show.summary : '')}</Container>
            <Segment basic size='mini' />
            <Container>
              <Header size='medium' inverted color='grey' textAlign='left'>Cast</Header>
              <Segment basic size='mini' />
              <Card.Group itemsPerRow={5} title='castCards'>
                {cast.map(person =>
                  <Card
                    key={person.id}
                    style={{ 'fontSize': '1rem' }}
                    image={person.image ? person.image.medium : './blankImage.jpeg'}
                    header={person.name}
                  />
                )}
              </Card.Group>
            </Container>
            <Segment basic />
            <Container >
              <Header size='medium' inverted color='grey' textAlign='left'>Seasons</Header>
              <Segment basic size='mini' />
              <Card.Group itemsPerRow={5} title='seasonCards'>
                {seasons.map(season =>
                  <Card
                  key={season.id}
                  style={{ 'fontSize': '1rem' }}
                  image={season.image ? season.image.medium : './blankImage.jpeg'}
                  header={season.number}
                  description={season.episodeOrder ? `Episodes: ${season.episodeOrder}` : ''}
                  />
                )}
              </Card.Group>
            </Container>
            <Segment basic />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
};

export {
  Details
}

