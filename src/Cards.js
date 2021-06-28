import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const ShowCards = ({ data }) => {
    return (
        <Card.Group itemsPerRow={3}>
            {data.map(item =>
                <Card key={item.show.id}>
                    <Link to={{
                        pathname: `/${item.show.id}`,
                        show: item.show
                    }}
                        style={{ 'width': '100%' }}
                    >
                        <Image style={{ 'width': '100%' }} src={item.show.image ? item.show.image.medium : './blankImage.jpeg'} />
                    </Link>
                    <Card.Content >
                        <Card.Header textAlign='left' style={{ 'fontSize': '2rem' }}>{item.show.name}</Card.Header>
                        <Card.Description textAlign='left' style={{ 'lineHeight': '1em', 'fontSize': '1.5rem' }}>
                            {item.show.genres.join(', ')}
                        </Card.Description>
                    </Card.Content>
                </Card>
            )}
        </Card.Group>
    )
}

export default ShowCards