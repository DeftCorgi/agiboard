import {
  GET_BOARD,
  SHIFT_TASK,
  CREATE_LIST,
  CREATE_TASK,
  DELETE_LIST,
  SHIFT_LIST,
  CREATE_BOARD,
  DELETE_BOARD,
  RESET_VIEW_BOARD,
  RENAME_LIST,
  DELETE_TASK,
  RENAME_TASK,
  TAG_TASK
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      return state;

    case GET_BOARD:
      return action.payload;

    case DELETE_BOARD:
      return state;

    // Resets the state to empty object, better UX when switching between boards
    case RESET_VIEW_BOARD:
      return {};

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

    case RENAME_LIST:
      return {
        ...state,
        lists: [...action.payload]
      };

    case CREATE_LIST:
      return action.payload;

    case CREATE_TASK:
      return { ...state, lists: [...action.payload] };

    case DELETE_TASK:
      return { ...state, lists: [...action.payload] };

    case RENAME_TASK:
      return { ...state, lists: [...action.payload] };

    case TAG_TASK:
      return { ...state, lists: [...action.payload] };

    case DELETE_LIST:
      return { ...state, lists: [...action.payload] };
    default:
      return state;
  }
};
