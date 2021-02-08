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
import esPt500 from "./esPt/es_pt_translations_0_500.json"
import esPt500_1000 from "./esPt/es_pt_translations_500_1000.json"
import esPt1000_1500 from "./esPt/es_pt_translations_1000_1500.json"
import esIt500 from "./esIt/es_it_translations_0_500.json"
import esIt500_1000 from "./esIt/es_it_translations_500_1000.json"
import esIt1000_1500 from "./esIt/es_it_translations_1000_1500.json"
import esFr500 from "./esFr/es_fr_translations_0_500.json"
import esFr500_1000 from "./esFr/es_fr_translations_500_1000.json"
import esFr1000_1500 from "./esFr/es_fr_translations_1000_1500.json"
// Special case por polish to spanish
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

    public translateSingleWord(language:string, wordOriginal: string):string {
        console.log(`Translating the word=${wordOriginal} from es to ${language}`);
        let max:number = 0;
        this.numberToDifficulty.forEach((value: string, key: number) => {
            max = key < max ? max : key;
        });
        return "translated";
        // return this.translateWord(language, max, wordOriginal);
    }

    public wordExistOnDictionary(language:string, difficulty:number, wordOriginal: string) : boolean {
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
        "pt": {
            "less": [esPt500],
            "more": [esPt500, esPt500_1000],
            "many": [esPt500_1000, esPt1000_1500]
        },
        "it": {
            "less": [esIt500],
            "more": [esIt500, esIt500_1000],
            "many": [esIt500_1000, esIt1000_1500]
        },
        "fr": {
            "less": [esFr500],
            "more": [esFr500, esFr500_1000],
            "many": [esFr500_1000, esFr1000_1500]
        },
        // Polish to spanish special case
        "es": {
            "less": [plEs500],
            "more": [plEs500, plEs500_1000],
            "many": [plEs500_1000, plEs1000_1500]
        }
    }
}
