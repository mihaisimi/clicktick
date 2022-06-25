import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './customer.reducer';

export const CustomerDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const customerEntity = useAppSelector(state => state.customer.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="customerDetailsHeading">
          <Translate contentKey="clicktickApp.customer.detail.title">Customer</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{customerEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="clicktickApp.customer.firstName">First Name</Translate>
            </span>
            <UncontrolledTooltip target="firstName">
              <Translate contentKey="clicktickApp.customer.help.firstName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="clicktickApp.customer.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="clicktickApp.customer.email">Email</Translate>
            </span>
          </dt>
          <dd>{customerEntity.email}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="clicktickApp.customer.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{customerEntity.phoneNumber}</dd>
          <dt>
            <span id="ewalletAmmount">
              <Translate contentKey="clicktickApp.customer.ewalletAmmount">Ewallet Ammount</Translate>
            </span>
          </dt>
          <dd>{customerEntity.ewalletAmmount}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="clicktickApp.customer.address">Address</Translate>
            </span>
          </dt>
          <dd>{customerEntity.address}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="clicktickApp.customer.city">City</Translate>
            </span>
          </dt>
          <dd>{customerEntity.city}</dd>
          <dt>
            <span id="countryCode">
              <Translate contentKey="clicktickApp.customer.countryCode">Country Code</Translate>
            </span>
          </dt>
          <dd>{customerEntity.countryCode}</dd>
          <dt>
            <Translate contentKey="clicktickApp.customer.user">User</Translate>
          </dt>
          <dd>{customerEntity.user ? customerEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CustomerDetail;
