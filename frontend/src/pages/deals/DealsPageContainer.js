import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DealsPage from './DealsPage';
import { getCars, fetchSearchResults } from '../../redux/modules/search/actions/searchActions';
import { getApiCallState } from '../../api/reducer/apiReducer';

class DealsPageContainer extends Component {
  render() {
    const { apiCallState, searchResults, location } = this.props;

    return (
      <DealsPage
        searchResults={searchResults}
        apiCallState={apiCallState}
        location={location}
        fetchSearchResults={this.props.fetchSearchResults}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchSearchResults,
  },
  dispatch,
);

const mapStateToProps = (state) => {
  const searchResults = getCars(state);
  const apiCallState = getApiCallState(state);
  return {
    searchResults,
    apiCallState,
  };
};

DealsPageContainer.propTypes = {
  fetchSearchResults: PropTypes.func.isRequired,
  searchResults: PropTypes.shape({
    cars: PropTypes.array,
    errorObject: PropTypes.object,
  }).isRequired,
  apiCallState: PropTypes.shape({
    success: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.bool,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DealsPageContainer);
