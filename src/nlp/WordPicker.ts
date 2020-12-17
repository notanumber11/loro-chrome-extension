// Responsability: Find the words to translate

import {TextCandidate} from "./DomHandler";

export interface TextToTranslate {
    originalWords:Array<string>,
}

export default class WordPicker {
    private readonly difficulty:number;

    constructor(difficulty:number) {
        this.difficulty = difficulty;
    }

    public getWordsForTranslation(textCandidateList: Array<TextCandidate>) : TextToTranslate {
        console.log("Executing chooseWords...");
        let fullText = this.getFullText(textCandidateList);
        let wordsToTranslate = this.chooseWords(fullText);
        let textToTranslate: TextToTranslate = {originalWords : wordsToTranslate};
        console.log("Returning TextToTranslate with length: " + textToTranslate.originalWords.length);
        return textToTranslate;
    }

    private getFullText(textCandidateList: Array<TextCandidate>) : string {
        let fullText = "";
        for (let i = 0; textCandidateList[i]; i++) {
            let textCandidate = textCandidateList[i];
            fullText += textCandidate.text;
        }
        return fullText;
    }

    private chooseWords(fullText: string) : Array<string> {
        let wordsToTranslate = [];
        const regEx = new RegExp("^[a-z]+$");
        let words: string[] = fullText.split(" ");
        // TODO: Convert array to hashmap of word and occurrences to be precise about how many words we actually translate
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            if (this.flipCoin()) {
                // Do not translate if it contains upper case letters (remove proper nouns and acronyms)
                // Do not translate if it contains symbols
                if (regEx.test(word)) {
                    wordsToTranslate.push(word);
                }
            }
        }
        return wordsToTranslate;
    }

    private flipCoin(): boolean {
        return this.difficulty >= Math.ceil(Math.random() * 100);
    }
}