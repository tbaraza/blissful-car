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
  const store = mockStore(props);
  wrapper = shallow(<HomePageContainer store={store} />);
});

describe('<HomePage/>', () => {
  it('renders correctly', () => {
    wrapper = shallow(<HomePage {...props} />);
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // describe('onClick()', () => {
  //   it('successfully calls the onClick handler', () => {
  //     const mockOnClick = jest.fn();
  //     const component = mount(<HomePage onSubmit={mockOnClick} {...props} />);
  //     // component = component.dive();
  //     component.find('Form').simulate('click');
  //     console.log(component.debug());

  //     expect(mockOnClick.mock.calls.length).toEqual(1);
  //   });
  // });
});
