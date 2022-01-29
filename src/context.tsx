import React, { useEffect, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import { ReducerActionType } from './reducer';

const API = 'https://hn.algolia.com/api/v1/search?';

export interface Story {
  objectID: number;
  title: string;
  num_comments: number;
  url: string;
  points: number;
  author: string;
}

interface GlobalContext {
  isLoading: boolean;
  hits: Story[];
  query: string;
  page: number;
  nbPages: number;
  removeStory: (id: number) => void;
  handleSearch: (query: string) => void;
  nextPage: (value: string) => void;
  prevPage: (value: string) => void;
}

interface AppProviderProps {
  children: React.ReactNode;
}

const initialState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
};

export const AppContext = React.createContext({} as GlobalContext);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url: string) => {
    dispatch({ type: ReducerActionType.SET_LOADING });
    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({
        type: ReducerActionType.SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStories(`${API}query=${state.query}&page=${state.page}`);
  }, [state.page, state.query]);

  const removeStory = (id: number) => {
    dispatch({ type: ReducerActionType.REMOVE_STORY, payload: id });
  };

  const handleSearch = (query: string) => {
    dispatch({ type: ReducerActionType.HANDLE_SEARCH, payload: query });
  };

  const nextPage = (value: string) => {
    dispatch({ type: ReducerActionType.HANDLE_NEXT_PAGE, payload: value });
  };

  const prevPage = (value: string) => {
    dispatch({ type: ReducerActionType.HANDLE_PREV_PAGE, payload: value });
  };
  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, nextPage, prevPage }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
