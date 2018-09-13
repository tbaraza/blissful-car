/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import App from './App';

// React 16 Enzyme adapter

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({});

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(
    <Provider store={store}>
      <App />
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
