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
      console.log('insurance-t', insuranceTracker, insurance.split(','));
      const bestFuelTracker = bestFuel.split(',').includes(car.bestFuel);
      console.log('bestFuel-t', bestFuelTracker);
      const modelTracker = model.split(',').includes('any')
        ? true
        : model.split(',').includes(car.model);
      console.log('model-t', modelTracker);
      const colorTracker = model.split(',').includes('any')
        ? true
        : color.split(',').includes(car.color);
      console.log('color-t', colorTracker);

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
