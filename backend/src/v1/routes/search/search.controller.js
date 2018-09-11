const data = require('../../../models');

class SearchController {
  static defaultSearch(req, res) {
    const results = [];
    const {
      passengers, insurance, bestFuel, model, color
    } = req.query;
    if (passengers && insurance && bestFuel && model && color) {
      data.cars.map((car) => {
        if (
          car.passengers.includes(Number(passengers))
          && car.insurance === insurance
          && car.bestFuel === bestFuel
          && (car.model === model || car.model === 'any')
          && (car.color === color || car.color === 'any')
        ) {
          results.push(car);
        }
        return results;
      });
    }

    if (passengers && insurance && bestFuel) {
      data.cars.map((car) => {
        if (
          car.passengers.includes(Number(passengers))
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
