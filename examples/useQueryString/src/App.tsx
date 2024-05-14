import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useQueryString } from '../../../src/hooks/useQueryString'

const DemoComponent = () => {
  const [queryParams, setQueryString] = useQueryString({ per_page: 10, page: 1 });

  return (
    <div>
      <h1>Current Query Params</h1>
      <pre>{JSON.stringify(queryParams, null, 2)}</pre>
      <button onClick={() => setQueryString({ per_page: 20 })}>
        Set Per Page to 20
      </button>
    </div>
  );
};

const App = () => (
  <Router>
    <DemoComponent />
  </Router>
);

export default App;
