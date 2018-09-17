import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../../redux/store/createStore';
import DealsPage from '../DealsPage';
import DealsPageContainer from '../DealsPageContainer';

const { store } = configureStore();

Enzyme.configure({ adapter: new Adapter() });
let wrapper;
// const mockStore = configureMockStore({});
const props = {
  fetchSearchResults: jest.fn(),
  apiCallState: {
    loading: false,
    error: false,
    success: false,
  },
  searchResults: {
    cars: [
      {
        passengers: [1, 2, 3, 4, 5],
        insurance: 'good',
        bestFuel: 'yes',
        model: 'Mercedes',
        color: 'blue',
      },
    ],
  },
  location: {
    state: {
      values: {},
    },
  },
};

describe('<DealsPage/>', () => {
  it('renders correctly', () => {
    wrapper = shallow(<DealsPage {...props} />);
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders search results correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(<DealsPage onChange={onChange} {...props} />);
    const firstPlayer = wrapper
      .find('div.search-results')
      .children()
      .first()
      .text();
    expect(firstPlayer).toEqual(
      'Best deals Passengers:12345Insurance:goodBest fuel option:yesColor:blueModel:Mercedes',
    );
    wrapper.unmount();
  });
});

describe('<DealPageContainer', () => {
  it('renders DealsPageContainer correctly', () => {
    wrapper = shallow(<DealsPageContainer store={store} {...props} />);

    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
