import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../../redux/store/createStore';
import HomePage from '../HomePage';
import HomePageContainer from '../HomePageContainer';

Enzyme.configure({ adapter: new Adapter() });
let wrapper;
const { store } = configureStore();
const props = {
  fetchSearchResults: jest.fn(),
  apiCallState: {
    loading: false,
    error: false,
    success: false,
  },
};

describe('<HomePage/>', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HomePage {...props} />);
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<HomePageContainer', () => {
  it('renders HomePageContainer correctly', () => {
    wrapper = shallow(<HomePageContainer store={store} {...props} />);

    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
