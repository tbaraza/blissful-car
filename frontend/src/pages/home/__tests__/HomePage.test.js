import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import HomePage from '../HomePage';
import HomePageContainer from '../HomePageContainer';

Enzyme.configure({ adapter: new Adapter() });
let wrapper;
let store;
const mockStore = configureMockStore();
const props = {
  fetchSearchResults: jest.fn(),
  apiCallState: {
    loading: false,
    error: false,
    success: false,
  },
};

beforeEach(() => {
  // creates the store with any initial state or middleware needed
  store = mockStore({});
  wrapper = shallow(<HomePageContainer store={store} />);
});

describe('<HomePage/>', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HomePage {...props} />);
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
