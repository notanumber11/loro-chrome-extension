import { expect } from 'chai';
import {TextToTranslate} from "../../../src/nlp/WordPicker";
import Translator from "../../../src/nlp/Translator";

describe('Translator tests', () => {
    it('Words are translated', () => {
       let textToTranslate:TextToTranslate = {originalWords: ["vamos", "asdasdsa"]};
       let translator = new Translator();
       let translated = translator.translate(textToTranslate);
        expect(translated.ids.length).to.equal(1);
    });
    it('Words present on dictionary', () => {
        let translator = new Translator();
        let result = translator.wordExistOnDictionary("vamos");
        expect(result).to.equal(true);
        result = translator.wordExistOnDictionary("asdsdfds");
        expect(result).to.equal(false);
    });
});