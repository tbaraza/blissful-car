import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DashboardPage from '../DashboardPage';

Enzyme.configure({ adapter: new Adapter() });
let wrapper;
describe('<DashboardPage/>', () => {
  it('renders correctly', () => {
    wrapper = shallow(<DashboardPage />);
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
