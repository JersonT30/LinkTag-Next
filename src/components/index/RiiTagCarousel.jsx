import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'react-bootstrap'
import LanguageContext from '../shared/LanguageContext'
import LocalizedString from '../shared/LocalizedString'

function LinkTagCarousel ({ randomUsers }) {
  return (
    <LanguageContext.Helper.Consumer>
      {(lang) => (
        <Carousel variant='light' fade>
          {randomUsers.map((randomUser) => (
            <Carousel.Item key={randomUser.username}>
              <img
                className='d-block w-75 mx-auto mt-2'
                alt={`LinkTag of ${randomUser.display_name}`}
                src={`/${randomUser.username}/tag.max.png?${new Date(
                  randomUser.updated_at
                ).getTime()}`}
              />
              <Carousel.Caption className='mb-3 text-light'>
                <p className='h4'>
                  <LocalizedString string='carasol_LinkTag' values={[
                    randomUser.username,
                    randomUser.display_name
                  ]} />
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </LanguageContext.Helper.Consumer>
  )
}

LinkTagCarousel.propTypes = {
  randomUsers: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default LinkTagCarousel
