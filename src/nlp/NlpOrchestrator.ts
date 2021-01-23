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

    public process(document:Document, difficulty:number, language:string) {
        let t0 = performance.now();
        let textSuitableToTranslate = this.domHandler.obtainTextCandidate(document);
        let textToTranslate = this.wordPicker.getWordsForTranslation(textSuitableToTranslate, difficulty, language);
        let textTranslated = this.translator.translate(textToTranslate, language, difficulty);
        this.domHandler.replaceWords(document, textTranslated);
        let t1 = performance.now();
        console.log("[LORO EXTENSION] process took " + (t1 - t0) + " milliseconds.")
    }

    public static getInstance() {
        let translator = new Translator();
        return new NlpOrchestrator(new DomHandler(), new WordPicker(translator), translator);
    }
}