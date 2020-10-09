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
        console.log(language_code);
        this.language_code = language_code;
    }

    load_translation() {
        if (!this.language_code)
            return;

    }

    /*
    *
    * Returns corresponding translation or original text
    *
    * */
    get_translation(text) {
        // No translation file present
        if (!this.translations)
            return text;
        var translation = this.translations[text];

        // Translation exists
        if (translation)
            return translation;

        return text;
    }

}

export default get_language_file;
