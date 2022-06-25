import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './task-sheet.reducer';

export const TaskSheetDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const taskSheetEntity = useAppSelector(state => state.taskSheet.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="taskSheetDetailsHeading">
          <Translate contentKey="clicktickApp.taskSheet.detail.title">TaskSheet</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{taskSheetEntity.id}</dd>
          <dt>
            <span id="brand">
              <Translate contentKey="clicktickApp.taskSheet.brand">Brand</Translate>
            </span>
          </dt>
          <dd>{taskSheetEntity.brand}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="clicktickApp.taskSheet.name">Name</Translate>
            </span>
          </dt>
          <dd>{taskSheetEntity.name}</dd>
          <dt>
            <span id="comment">
              <Translate contentKey="clicktickApp.taskSheet.comment">Comment</Translate>
            </span>
          </dt>
          <dd>{taskSheetEntity.comment}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="clicktickApp.taskSheet.active">Active</Translate>
            </span>
          </dt>
          <dd>{taskSheetEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="completed">
              <Translate contentKey="clicktickApp.taskSheet.completed">Completed</Translate>
            </span>
          </dt>
          <dd>{taskSheetEntity.completed ? 'true' : 'false'}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="clicktickApp.taskSheet.date">Date</Translate>
            </span>
          </dt>
          <dd>{taskSheetEntity.date ? <TextFormat value={taskSheetEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="workMinutes">
              <Translate contentKey="clicktickApp.taskSheet.workMinutes">Work Minutes</Translate>
            </span>
          </dt>
          <dd>{taskSheetEntity.workMinutes}</dd>
          <dt>
            <span id="workPause">
              <Translate contentKey="clicktickApp.taskSheet.workPause">Work Pause</Translate>
            </span>
          </dt>
          <dd>{taskSheetEntity.workPause}</dd>
          <dt>
            <Translate contentKey="clicktickApp.taskSheet.owner">Owner</Translate>
          </dt>
          <dd>{taskSheetEntity.owner ? taskSheetEntity.owner.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/task-sheet" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task-sheet/${taskSheetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TaskSheetDetail;
