import _ from 'lodash';
import './style.css';
import get_language_file from "./services/language.service";
import HelperService from "./services/helper.service";

HelperService.docReady(async function () {
    var language = get_language_file();
    console.log(await language.get_translation('Test'));

})
