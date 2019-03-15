const I = actor();
// Add in your custom step files

// Given('I have a defined step', () => {
//   // TODO: replace with your own step
// });

Given('I am on the home page', () => {
  // From "features/basic.feature" {"line":7,"column":5}
  I.amOnPage('/');
});

Given('I have entered the following selections', (selections) => {
  // From "features/basic.feature" {"line":8,"column":5}
  for (const id in selections.rows) {
    if (id < 1) {
      continue; // skip a header of a table
    }

    // go by row cells
    const cells = selections.rows[id].cells;

    const passengers = cells[0].value;
    const insurance = cells[1].value;
    const fuel = cells[2].value;
  I.fillField(locate({id: 'passengers'}), `${passengers}`);
  I.fillField(locate({id: 'insurance'}), insurance);
  I.fillField(locate({id: 'bestFuel'}), fuel);
}
});

When('I go to find deals', () => {
  // From "features/basic.feature" {"line":11,"column":5}
  I.click('Find Deals');
});

Then('I should see results', () => {
  // From "features/basic.feature" {"line":12,"column":5}
  I.amOnPage('/deals');
});

