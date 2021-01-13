import {expect} from 'chai';
import WordPicker from "../../../src/nlp/WordPicker";
import Translator from "../../../src/nlp/Translator";

describe('WordPicker tests', () => {
    it('Words on map', () => {
        let wordPicker: WordPicker = new WordPicker(new Translator());
        let map = new Map();
        let words = ["a", "b", "a"];
        for (let word of words) {
            wordPicker.updateMap(map, word);
        }
        expect(map.get("a")).to.equal(2);
        expect(map.get("b")).to.equal(1);
    });

    it('Choose words', () => {
        let wordPicker: WordPicker = new WordPicker( new Translator());
        let words = text;
        let result = wordPicker.chooseWords(words, 100);
        expect(result.length).to.equal(10);
    });
    it('Choose words with special characters', () => {
        let wordPicker: WordPicker = new WordPicker(new Translator());
        let words = "más años adsadasdas";
        let result = wordPicker.chooseWords(words, 100);
        expect(result.length).to.equal(1);
    });
});

const text = "La Plaza de Armas es un espacio urbano público de la villa de Álamos, ubicada en el sur del estado de Sonora, México, el lugar es un sitio histórico por su antigüedad y por ser un punto de reunión de movimientos militares de principios del siglo XX, esto hizo que fuera nombrada por el Instituto Nacional de Antropología e Historia (INAH) como Conjunto arquitectónico para su preservación.1​ Al año es visitada por miles de turistas que llegan a la villa, catalogada como Pueblo Mágico,2​ con more concurrencia en el mes de enero de cada año gracias a la celebración del Festival Alfonso Ortíz Tirado"