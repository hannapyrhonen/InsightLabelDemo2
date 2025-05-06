// dataLoader.js
// Lataa demo_tuotetiedot.csv ja täyttää TUOTETIEDOT-muuttujan
let TUOTETIEDOT = [];

function loadProductData() {
  return fetch('demo_tuotetiedot.csv')
    .then(response => {
      if (!response.ok) throw new Error('CSV-lataus epäonnistui: ' + response.status);
      return response.text();
    })
    .then(csvText => {
      const { data, errors } = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true
      });
      if (errors.length) console.warn('PapaParse-virheet:', errors);
      TUOTETIEDOT = data;
      return data;
    });
}