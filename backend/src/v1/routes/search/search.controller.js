const data = require('../../../models');

class SearchController {
  static defaultSearch(req, res) {
    const results = [];
    const {
      passengers, insurance, bestFuel, model, color
    } = req.query;
    if ((passengers && insurance && bestFuel) || (model || color)) {
      data.cars.map((car) => {
        if (
          car.passengers === Number(passengers)
          && car.insurance === insurance
          && car.bestFuel === bestFuel
        ) {
          results.push(car);
        }
        return results;
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Here are your results',
      data: results
    });
  }
}

module.exports = SearchController;
