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

    public process(document:Document) {
        let textSuitableToTranslate = this.domHandler.obtainTextCandidate(document);
        let textToTranslate = this.wordPicker.getWordsForTranslation(textSuitableToTranslate);
        let textTranslated = this.translator.translate(textToTranslate);
        this.domHandler.replaceWords(document, textTranslated);
    }

    public static getInstance() {
        return new NlpOrchestrator(new DomHandler(), new WordPicker(5), new Translator());
    }
}