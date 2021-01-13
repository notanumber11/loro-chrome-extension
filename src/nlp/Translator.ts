// Responsability: Translate the selected words by word picker
import {TextToTranslate} from "./WordPicker";
import dictionary from './dictionary_500_es_en.json'; // This import style requires "esModuleInterop" on tsconfig


export interface OriginalAndTranslated {
    originalWords:Array<string>,
    translatedWords:Array<string>,
    ids:Array<number>
}

export default class Translator {

    public translate(textToTranslate: TextToTranslate): OriginalAndTranslated {
        let textTranslated: OriginalAndTranslated = { originalWords: [], translatedWords: [], ids:[]};
        for (let i = 0; textToTranslate.originalWords[i]; i++) {
            let wordOriginal = textToTranslate.originalWords[i];
            let translatedWord = this.translateWord(wordOriginal);
            if (translatedWord != null) {
                textTranslated.originalWords.push(wordOriginal);
                textTranslated.translatedWords.push(translatedWord);
                textTranslated.ids.push(i);
            }
        }
        return textTranslated;
    }

    private translateWord(wordOriginal: string):string {
        // @ts-ignore
        return dictionary[wordOriginal];
    }

    public wordExistOnDictionary(wordOriginal: string) : boolean {
        // @ts-ignore
        return dictionary[wordOriginal] != null;
    }
}