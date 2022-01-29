/* eslint-disable no-fallthrough */
import { Story } from './context';

export enum ReducerActionType {
  SET_LOADING = 'SET_LOADING',
  SET_STORIES = 'SET_STORIES',
  REMOVE_STORY = 'REMOVE_STORY',
  HANDLE_SEARCH = 'HANDLE_SEARCH',
  HANDLE_NEXT_PAGE = 'HANDLE_NEXT_PAGE',
  HANDLE_PREV_PAGE = 'HANDLE_PREV_PAGE',
}

interface State {
  isLoading: boolean;
  hits: Story[];
  query: string;
  page: number;
  nbPages: number;
}

interface Action {
  type: ReducerActionType;
  payload?: any;
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ReducerActionType.SET_LOADING:
      return { ...state, isLoading: true };

    case ReducerActionType.SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload?.hits,
        nbPages: action.payload?.nbPages,
      };

    case ReducerActionType.REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter(story => story.objectID !== action.payload),
      };

    case ReducerActionType.HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
        page: 0,
      };

    case ReducerActionType.HANDLE_NEXT_PAGE:
      let nextPage = state.page + 1;
      if (action.payload === 'next') {
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
      }
      return { ...state, page: nextPage };

    case ReducerActionType.HANDLE_PREV_PAGE:
      let prevPage = state.page - 1;
      if (action.payload === 'prev') {
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
      }
      return { ...state, page: prevPage };

    default:
      throw new Error(`no matching ${action.type} action type`);
  }
};
