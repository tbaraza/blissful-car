import React, { Component } from 'react';
import {
  Card, Icon, Tooltip, Menu, Checkbox,
} from 'antd';
import PropTypes from 'prop-types';
import './DealsPage.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const CheckboxGroup = Checkbox.Group;

const passengers = ['1', '2', '3', '4'];
const insuranceOptions = ['basic', 'good', 'premium'];
const bestFuel = ['no', 'yes'];
const models = ['Volkswagen', 'Porsche', 'Subaru', 'Mercedes', 'Ford'];
const colors = ['red', 'green', 'yellow', 'white'];

class DealsPage extends Component {
  renderResults = results => results.map((result, index) => (
    <Card bordered={false} key={index} className="car-info">
      <p>
          Passengers:
        {result.passengers}
      </p>
      <p>
          Insurance:
        {result.insurance}
      </p>
      <p>
          Best fuel option:
        {result.bestFuel}
      </p>
    </Card>
  ));

  onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  render() {
    const { searchResults, location } = this.props;
    const { values } = location.state;
    return (
      <div className="search-results-container">
        <div>
          <Menu
            onClick={this.handleClick}
            style={{ width: 256, height: '100%' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <SubMenu
              key="sub1"
              title={(
                <span>
                  <Icon type="mail" />
                  <span>Passengers</span>
                </span>
              )}
            >
              <CheckboxGroup
                className="colors-checkbox"
                options={passengers}
                defaultValue={[values.passengers]}
                onChange={this.onChange}
              />
            </SubMenu>
            <SubMenu
              key="sub2"
              title={(
                <span>
                  <Icon type="mail" />
                  <span>Model</span>
                </span>
              )}
            >
              <CheckboxGroup
                className="colors-checkbox"
                options={models}
                defaultValue={[values.model]}
                onChange={this.onChange}
              />
            </SubMenu>
            <SubMenu
              key="sub3"
              title={(
                <span>
                  <Icon type="mail" />
                  <span>Colors</span>
                </span>
              )}
            >
              <CheckboxGroup
                className="colors-checkbox"
                options={colors}
                defaultValue={[values.color]}
                onChange={this.onChange}
              />
            </SubMenu>
            <SubMenu
              key="sub4"
              title={(
                <span>
                  <Icon type="appstore" />
                  <span>Insurance</span>
                </span>
              )}
            >
              <CheckboxGroup
                className="colors-checkbox"
                options={insuranceOptions}
                defaultValue={[values.insurance]}
                onChange={this.onChange}
              />
            </SubMenu>
            <SubMenu
              key="sub5"
              title={(
                <span>
                  <Icon type="setting" />
                  <span>Best Fuel</span>
                </span>
              )}
            >
              <CheckboxGroup
                className="colors-checkbox"
                options={bestFuel}
                defaultValue={[values.bestFuel]}
                onChange={this.onChange}
              />
            </SubMenu>
          </Menu>
        </div>
        <div className="search-results">
          <div className="recommended-results-container">
            <p className="best-deal">
              Best deals
              {' '}
              <Tooltip
                title="Best deal based on price, insurance and fuel option"
                placement="topRight"
              >
                <Icon type="info-circle" />
              </Tooltip>
            </p>
            <div className="car-cards">{this.renderResults(searchResults.cars).slice(0, 2)}</div>
          </div>
          <div className="other-search-results">
            <div className="car-cards">{this.renderResults(searchResults.cars).slice(2)}</div>
          </div>
        </div>
      </div>
    );
  }
}

DealsPage.propTypes = {
  searchResults: PropTypes.shape({
    cars: PropTypes.array,
    errorObject: PropTypes.object,
  }).isRequired,
};

export default DealsPage;
