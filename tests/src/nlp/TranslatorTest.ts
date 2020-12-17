import { expect } from 'chai';
import {TextToTranslate} from "../../../src/nlp/WordPicker";
import Translator from "../../../src/nlp/Translator";

describe('Translator tests', () => {
    it('Words present on dictionary', () => {
       let textToTranslate:TextToTranslate = {originalWords: ["el", "asdasdsa"]};
       let translator = new Translator();
       let translated = translator.translate(textToTranslate);
        expect(translated.ids.length).to.equal(1);
    });
});