import React from 'react'
import PropTypes from 'prop-types'
import { createOptionNodes } from '@/lib/utils/utils'
import { COVER_REGIONS } from '@/lib/constants/forms/coverRegions'
import { COVER_TYPES } from '@/lib/constants/forms/coverTypes'
import { Card, Col, Form, Row } from 'react-bootstrap'
import LocalizedString from '../shared/LocalizedString'
import LanguageContext from '../shared/LanguageContext'

const coverRegions = createOptionNodes(COVER_REGIONS)
const coverTypes = createOptionNodes(COVER_TYPES)

function GeneralCard ({ values, errors, handleChange }) {
  return (
    <Card className='mb-3' bg='secondary' text='white'>
      <Card.Header as='h5'><LocalizedString string='general' values={[]} /></Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label><LocalizedString string='display_name' /></Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Nickname'
                name='nameOnRiiTag'
                onChange={handleChange}
                value={values.nameOnRiiTag}
                isInvalid={!!errors.nameOnRiiTag}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.nameOnRiiTag}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='comment'>
              <Form.Label><LocalizedString string='friend_code' /></Form.Label>
              <Form.Control
                type='text'
                placeholder='Comment / Friend Code'
                name='comment'
                onChange={handleChange}
                value={values.comment}
                isInvalid={!!errors.comment}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.comment}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='coverType'>
              <Form.Label><LocalizedString string='cover_type' /></Form.Label>
              <Form.Select
                required
                placeholder='Cover Type'
                name='coverType'
                onChange={handleChange}
                value={values.coverType}
                isInvalid={!!errors.coverType}
              >
                {coverTypes}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                {errors.coverType}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='coverRegion'>
              <Form.Label><LocalizedString string='cover_region' /></Form.Label>
              <Form.Select
                required
                placeholder='Cover Region'
                name='coverRegion'
                onChange={handleChange}
                value={values.coverRegion}
                isInvalid={!!errors.coverRegion}
              >
                {coverRegions}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                {errors.coverRegion}
              </Form.Control.Feedback>
              <Form.Text className='text-muted'>
                <LocalizedString string='cover_region_explanation' values={[]} />
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <LanguageContext.Helper.Consumer>
          {(lang) => (
            <Row>
              <Col md={6}>
                <Form.Group controlId='showAvatar'>
                  <Form.Check
                    type='checkbox'
                    label={LanguageContext.languages[lang].show_avatar}
                    name='showAvatar'
                    onChange={handleChange}
                    checked={values.showAvatar}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId='showMii'>
                  <Form.Check
                    type='checkbox'
                    label='Show your Mii'
                    name='showMii'
                    onChange={handleChange}
                    checked={values.showMii}
                  />
                  <Form.Text className='text-muted'>
                    You can edit it your Mii on the &quot;
                    <a
                      href='/mii'
                      target='_blank'
                      title="Open 'Edit Mii' page in a new tab"
                    >
                      Edit Mii
                    </a>
                    &quot; page.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          )}
        </LanguageContext.Helper.Consumer>
      </Card.Body>
    </Card>
  )
}

GeneralCard.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default GeneralCard
