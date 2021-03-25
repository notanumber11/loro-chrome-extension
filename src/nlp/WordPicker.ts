// Responsability: Find the words to translate

import {TextCandidate} from "./DomHandler";
import Translator from "./Translator";
import TransferendumConfig from "../TransferendumConfig";

export interface TextToTranslate {
    originalWords:Array<string>,
}

export default class WordPicker {
    private readonly translator:Translator;

    constructor(translator:Translator) {
        this.translator = translator;
    }

    public getWordsForTranslation(textCandidateList: Array<TextCandidate>, difficulty:number,from:string, to:string,
                                  alreadyKnownWords:Set<string>) : TextToTranslate {
        let fullText = this.getFullText(textCandidateList);
        let wordsToTranslate = this.chooseWords(fullText, difficulty, from, to, alreadyKnownWords);
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

    public chooseWords(fullText: string, difficulty:number, from:string, to:string, alreadyKnownWords:Set<string>) : Array<string> {
        const regEx = new RegExp("^[a-zà-úñ]+$");
        let words: string[] = fullText.split(" ");
        let uniqueWords:Set<string> = new Set();
        let wordMapCounter:Map<string, number> = new Map();
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            uniqueWords.add(word);
            // Do not translate if it contains upper case letters (remove proper nouns and acronyms)
            // Do not translate if it contains symbols
            if (!regEx.test(word)) {
                continue;
            }
            // Do not process the word if is not in the local dictionary
            // for the specific language and difficulty
            if (!this.isInDictionary(from, to, difficulty, word)) {
                continue;
            }

            // Do not consider the word for translation if the user already knows it
            if(alreadyKnownWords.has(word)) {
                continue;
            }

            // Update the map with the occurrences of each word
            wordMapCounter = this.updateMap(wordMapCounter, word);
        }
        if (!this.isTheWebpageInTheSourceLanguage(uniqueWords, from, to)) {
            console.warn("Loro: The webpage is in another language.");
            return []
        } else {
            console.warn("Loro: The webpage is in " + from);
        }
        return this.selectWordsToTranslate(difficulty, wordMapCounter, words.length);
    }

    private isTheWebpageInTheSourceLanguage(uniqueWords:Set<string>, from:string, to:string):boolean {
        let counter = 0;
        let difficulty:number = TransferendumConfig.DIFFICULTY_TO_PERCENTAGE.get("many")!;

        for (let word of Array.from(uniqueWords.values())) {
            if (this.isInDictionary(from, to, difficulty, word)) {
                counter += 1;
            }
        }
        let percentage = counter/uniqueWords.size * 100;
        console.log("Loro: The percentage of words suitable to translation is: " + percentage);
        return percentage >= 2;
    }

    private selectWordsToTranslate(difficulty:number, wordMapCounter:Map<string, number>, numberOfWordsInWholeText:number) : Array<string> {
        let randomArray = this.shuffleArray(Array.from(wordMapCounter.keys()));
        let numberOfWordsToReplace = Math.floor(numberOfWordsInWholeText * difficulty/100);
        let numberOfReplacedWords = 0;
        let numberOfUniqueWords = 0;
        let chosenWordsToTranslate = [];

        for(let i=0; i<randomArray.length; i++) {
            let randomWord:string = randomArray[i];
            let occurrences:number = wordMapCounter.get(randomWord)!;
            numberOfReplacedWords = numberOfReplacedWords + occurrences;
            chosenWordsToTranslate.push(randomWord);
            numberOfUniqueWords +=1;
            if (numberOfReplacedWords >= numberOfWordsToReplace) {
                break;
            }
        }

        console.log(`The map contains ${wordMapCounter.size} different unique words`);
        console.log(`The difficulty is: ${difficulty} and we expect to replace at min ${numberOfWordsToReplace}/${numberOfWordsInWholeText} words.`)
        console.log(`We are translating ${numberOfUniqueWords} unique words and replacing ${numberOfReplacedWords}/${numberOfWordsInWholeText} words`);
        console.warn(`Loro: Translating : ${numberOfReplacedWords}/${numberOfWordsToReplace} words`);
        return chosenWordsToTranslate;
    }

    private isInDictionary(from:string, to:string, difficulty: number ,word: string) : boolean {
        return this.translator.wordExistOnDictionary(from, to, difficulty, word);
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
            let count: number = wordMapCounter.get(word)!;
            wordMapCounter.set(word, count+1);
        } else {
            wordMapCounter.set(word, 1);
        }
        return wordMapCounter;
    }
}