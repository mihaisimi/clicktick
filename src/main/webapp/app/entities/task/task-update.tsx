import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITaskSheet } from 'app/shared/model/task-sheet.model';
import { getEntities as getTaskSheets } from 'app/entities/task-sheet/task-sheet.reducer';
import { ITask } from 'app/shared/model/task.model';
import { TaskStateEnum } from 'app/shared/model/enumerations/task-state-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './task.reducer';

export const TaskUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const taskSheets = useAppSelector(state => state.taskSheet.entities);
  const taskEntity = useAppSelector(state => state.task.entity);
  const loading = useAppSelector(state => state.task.loading);
  const updating = useAppSelector(state => state.task.updating);
  const updateSuccess = useAppSelector(state => state.task.updateSuccess);
  const taskStateEnumValues = Object.keys(TaskStateEnum);
  const handleClose = () => {
    props.history.push('/task' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getTaskSheets({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...taskEntity,
      ...values,
      taskSheet: taskSheets.find(it => it.id.toString() === values.taskSheet.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          state: 'TODO',
          ...taskEntity,
          taskSheet: taskEntity?.taskSheet?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="clicktickApp.task.home.createOrEditLabel" data-cy="TaskCreateUpdateHeading">
            <Translate contentKey="clicktickApp.task.home.createOrEditLabel">Create or edit a Task</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="task-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('clicktickApp.task.state')} id="task-state" name="state" data-cy="state" type="select">
                {taskStateEnumValues.map(taskStateEnum => (
                  <option value={taskStateEnum} key={taskStateEnum}>
                    {translate('clicktickApp.TaskStateEnum.' + taskStateEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label={translate('clicktickApp.task.name')} id="task-name" name="name" data-cy="name" type="text" />
              <ValidatedField
                label={translate('clicktickApp.task.description')}
                id="task-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('clicktickApp.task.externalId')}
                id="task-externalId"
                name="externalId"
                data-cy="externalId"
                type="text"
              />
              <ValidatedField
                id="task-taskSheet"
                name="taskSheet"
                data-cy="taskSheet"
                label={translate('clicktickApp.task.taskSheet')}
                type="select"
              >
                <option value="" key="0" />
                {taskSheets
                  ? taskSheets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/task" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TaskUpdate;
