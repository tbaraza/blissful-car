import React, { Component } from 'react';
import { Card, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import './DealsPage.css';

class DealsPage extends Component {
  renderResults = results => results.map((result, index) => (
    <Card bordered={false} key={index} className="carInfo">
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

  render() {
    const { searchResults } = this.props;
    return (
      <div className="searchResultsContainer">
        <p>
          Best deals
          {' '}
          <Tooltip title="Best deal based on price, insurance and fuel option" placement="topRight">
            <Icon type="info-circle" />
          </Tooltip>
        </p>
        <div className="carCards">{this.renderResults(searchResults.cars)}</div>
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
