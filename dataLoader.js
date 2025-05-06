// dataLoader.js

let TUOTETIEDOT = [];

const PARSE_CONFIG = {
  header: true,
  skipEmptyLines: true,
  transformHeader: h => h.replace(/^\uFEFF/, '').trim()
};

function loadProductData() {
  return fetch('demo_tuotetiedot.csv')
    .then(response => {
      if (!response.ok) throw new Error('CSV-lataus epäonnistui: ' + response.status);
      return response.text();
    })
    .then(csvText => {
      // Poistetaan BOM (jos jostain syystä transformHeader ei hoida)
      if (csvText.charCodeAt(0) === 0xFEFF) {
        csvText = csvText.slice(1);
      }
      const { data, errors } = Papa.parse(csvText, PARSE_CONFIG);
      if (errors.length) console.warn('PapaParse-virheitä:', errors);
      // Trimmaa GTIN-kentän, jos siellä on vahingossa whitespacea
      TUOTETIEDOT = data.map(r => ({
        ...r,
        GTIN: r.GTIN?.trim()
      }));
      return TUOTETIEDOT;
    });
}
