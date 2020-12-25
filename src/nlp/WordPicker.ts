// Responsability: Find the words to translate

import {TextCandidate} from "./DomHandler";
import Translator from "./Translator";

export interface TextToTranslate {
    originalWords:Array<string>,
}

export default class WordPicker {
    private readonly translator:Translator;

    constructor(translator:Translator) {
        this.translator = translator;
    }

    public getWordsForTranslation(textCandidateList: Array<TextCandidate>, difficulty:number) : TextToTranslate {
        let fullText = this.getFullText(textCandidateList);
        let wordsToTranslate = this.chooseWords(fullText, difficulty);
        return {originalWords: wordsToTranslate};
    }

    private getFullText(textCandidateList: Array<TextCandidate>) : string {
        let fullText = "";
        for (let i = 0; textCandidateList[i]; i++) {
            let textCandidate = textCandidateList[i];
            fullText += textCandidate.text;
        }
        return fullText;
    }

    public chooseWords(fullText: string, difficulty:number) : Array<string> {
        const regEx = new RegExp("^[a-zà-úñ]+$");
        let words: string[] = fullText.split(" ");
        let wordMapCounter:Map<string, number> = new Map();

        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            // Do not translate if it contains upper case letters (remove proper nouns and acronyms)
            // Do not translate if it contains symbols
            if (!regEx.test(word)) {
                continue;
            }
            // Do not process the word if is not in the local dictionary
            if (!this.isInDictionary(word)) {
                continue;
            }
            // Update the map with the occurrences of each word
            wordMapCounter = this.updateMap(wordMapCounter, word);
        }
        return this.selectWordsToTranslate(difficulty, wordMapCounter, words.length);
    }

    private selectWordsToTranslate(difficulty:number, wordMapCounter:Map<string, number>, numberOfWordsInWholeText:number) : Array<string> {
        let randomArray = this.shuffleArray(Array.from(wordMapCounter.keys()));
        let numberOfWordsToReplace = Math.floor(numberOfWordsInWholeText * difficulty/100);
        let numberOfReplacedWords = 0;
        let numberOfUniqueWords = 0;
        let chosenWordsToTranslate = [];

        for(let i=0; i<randomArray.length; i++) {
            let randomWord:string = randomArray[i];
            let occurrences:number = wordMapCounter.get(randomWord);
            numberOfReplacedWords = numberOfReplacedWords + occurrences;
            chosenWordsToTranslate.push(randomWord);
            numberOfUniqueWords +=1;
            if (numberOfReplacedWords >= numberOfWordsToReplace) {
                break;
            }
        }
        console.log(`The map contains ${wordMapCounter.set.length} different unique words`);
        console.log(`The difficulty is: ${difficulty} and we expect to replace at min ${numberOfWordsToReplace}/${numberOfWordsInWholeText} words.`)
        console.log(`We are translating ${numberOfUniqueWords} unique words and replacing ${numberOfReplacedWords}/${numberOfWordsInWholeText} words`);
        return chosenWordsToTranslate;
    }

    private isInDictionary(word: string) : boolean {
        return this.translator.wordExistOnDictionary(word);
    }

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    private  shuffleArray(array:Array<string>):Array<string> {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    public updateMap(wordMapCounter: Map<string, number>, word: string) : Map<string, number> {
        if (wordMapCounter.has(word)) {
            let count: number = wordMapCounter.get(word);
            wordMapCounter.set(word, count+1);
        } else {
            wordMapCounter.set(word, 1);
        }
        return wordMapCounter;
    }
}