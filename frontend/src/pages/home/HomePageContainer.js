/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomePage from './HomePage';
import { fetchSearchResults, getCars } from '../../redux/modules/search/actions/searchActions';
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

HomePageContainer.propTypes = {
  fetchSearchResults: PropTypes.func.isRequired,
  apiCallState: PropTypes.shape({
    success: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.bool,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePageContainer);
