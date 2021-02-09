// Responsability: Translate the selected words by word picker
import {TextToTranslate} from "./WordPicker";
import TransferendumConfig from "../TransferendumConfig";
// The imports from below requires "esModuleInterop" on tsconfig
// Spanish dictionaries
import esEn500 from "./es/en/es_en_translations_0_500.json"
import esEn500_1000 from "./es/en/es_en_translations_500_1000.json"
import esEn1000_1500 from "./es/en/es_en_translations_1000_1500.json"
import esPl500 from "./es/pl/es_pl_translations_0_500.json"
import esPl500_1000 from "./es/pl/es_pl_translations_500_1000.json"
import esPl1000_1500 from "./es/pl/es_pl_translations_1000_1500.json"
import esPt500 from "./es/pt/es_pt_translations_0_500.json"
import esPt500_1000 from "./es/pt/es_pt_translations_500_1000.json"
import esPt1000_1500 from "./es/pt/es_pt_translations_1000_1500.json"
import esIt500 from "./es/it/es_it_translations_0_500.json"
import esIt500_1000 from "./es/it/es_it_translations_500_1000.json"
import esIt1000_1500 from "./es/it/es_it_translations_1000_1500.json"
import esFr500 from "./es/fr/es_fr_translations_0_500.json"
import esFr500_1000 from "./es/fr/es_fr_translations_500_1000.json"
import esFr1000_1500 from "./es/fr/es_fr_translations_1000_1500.json"
// English dictionaries
import enDe500 from "./en/de/en_de_translations_0_500.json"
import enDe500_1000 from "./en/de/en_de_translations_500_1000.json"
import enDe1000_1500 from "./en/de/en_de_translations_1000_1500.json"
import enEs500 from "./en/es/en_es_translations_0_500.json"
import enEs500_1000 from "./en/es/en_es_translations_500_1000.json"
import enEs1000_1500 from "./en/es/en_es_translations_1000_1500.json"
import enFr500 from "./en/fr/en_fr_translations_0_500.json"
import enFr500_1000 from "./en/fr/en_fr_translations_500_1000.json"
import enFr1000_1500 from "./en/fr/en_fr_translations_1000_1500.json"
// Polish dictionaries
import plEs500 from "./pl/es/pl_es_translations_0_500.json"
import plEs500_1000 from "./pl/es/pl_es_translations_500_1000.json"
import plEs1000_1500 from "./pl/es/pl_es_translations_1000_1500.json"
import plDe500 from "./pl/de/pl_de_translations_0_500.json"
import plDe500_1000 from "./pl/de/pl_de_translations_500_1000.json"
import plDe1000_1500 from "./pl/de/pl_de_translations_1000_1500.json"
import plEn500 from "./pl/en/pl_en_translations_0_500.json"
import plEn500_1000 from "./pl/en/pl_en_translations_500_1000.json"
import plEn1000_1500 from "./pl/en/pl_en_translations_1000_1500.json"

// Special case por polish to spanish
export interface OriginalAndTranslated {
    originalWords: Array<string>,
    translatedWords: Array<string>,
    ids: Array<number>
}

export default class Translator {

    private numberToDifficulty: Map<number, string> = new Map<number, string>();

    constructor() {
        TransferendumConfig.DIFFICULTY_TO_PERCENTAGE.forEach((val: number, key: string) => {
            this.numberToDifficulty.set(val, key);
        })
    }

    public translate(textToTranslate: TextToTranslate, from: string, to: string, difficulty: number): OriginalAndTranslated {
        let textTranslated: OriginalAndTranslated = {originalWords: [], translatedWords: [], ids: []};
        for (let i = 0; textToTranslate.originalWords[i]; i++) {
            let wordOriginal = textToTranslate.originalWords[i];
            let translatedWord = this.translateWord(from, to, difficulty, wordOriginal);
            if (translatedWord != null) {
                textTranslated.originalWords.push(wordOriginal);
                textTranslated.translatedWords.push(translatedWord);
                textTranslated.ids.push(i);
            }
        }
        return textTranslated;
    }

    private translateWord(from: string, to: string, difficulty: number, wordOriginal: string): string {
        let dicts = this.getDictionaries(from, to, difficulty);
        for (let dict of dicts) {
            // @ts-ignore
            let translation = dict[wordOriginal];
            if (translation != null) {
                return translation;
            }
        }
        throw Error(`The word ${wordOriginal} is not in the dictionary`);
    }

    public translateSingleWord(from:string, to: string, wordOriginal: string): string {
        console.log(`Translating the word=${wordOriginal} from es to ${to}`);
        let max: number = 0;
        this.numberToDifficulty.forEach((value: string, key: number) => {
            max = key < max ? max : key;
        });
        return this.translateWord(from, to, max, wordOriginal);
    }

    public wordExistOnDictionary(from:string, to: string, difficulty: number, wordOriginal: string): boolean {
        let dicts = this.getDictionaries(from, to, difficulty);
        for (let dict of dicts) {
            // @ts-ignore
            let translation = dict[wordOriginal];
            if (translation != null) {
                return true;
            }
        }
        return false;
    }

    protected getDictionaries(from:string, to: string, difficulty: number): Array<any> {
        let difficultyString = this.numberToDifficulty.get(difficulty);
        // @ts-ignore
        return this.dicts[from][to][difficultyString];
    }

    dicts = {
        "es": {
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
            }
        },
        "en": {
          "es": {
              "less": [enEs500],
              "more": [enEs500, enEs500_1000],
              "many": [enEs500_1000, enEs1000_1500]
          },
          "de": {
              "less": [enDe500],
              "more": [enDe500, enDe500_1000],
              "many": [enDe500_1000, enDe1000_1500]
          },
          "fr": {
              "less": [enFr500],
              "more": [enFr500, enFr500_1000],
              "many": [enFr500_1000, enFr1000_1500]
          }
        },
        "pl": {
            "es": {
                "less": [plEs500],
                "more": [plEs500, plEs500_1000],
                "many": [plEs500_1000, plEs1000_1500]
            },
            "de": {
                "less": [plDe500],
                "more": [plDe500, plDe500_1000],
                "many": [plDe500_1000, plDe1000_1500]
            },
            "en": {
                "less": [plEn500],
                "more": [plEn500, plEn500_1000],
                "many": [plEn500_1000, plEn1000_1500]
            }
        }
    }
}
