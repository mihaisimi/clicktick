import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { ITaskSheet } from 'app/shared/model/task-sheet.model';
import { TaskSheetTypeEnum } from 'app/shared/model/enumerations/task-sheet-type-enum.model';
import { getEntity, updateEntity, createEntity, reset } from './task-sheet.reducer';

export const TaskSheetUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const customers = useAppSelector(state => state.customer.entities);
  const taskSheetEntity = useAppSelector(state => state.taskSheet.entity);
  const loading = useAppSelector(state => state.taskSheet.loading);
  const updating = useAppSelector(state => state.taskSheet.updating);
  const updateSuccess = useAppSelector(state => state.taskSheet.updateSuccess);
  const taskSheetTypeEnumValues = Object.keys(TaskSheetTypeEnum);
  const handleClose = () => {
    props.history.push('/task-sheet' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCustomers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.date = convertDateTimeToServer(values.date);

    const entity = {
      ...taskSheetEntity,
      ...values,
      owner: customers.find(it => it.id.toString() === values.owner.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          date: displayDefaultDateTime(),
        }
      : {
          brand: 'REGULAR',
          ...taskSheetEntity,
          date: convertDateTimeFromServer(taskSheetEntity.date),
          owner: taskSheetEntity?.owner?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="clicktickApp.taskSheet.home.createOrEditLabel" data-cy="TaskSheetCreateUpdateHeading">
            <Translate contentKey="clicktickApp.taskSheet.home.createOrEditLabel">Create or edit a TaskSheet</Translate>
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
                  id="task-sheet-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('clicktickApp.taskSheet.brand')}
                id="task-sheet-brand"
                name="brand"
                data-cy="brand"
                type="select"
              >
                {taskSheetTypeEnumValues.map(taskSheetTypeEnum => (
                  <option value={taskSheetTypeEnum} key={taskSheetTypeEnum}>
                    {translate('clicktickApp.TaskSheetTypeEnum.' + taskSheetTypeEnum)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('clicktickApp.taskSheet.name')}
                id="task-sheet-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                label={translate('clicktickApp.taskSheet.comment')}
                id="task-sheet-comment"
                name="comment"
                data-cy="comment"
                type="text"
              />
              <ValidatedField
                label={translate('clicktickApp.taskSheet.active')}
                id="task-sheet-active"
                name="active"
                data-cy="active"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('clicktickApp.taskSheet.completed')}
                id="task-sheet-completed"
                name="completed"
                data-cy="completed"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('clicktickApp.taskSheet.date')}
                id="task-sheet-date"
                name="date"
                data-cy="date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('clicktickApp.taskSheet.workMinutes')}
                id="task-sheet-workMinutes"
                name="workMinutes"
                data-cy="workMinutes"
                type="text"
              />
              <ValidatedField
                label={translate('clicktickApp.taskSheet.workPause')}
                id="task-sheet-workPause"
                name="workPause"
                data-cy="workPause"
                type="text"
              />
              <ValidatedField
                id="task-sheet-owner"
                name="owner"
                data-cy="owner"
                label={translate('clicktickApp.taskSheet.owner')}
                type="select"
              >
                <option value="" key="0" />
                {customers
                  ? customers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/task-sheet" replace color="info">
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

export default TaskSheetUpdate;
