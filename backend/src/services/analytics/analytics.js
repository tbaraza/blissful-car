const computePageCounts = (visitorsData) => {
  /** get the total number of users on each page of our site
   * sample data in pageCounts object:
   * { "/": 13, "/about": 5 }
   */

  const pageCounts = {};
  /**
   * for..in loops iterate over the entire prototype chain, which is virtually never what you want.
   * Use Object.{keys,values,entries}, and iterate over the resulting array
   */
  const socketIDs = Object.keys(visitorsData);
  for (let id = 0; id < socketIDs.length; id++) {
    const { page } = visitorsData[socketIDs[id]];
    if (page in pageCounts) {
      pageCounts[page] += 1;
    } else {
      pageCounts[page] = 1;
    }
  }
  return pageCounts;
};

const computeRefererCounts = (visitorsData) => {
  /** get the total number of users per referring site
   * sample data in referrerCounts object:
   * { "/": 3, "/deals": 6 }
   */
  const referrerCounts = {};
  const socketIDs = Object.keys(visitorsData);
  for (let id = 0; id < socketIDs.length; id++) {
    const { referringSite } = visitorsData[socketIDs[id]] || 'direct';
    if (referringSite in referrerCounts) {
      referrerCounts[referringSite] += 1;
    } else {
      referrerCounts[referringSite] = 1;
    }
  }
  return referrerCounts;
};

const getActiveUsers = visitorsData => Object.keys(visitorsData).length;

// get the total number of searches made on our site
const getSearches = searchData => ({ searches: Object.keys(searchData).length });

module.exports = {
  computePageStats(visitorsData) {
    const stats = {
      pages: computePageCounts(visitorsData),
      referrers: computeRefererCounts(visitorsData),
      activeUsers: getActiveUsers(visitorsData)
    };

    return stats;
  },

  computeSearchStats(searchData) {
    return getSearches(searchData);
  }
};
