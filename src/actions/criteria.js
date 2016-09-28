// Middleware
import { default as apiGetCriteria } from '../middleware/getCriteria.mock.js';
import { default as apiDeleteCriteria } from '../middleware/criteria/deleteCriteria.mock.js';
import { default as apiAddCriteria } from '../middleware/criteria/addCriteria.mock.js';
import { default as apiSaveCriteria } from '../middleware/criteria/saveCriteria.mock.js';
import { default as apiError } from './error.js';

export const ADD_CRITERIA = '/criteria/ADD_CRITERIA';
export const SAVE_CRITERIA = '/criteria/SAVE_CRITERIA';
export const DELETE_CRITERIA = '/criteria/DELETE_CRITERIA';
export const SET_CRITERIA = '/criteria/SET_CRITERIA';
export const SET_CRITERIA_VALUE = '/criteria/SET_CRITERIA_VALUE';
export const REQUEST_CRITERIA = '/criteria/REQUEST_CRITERIA';
export const RECEIVE_CRITERIA = '/criteria/RECEIVE_CRITERIA';

const requestData = () => ({
  type: REQUEST_CRITERIA,
  fetched: false,
});

const receiveData = data => ({
  type: RECEIVE_CRITERIA,
  ...data,
  fetched: true,
});

const shouldFetchData = (state) => {
  if (!state.criteria || state.relaod) {
    return true;
  }
  return !state.criteria.isFetching && !state.criteria.fetched;
};


export const fetchCriteria = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    apiGetCriteria((data) => {
      dispatch(receiveData(data));
    });
  }
};

export const deleteCriteria = criteria => (dispatch, getState) => {
  const state = getState();
  const categories = (state.criteria ? state.criteria.categories : [])
    .map(category => ({
      ...category,
      criterias: (category.criterias ? category.criterias.filter(crit =>
        crit.id !== criteria.id) : []),
    }));

  apiDeleteCriteria(criteria.id, (err) => {
    if (err) dispatch(apiError(fetchCriteria));
  });

  dispatch({
    type: DELETE_CRITERIA,
    categories,
  });
};

export const setCriteria = (criteriaId, categoryId) => ({
  type: SET_CRITERIA,
  selectedCriteriaId: criteriaId,
  selectedCategoryId: categoryId,
});

export const addCriteria = addCategoryId => (dispatch, getState) => {
  const state = getState().criteria;

  if (state.selectedCategoryId === addCategoryId && state.selectedCriteriaId) {
    const category = state.categories.find(c =>
      c.id === addCategoryId && c.id === state.selectedCategoryId);

    if (category) {
      const newCriteriaIndex = category.selectCriterias.findIndex(crit =>
        crit.id === state.selectedCriteriaId);

      if (newCriteriaIndex > -1) {
        category.criterias.push(category.selectCriterias[newCriteriaIndex]);

        const categories = state.categories.map(cat =>
          (cat.id === category.id ?
          category : cat)
        );

        apiAddCriteria(state.selectedCriteriaId, (err) => {
          if (err) dispatch(apiError(fetchCriteria));
        });

        dispatch({
          type: ADD_CRITERIA,
          categories,
        });
      }
    }
  }
};

export const setCriteriaValue = (value, criteriaId, categoryId) => ({
  type: SET_CRITERIA_VALUE,
  changedCriteriaId: criteriaId,
  changedCateogryId: categoryId,
  changedValue: value,
});

export const saveCriteria = criteriaId => (dispatch, getState) => {
  const state = getState().criteria;

  if (state.changedValue && state.changedValue !== '' &&
    criteriaId === state.changedCriteriaId) {
    const categories = state.categories.map(cat => ({
      ...cat,
      criterias: cat.criterias.map(crit =>
        (crit.id === criteriaId ? {
          ...crit,
          label: state.changedValue,
        } : crit)
      ),
    }));

    apiSaveCriteria(state.changedValue, criteriaId, (err) => {
      if (err) dispatch(apiError(fetchCriteria));
    });

    dispatch({
      type: SAVE_CRITERIA,
      categories,
    });
  }
};
