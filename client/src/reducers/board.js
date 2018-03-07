import {
  GET_BOARD,
  SHIFT_TASK,
  CREATE_LIST,
  CREATE_TASK,
  DELETE_LIST,
  SHIFT_LIST,
  CREATE_BOARD
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      return state;
    case GET_BOARD:
      return action.payload;

    case SHIFT_TASK:
      return {
        ...state,
        lists: [...action.payload]
      };
    case SHIFT_LIST:
      return {
        ...state,
        lists: [...action.payload]
      };

    case CREATE_LIST:
      return action.payload;
    case CREATE_TASK:
      return { ...state, lists: [...action.payload] };
    case DELETE_LIST:
      return { ...state, lists: [...action.payload] };
    default:
      return state;
  }
};
