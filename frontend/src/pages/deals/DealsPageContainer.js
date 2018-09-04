import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DealsPage from './DealsPage';
import { getCars } from '../home/actions/searchActions';
import { getApiCallState } from '../../api/reducer/apiReducer';

class DealsPageContainer extends Component {
  render() {
    const { apiCallState, searchResults } = this.props;

    return <DealsPage searchResults={searchResults} apiCallState={apiCallState} />;
  }
}

const mapStateToProps = (state) => {
  const searchResults = getCars(state);
  const apiCallState = getApiCallState(state);
  return {
    searchResults,
    apiCallState,
  };
};

DealsPageContainer.propTypes = {
  searchResults: PropTypes.shape({
    cars: PropTypes.array,
    errorObject: PropTypes.object,
  }).isRequired,
  apiCallState: PropTypes.shape({
    success: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps)(DealsPageContainer);
