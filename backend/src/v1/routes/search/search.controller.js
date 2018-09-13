const data = require('../../../models');
const { isValidSearch } = require('../../../../helpers/validators/search');

class SearchController {
  static defaultSearch(req, res) {
    const validationErrors = isValidSearch(req.query);

    // Check for validation errors
    if (validationErrors.length > 0) {
      return res.status(500).json({
        success: false,
        message: 'Missing required properties',
        errors: validationErrors
      });
    }

    const {
      passengers, insurance, bestFuel, model, color
    } = req.query;

    const results = data.cars.filter((car) => {
      const tracker = car.passengers.includes(Number(passengers));
      const insuranceTracker = car.insurance === insurance;
      const bestFuelTracker = car.bestFuel === bestFuel;
      const modelTracker = car.model === model || model === 'any';
      const colorTracker = car.color === color || color === 'any';

      return tracker && insuranceTracker && bestFuelTracker && modelTracker && colorTracker;
    });

    return res.status(200).json({
      success: true,
      message: 'Here are your results',
      data: results
    });
  }

  static filterSearch(req, res) {
    const {
      passengers, insurance, bestFuel, model, color
    } = req.query;
    // filter data array based on query string
    const results = data.cars.filter((car) => {
      let tracker = true;
      const reducer = (accumulator, currentValue) => {
        if (!accumulator) {
          return false;
        }

        return car.passengers.includes(Number(currentValue));
      };
      tracker = passengers.split(',').reduce(reducer, true);
      const insuranceTracker = insurance.split(',').includes(car.insurance);
      const bestFuelTracker = bestFuel.split(',').includes(car.bestFuel);
      const modelTracker = model.split(',').includes('any')
        ? true
        : model.split(',').includes(car.model);
      const colorTracker = model.split(',').includes('any')
        ? true
        : color.split(',').includes(car.color);
      return tracker && insuranceTracker && bestFuelTracker && modelTracker && colorTracker;
    });

    res.send({
      success: true,
      message: 'Here are your results',
      data: results
    });
  }
}

module.exports = SearchController;
