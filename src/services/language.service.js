function get_language_file() {
  return Language.getInstance()
}

let language_instance = null;

class Language {
  translations = null;

  static getInstance = () => {
    if (language_instance === null)
      language_instance = new Language(gutenberA11yConfig.language_code);
    return language_instance;
  }

  constructor(language_code) {
    this.language_code = language_code;
  }

  async load_translation() {
    if (!this.language_code) {
      this.translations = NaN;
      return;
    }
    const url = `${gutenberA11yConfig.plugin_url}/assets/lang/${this.language_code}.json`;
    this.translations = await fetch(url);
    this.translations = await this.translations.json();
  }

  /*
  *
  * Returns corresponding translation or original text
  *
  * */
  async get_translation(text) {
    // Translations have not been queried
    if (this.translations == null)
      await this.load_translation();
    // No translation file present
    if (this.translations == NaN)
      return text;

    const translation = this.translations[text];
    // Translation exists
    if (translation)
      return translation;
    return text;
  }

}

export default get_language_file;
