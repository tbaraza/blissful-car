// get the total number of users on each page of our site
const computePageCounts = (visitorsData) => {
  // sample data in pageCounts object:
  // { "/": 13, "/about": 5 }
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

// get the total number of users per referring site
const computeRefererCounts = (visitorsData) => {
  // sample data in referrerCounts object:
  // { "http://twitter.com/": 3, "http://stackoverflow.com/": 6 }
  const referrerCounts = {};
  const socketIDs = Object.keys(visitorsData);
  for (let id = 0; id < socketIDs.length; id++) {
    const { referringSite } = visitorsData[socketIDs[id]] || '(direct)';
    if (referringSite in referrerCounts) {
      referrerCounts[referringSite] += 1;
    } else {
      referrerCounts[referringSite] = 1;
    }
  }
  return referrerCounts;
};

// get the total active users on our site
const getActiveUsers = visitorsData => Object.keys(visitorsData).length;

module.exports = (visitorsData) => {
  // wrapper function to compute the stats and return a object with the updated stats
  if (Object.keys(visitorsData).length === 0) {
    return {};
  }
  const computeStats = {
    pages: computePageCounts(visitorsData),
    referrers: computeRefererCounts(visitorsData),
    activeUsers: getActiveUsers(visitorsData),
    searches: visitorsData.searches
  };
  return computeStats;
};
