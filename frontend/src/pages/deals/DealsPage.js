import React, { Component } from 'react';
import { Card, Icon, Tooltip } from 'antd';
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
    const { cars } = this.props.searchResults;
    return (
      <div className="searchResultsContainer">
        <p>
          Best deals
          {' '}
          <Tooltip title="Best deal based on price, insurance and fuel option" placement="topRight">
            <Icon type="info-circle" />
          </Tooltip>
        </p>
        <div className="carCards">{this.renderResults(cars)}</div>
      </div>
    );
  }
}

export default DealsPage;
