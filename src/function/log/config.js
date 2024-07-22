// config.js
let mainLanguages = "";

if (process.env.LANGUAGES === "en-EN") {
  mainLanguages = "eng";
} else if (process.env.LANGUAGES === "nl-NL") {
  mainLanguages = "nl";
} else {
  mainLanguages = "eng"; // default to English if no language is specified in environment variables
}

module.exports = {
  LANGUAGES: `${mainLanguages}`,
};
