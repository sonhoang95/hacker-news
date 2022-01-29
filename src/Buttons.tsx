import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
  const { isLoading, page, nbPages, nextPage, prevPage } = useGlobalContext();
  return (
    <div className="btn-container">
      <button disabled={isLoading} onClick={() => prevPage('prev')}>
        prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button disabled={isLoading} onClick={() => nextPage('next')}>
        next
      </button>
    </div>
  );
};

export default Buttons;
