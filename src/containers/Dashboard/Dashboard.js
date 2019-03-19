import React from 'react'
import { Box, Flex } from 'noui/Position'
import ZoomCard from 'components/ZoomCard'
import { Header, Msg } from '../../ui/Text'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom'

function Dashboard(props) {
  return (
    <Box p={10}>
      <Flex
        flexDirection={[ 'column', 'row' ]}
        justifyContent={[ 'center', 'space-between' ]}
        alignItems="center"
      >
        <ZoomCard
          title="Rules"
          image="http://dnd.wizards.com/sites/default/files/media/styles/news_banner/public/images/news/Article_Header1.jpg"
          width={[ '90vw', '31vw' ]}
          my={[ 10, 0 ]}
          onClick={() => props.history.push('/help#the_rules')}
        />

        <ZoomCard
          title="Calendar"
          image="http://dnd.wizards.com/sites/default/files/media/styles/news_banner/public/images/news/Article_Header1.jpg"
          width={[ '90vw', '31vw' ]}
          my={[ 10, 0 ]}
          onClick={() => props.history.push('/calendar')}
        />

        <ZoomCard
          title="Map"
          image="https://cdna.artstation.com/p/assets/images/images/006/129/000/large/thomas-russell-01.jpg"
          width={[ '90vw', '31vw' ]}
          my={[ 10, 0 ]}
          onClick={() => alert('We are working on it!')}
        />
      </Flex>

      <Box pt={20}>
        <Box>
          <Header>WHAT IS D&D?</Header>
        </Box>

        <Msg>
          New to the world of Dungeons & Dragons? Here's the place to start. Take a closer look at this legendary
          fantasy role-playing game and find out why millions of players worldwide have stepped into the boots of
          mighty heroes (and sneaky antiheroes) to create their own stories.
        </Msg>
      </Box>

      <Box>
        <Button onClick={() => {
          localStorage.setItem('FIRST_PAGE', '/calendar')
          props.history.push('/calendar')
        }}
        >
          Do not show me this page again!
        </Button>
      </Box>
    </Box>
  )
}

export default withRouter(Dashboard)