const fs = require('fs');
const csv = require('csvtojson');

const translateDir = __dirname + '/csv/translate.csv';

async function generateLangJson() {
  try {
    const translateFile = await csv().fromFile(translateDir);
    const translate = translateFile.filter((item) => item['Key']);

    const mergeLang = [...translate];

    const en = {};
    const ko = {};

    mergeLang.forEach((item) => {
      en[item['Key']] = item['EN'];
      ko[item['Key']] = item['KO'];
    });

    await fs.writeFile(
      __dirname + '/../src/lngProvider/locales/en_US.json',
      JSON.stringify(en, null, 2),
      'utf8',
      () => {},
    );

    await fs.writeFile(
      __dirname + '/../src/lngProvider/locales/ko_KR.json',
      JSON.stringify(ko, null, 2),
      'utf8',
      () => {},
    );
  } catch (error) {
    console.log(error);
  }
}

generateLangJson();
