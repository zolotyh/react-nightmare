Feature('empty');

Scenario('test something', (I: CodeceptJS.Playwright) => {
  I.amOnPage('');
  I.see('React');
});
