import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import DealsPage from '../DealsPage';
import DealsPageContainer from '../DealsPageContainer';

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
  searchResults: {
    cars: [],
  },
  location: {
    state: {
      values: {},
    },
  },
};

// beforeEach(() => {
//   // creates the store with any initial state or middleware needed
//   const store = mockStore(props);
//   wrapper = shallow(<DealsPageContainer store={store} />);
// });

describe('<DealsPage/>', () => {
  it('renders correctly', () => {
    // const component = wrapper.dive();
    wrapper = shallow(<DealsPage {...props} />);
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // describe('onClick()', () => {
  //   it('successfully calls the onClick handler', () => {
  //     const mockOnClick = jest.fn();
  //     const component = mount(<DealsPage onSubmit={mockOnClick} {...props} />);
  //     // component = component.dive();
  //     console.log(component.debug());
  //     component.find('Form').simulate('click');

  //     expect(mockOnClick.mock.calls.length).toEqual(1);
  //   });
  // });
});
