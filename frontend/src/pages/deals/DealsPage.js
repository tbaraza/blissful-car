import React, { Component } from 'react';
import {
  Card, Icon, Tooltip, Menu, Checkbox,
} from 'antd';
import PropTypes from 'prop-types';
import './DealsPage.css';

const { SubMenu } = Menu;
const CheckboxGroup = Checkbox.Group;
const passengersOptions = ['1', '2', '3', '4'];
const insuranceOptions = ['basic', 'good', 'premium'];
const bestFuelOptions = ['no', 'yes'];
const modelsOptions = ['Volkswagen', 'Porsche', 'Subaru', 'Mercedes', 'Ford'];
const colorsOptions = ['red', 'green', 'yellow', 'white', 'blue'];
class DealsPage extends Component {
  constructor(props) {
    super(props);
    const { values } = this.props.location.state;

    this.state = {
      passengers: [values.passengers],
      model: values.model === 'any' ? modelsOptions : [values.model],
      color: values.color === 'any' ? colorsOptions : [values.color],
      insurance: [values.insurance],
      bestFuel: [values.bestFuel],
      indeterminate: values.color !== 'any',
      checkAll: values.color === 'any',
      modelIndeterminate: values.model !== 'any',
      modelCheckAll: values.model === 'any',
    };
  }

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
      <p>
          Color:
        {result.color}
      </p>
      <p>
          Model:
        {result.model}
      </p>
    </Card>
  ));

  onChange = (checkedValues) => {
    const {
      model, color, insurance, bestFuel,
    } = this.state;
    const { fetchSearchResults } = this.props;
    const filter = {
      passengers: checkedValues.join(','),
      model: model.join(','),
      color: color.join(','),
      insurance: insurance.join(','),
      bestFuel: bestFuel.join(','),
    };
    fetchSearchResults(filter);
    this.setState({
      passengers: checkedValues,
    });
  };

  modelOnChange = (checkedValues) => {
    const {
      passengers, color, insurance, bestFuel,
    } = this.state;
    const filter = {
      passengers: passengers.join(','),
      model: checkedValues.join(','),
      color: color.join(','),
      insurance: insurance.join(','),
      bestFuel: bestFuel.join(','),
    };
    this.props.fetchSearchResults(filter);

    this.setState({
      model: checkedValues,
      indeterminate: !!checkedValues.length && checkedValues.length < modelsOptions.length,
      checkAll: checkedValues.length === modelsOptions.length,
    });
  };

  colorOnChange = (checkedValues) => {
    const {
      passengers, model, insurance, bestFuel,
    } = this.state;

    const filter = {
      passengers: passengers.join(','),
      model: model.join(','),
      color: checkedValues.join(','),
      insurance: insurance.join(','),
      bestFuel: bestFuel.join(','),
    };
    this.props.fetchSearchResults(filter);

    this.setState({
      color: checkedValues,
      indeterminate: !!checkedValues.length && checkedValues.length < colorsOptions.length,
      checkAll: checkedValues.length === colorsOptions.length,
    });
  };

  insuranceOnChange = (checkedValues) => {
    const {
      passengers, color, model, bestFuel,
    } = this.state;
    const filter = {
      passengers: passengers.join(','),
      model: model.join(','),
      color: color.join(','),
      insurance: checkedValues.join(','),
      bestFuel: bestFuel.join(','),
    };
    this.props.fetchSearchResults(filter);

    this.setState({
      insurance: checkedValues,
    });
  };

  bestFueleOnChange = (checkedValues) => {
    const {
      passengers, color, insurance, model,
    } = this.state;
    const filter = {
      passengers: passengers.join(','),
      model: model.join(','),
      color: color.join(','),
      insurance: insurance.join(','),
      bestFuel: checkedValues.join(','),
    };
    this.props.fetchSearchResults(filter);

    this.setState({
      bestFuel: checkedValues,
    });
  };

  onCheckAllChange = (e) => {
    this.setState({
      color: e.target.checked ? colorsOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
    const {
      passengers, model, insurance, bestFuel,
    } = this.state;

    if (e.target.checked) {
      const filter = {
        passengers: passengers.join(','),
        model: model.join(','),
        color: colorsOptions,
        insurance: insurance.join(','),
        bestFuel: bestFuel.join(','),
      };
      this.props.fetchSearchResults(filter);
    }
  };

  onModelCheckAllChange = (e) => {
    this.setState({
      model: e.target.checked ? modelsOptions : [],
      indeterminate: false,
      modelCheckAll: e.target.checked,
    });

    if (e.target.checked) {
      const {
        passengers, color, insurance, bestFuel,
      } = this.state;
      const filter = {
        passengers: passengers.join(','),
        model: modelsOptions,
        color: color.join(','),
        insurance: insurance.join(','),
        bestFuel: bestFuel.join(','),
      };
      this.props.fetchSearchResults(filter);
    }
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
                className="search-checkbox"
                options={passengersOptions}
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
              <Checkbox
                className="search-checkbox"
                indeterminate={this.state.modelIndeterminate}
                onChange={this.onModelCheckAllChange}
                checked={this.state.modelCheckAll}
              >
                Check all
              </Checkbox>
              <CheckboxGroup
                className="search-checkbox"
                options={modelsOptions}
                defaultValue={[values.model]}
                onChange={this.modelOnChange}
                value={this.state.model}
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
              <Checkbox
                className="search-checkbox"
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
              >
                Check all
              </Checkbox>
              <CheckboxGroup
                className="search-checkbox"
                options={colorsOptions}
                defaultValue={[values.color]}
                onChange={this.colorOnChange}
                value={this.state.color}
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
                className="search-checkbox"
                options={insuranceOptions}
                defaultValue={[values.insurance]}
                onChange={this.insuranceOnChange}
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
                className="search-checkbox"
                options={bestFuelOptions}
                defaultValue={[values.bestFuel]}
                onChange={this.bestFueleOnChange}
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
