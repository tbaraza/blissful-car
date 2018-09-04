import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import { fetchSearchResults, getCars } from './actions/searchActions';
import { getApiCallState } from '../../api/reducer/apiReducer';

class HomePageContainer extends Component {
  render() {
    const { apiCallState } = this.props;
    return (
      <HomePage fetchSearchResults={this.props.fetchSearchResults} apiCallState={apiCallState} />
    );
  }
}

const mapStateToProps = (state) => {
  const cars = getCars(state);
  const apiCallState = getApiCallState(state);
  return {
    cars,
    apiCallState,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchSearchResults,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePageContainer);
