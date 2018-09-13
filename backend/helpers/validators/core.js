const hasRequiredProperties = (object, required) => {
  const errors = [];
  required.forEach((prop) => {
    if (!Object.keys(object).includes(prop)) {
      errors.push(`Missing required property ${prop}`);
    }
  });

  return errors;
};

module.exports = { hasRequiredProperties };
