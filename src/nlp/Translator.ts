// Responsability: Translate the selected words by word picker
import {TextToTranslate} from "./WordPicker";
import TransferendumConfig from "../TransferendumConfig";

// The imports from below requires "esModuleInterop" on tsconfig
import esEn500 from "./esEn/es_en_translations_0_500.json"
import esEn500_1000 from "./esEn/es_en_translations_500_1000.json"
import esEn1000_1500 from "./esEn/es_en_translations_1000_1500.json"
import esPl500 from "./esPl/es_pl_translations_0_500.json"
import esPl500_1000 from "./esPl/es_pl_translations_500_1000.json"
import esPl1000_1500 from "./esPl/es_pl_translations_1000_1500.json"
import plEs500 from "./plEs/pl_es_translations_0_500.json"
import plEs500_1000 from "./plEs/pl_es_translations_500_1000.json"
import plEs1000_1500 from "./plEs/pl_es_translations_1000_1500.json"

export interface OriginalAndTranslated {
    originalWords:Array<string>,
    translatedWords:Array<string>,
    ids:Array<number>
}

export default class Translator {

    private numberToDifficulty:Map<number, string> = new Map<number, string>();

    constructor() {
        TransferendumConfig.difficultyToNumber.forEach((val:number, key:string) => {
            this.numberToDifficulty.set(val, key);
        })
    }

    public translate(textToTranslate: TextToTranslate, language:string, difficulty:number): OriginalAndTranslated {
        let textTranslated: OriginalAndTranslated = { originalWords: [], translatedWords: [], ids:[]};
        for (let i = 0; textToTranslate.originalWords[i]; i++) {
            let wordOriginal = textToTranslate.originalWords[i];
            let translatedWord = this.translateWord(language, difficulty, wordOriginal);
            if (translatedWord != null) {
                textTranslated.originalWords.push(wordOriginal);
                textTranslated.translatedWords.push(translatedWord);
                textTranslated.ids.push(i);
            }
        }
        return textTranslated;
    }

    private translateWord(language:string, difficulty:number, wordOriginal: string):string {
        console.log("Translating word: " + wordOriginal);
        let dicts = this.getDictionaries(language, difficulty);
        for (let dict of dicts) {
            // @ts-ignore
            let translation = dict[wordOriginal];
            if (translation != null) {
                return translation;
            }
        }
        throw Error(`The word ${wordOriginal} is not in the dictionary`);
    }

    public wordExistOnDictionary(language:string, difficulty:number, wordOriginal: string) : boolean {
        console.log("Checking if word exist: " + wordOriginal);
        let dicts = this.getDictionaries(language, difficulty);
        for (let dict of dicts) {
            // @ts-ignore
            let translation = dict[wordOriginal];
            if (translation != null) {
                return true;
            }
        }
        return false;
    }
    
    protected getDictionaries(language:string, difficulty:number): Array<any> {
        let difficultyString = this.numberToDifficulty.get(difficulty);
        // @ts-ignore
        return this.dicts[language][difficultyString];
    }

    dicts = {
        "en": {
            "less": [esEn500],
             "more": [esEn500, esEn500_1000],
            "many": [esEn500_1000, esEn1000_1500]
        },
        "pl": {
            "less": [esPl500],
            "more": [esPl500, esPl500_1000],
            "many": [esPl500_1000, esPl1000_1500]
        },
        "es": {
            "less": [plEs500],
            "more": [plEs500, plEs500_1000],
            "many": [plEs500_1000, plEs1000_1500]
        }
    }
}
