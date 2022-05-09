import { render } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

// Função criada de acordo com a aula 14.3 do course
function renderWithRouter(component) {
  const history = createMemoryHistory();

  const returnFromRender = render(
    <Router history={history}>
      {component}
    </Router>,
  );

  return { history, returnFromRender }
}

export default renderWithRouter;
