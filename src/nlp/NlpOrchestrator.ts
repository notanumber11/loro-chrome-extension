// Responsability: Orchestrates the different components involved on deciding, translating and replacing words on a given webpage
import WordPicker from "./WordPicker";
import Translator from "./Translator";
import DomHandler from "./DomHandler";

export default class NlpOrchestrator {
    public domHandler:DomHandler;
    public wordPicker:WordPicker;
    public translator:Translator;

    // Visible for testing
    public constructor(domHandler: DomHandler, wordPicker: WordPicker, translator: Translator) {
        this.domHandler = domHandler;
        this.wordPicker = wordPicker;
        this.translator = translator;
    }

    public process(document:Document, difficulty:number, from:string, to:string, alreadyKnownWords:Set<string>) {
        let t0 = performance.now();
        let textSuitableToTranslate = this.domHandler.obtainTextCandidate(document);
        let textToTranslate = this.wordPicker.getWordsForTranslation(textSuitableToTranslate, difficulty, from, to, alreadyKnownWords);
        let textTranslated = this.translator.translate(textToTranslate, from, to, difficulty);
        this.domHandler.replaceWords(document, textTranslated);
        let t1 = performance.now();
        console.log("Loro: process took " + (t1 - t0) + " milliseconds.")
    }

    public processLoro(document:Document) {
        this.domHandler.obtainLoroCandidate(document);
        let textTranslated = {
            originalWords: ["palabras", "nuevo", "raton", "azul", "traduccion", "ajustes", "palabra", "traducida"],
            translatedWords: ["words", "new", "mouse", "blue", "translation", "settings", "word", "translated"],
            ids: [1, 2, 3, 4, 5, 6, 7, 8]
        };
        this.domHandler.replaceWords(document, textTranslated);
    }

    public static getInstance() {
        let translator = new Translator();
        return new NlpOrchestrator(new DomHandler(), new WordPicker(translator), translator);
    }
}