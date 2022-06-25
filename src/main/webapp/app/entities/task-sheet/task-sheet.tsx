import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITaskSheet } from 'app/shared/model/task-sheet.model';
import { getEntities } from './task-sheet.reducer';

export const TaskSheet = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const taskSheetList = useAppSelector(state => state.taskSheet.entities);
  const loading = useAppSelector(state => state.taskSheet.loading);
  const totalItems = useAppSelector(state => state.taskSheet.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { match } = props;

  return (
    <div>
      <h2 id="task-sheet-heading" data-cy="TaskSheetHeading">
        <Translate contentKey="clicktickApp.taskSheet.home.title">Task Sheets</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="clicktickApp.taskSheet.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/task-sheet/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clicktickApp.taskSheet.home.createLabel">Create new Task Sheet</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {taskSheetList && taskSheetList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="clicktickApp.taskSheet.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('brand')}>
                  <Translate contentKey="clicktickApp.taskSheet.brand">Brand</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="clicktickApp.taskSheet.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('comment')}>
                  <Translate contentKey="clicktickApp.taskSheet.comment">Comment</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('active')}>
                  <Translate contentKey="clicktickApp.taskSheet.active">Active</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('completed')}>
                  <Translate contentKey="clicktickApp.taskSheet.completed">Completed</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('date')}>
                  <Translate contentKey="clicktickApp.taskSheet.date">Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('workMinutes')}>
                  <Translate contentKey="clicktickApp.taskSheet.workMinutes">Work Minutes</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('workPause')}>
                  <Translate contentKey="clicktickApp.taskSheet.workPause">Work Pause</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="clicktickApp.taskSheet.owner">Owner</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {taskSheetList.map((taskSheet, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/task-sheet/${taskSheet.id}`} color="link" size="sm">
                      {taskSheet.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`clicktickApp.TaskSheetTypeEnum.${taskSheet.brand}`} />
                  </td>
                  <td>{taskSheet.name}</td>
                  <td>{taskSheet.comment}</td>
                  <td>{taskSheet.active ? 'true' : 'false'}</td>
                  <td>{taskSheet.completed ? 'true' : 'false'}</td>
                  <td>{taskSheet.date ? <TextFormat type="date" value={taskSheet.date} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{taskSheet.workMinutes}</td>
                  <td>{taskSheet.workPause}</td>
                  <td>{taskSheet.owner ? <Link to={`/customer/${taskSheet.owner.id}`}>{taskSheet.owner.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/task-sheet/${taskSheet.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/task-sheet/${taskSheet.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/task-sheet/${taskSheet.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="clicktickApp.taskSheet.home.notFound">No Task Sheets found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={taskSheetList && taskSheetList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default TaskSheet;
