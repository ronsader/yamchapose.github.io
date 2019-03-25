import {
  call,
  put,
  takeLeading,
  all,
  fork,
  select,
  delay
} from 'redux-saga/effects';
import { summonersGet } from './api';
import { sortSummoners, calculateSortingData } from './helpers';

const GET_ALL_SUMMONERS = 'GET_ALL_SUMMONERS';
const GET_ALL_SUMMONERS_SUCCESS = 'GET_ALL_SUMMONERS_SUCCESS';
const GET_ALL_SUMMONERS_FAILURE = 'GET_ALL_SUMMONERS_FAILURE';

const SORT_SUMMONERS_SUCCESS = 'SORT_SUMMONERS_SUCCESS';

const sortSummonersSuccessAction = ids => ({
  type: SORT_SUMMONERS_SUCCESS,
  payload: {
    ids
  }
});

export const getAllSummonersAction = () => ({
  type: GET_ALL_SUMMONERS
});

const getAllSummonersSuccessAction = (summonersById, summonerIds) => ({
  type: GET_ALL_SUMMONERS_SUCCESS,
  payload: {
    summonersById,
    summonerIds
  }
});

const getAllSummonersFailureAction = error => ({
  type: GET_ALL_SUMMONERS_FAILURE,
  payload: { error }
});

///////////////////////////////////////////////////////////////////////////////////////////////

const initialState = {
  isLoading: false,
  lastUpdated: null,
  summonersById: {},
  summonerIds: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUMMONERS:
      return {
        ...state,
        isLoading: true
      };

    case GET_ALL_SUMMONERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lastUpdated: new Date(),
        summonersById: action.payload.summonersById,
        summonerIds: action.payload.summonerIds
      };

    case GET_ALL_SUMMONERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };

    case SORT_SUMMONERS_SUCCESS:
      return {
        ...state,
        summonerIds: action.payload.ids
      };

    default:
      return state;
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

function* watchGetAllSummoners() {
  yield takeLeading(GET_ALL_SUMMONERS, getAllSummoners);
}

function* refreshAllSummoners() {
  while (true) {
    yield delay(60000);
    yield put(getAllSummonersAction());
  }
}

function* getAllSummoners() {
  let response = {};
  try {
    response = yield call(summonersGet);
  } catch (error) {
    console.log(error);
    yield put(getAllSummonersFailureAction(error));
  }
  yield fork(receiveResponseGetAllSummoners, response);
}

function* receiveResponseGetAllSummoners(response) {
  if (
    response &&
    response.data &&
    response.data.summonerIds &&
    response.data.summonersById
  ) {
    const {
      data: { summonerIds, summonersById }
    } = response;

    let newSummonersById = {};

    summonerIds.forEach(id => {
      let summoner = summonersById[id];
      const sortingData = calculateSortingData(summoner);
      summoner.sortingData = sortingData;

      newSummonersById[id] = summoner;
    });

    yield put(getAllSummonersSuccessAction(summonersById, summonerIds));

    yield fork(sortSummonersSaga);
  }
}

function* sortSummonersSaga() {
  const summonerIds = yield select(state => state.summonerIds);
  const summonersById = yield select(state => state.summonersById);
  let summoners = summonerIds.map(id => summonersById[id]);

  summoners.sort(sortSummoners);

  const sortedIds = summoners.map(summoner => summoner.summonerId);

  yield put(sortSummonersSuccessAction(sortedIds));
}

export function* rootSaga() {
  yield all([watchGetAllSummoners(), refreshAllSummoners()]);
}
