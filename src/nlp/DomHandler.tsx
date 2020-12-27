// Responsability: Interact with the DOM
import {OriginalAndTranslated} from "./Translator";
import WordHovering from "../gui/WordHovering";
import React from 'react';
import ReactDOM from 'react-dom';

// Interface containing a piece of text of the webpage that is suitable to be translated
export interface TextCandidate {
    id:number,
    text:string
}

export default class DomHandler {
    public readonly IDENTIFIER:string = "Transferendum_";
    public nodes: Array<HTMLElement> = [];

// Return all test in the webpage that can be considered for translation
    public  obtainTextCandidate(document:Document) : Array<TextCandidate> {
        // Obtain all paragraphs
        let nodes = document.getElementsByTagName("p");
        let textCandidateList: Array<TextCandidate> = [];
        for (let i = 0; nodes[i]; i++) {
            let node = nodes[i];
            let content = node.innerText;
            textCandidateList.push({
                id: i,
                text: content
            });
            // Add to the map for further reference
            this.nodes.push(node);
        }
        return textCandidateList;
    }

    // Replace and mark words with a span label
    public replaceWords(document:Document, originalAndTranslated:OriginalAndTranslated) {
        console.log("Executing replace words");
        // Go over all nodes
        for (let j = 0; j < this.nodes.length; j++) {
            let node = this.nodes[j];
            let htmlContent = node.innerHTML;
            // Replace each of the original words in the node
            for(let i=0; i<originalAndTranslated.originalWords.length; i++) {
                let original = originalAndTranslated.originalWords[i];
                let translated = originalAndTranslated.translatedWords[i];
                let id = originalAndTranslated.ids[i];
                htmlContent = this.markWords(htmlContent, original, translated, id);
            }
            node.innerHTML = htmlContent;
        }
        this.applyReactOnHover(document, originalAndTranslated);
        console.log("Finishing replace words");
    }

    public applyReactOnHover(document: Document, originalAndTranslated: OriginalAndTranslated) {
        console.log("Start applyReactOnHover");
        // Iterate over all the words marked
        for (let i = 0; i < originalAndTranslated.originalWords.length; i++) {
            let id = originalAndTranslated.ids[i];
            let original = originalAndTranslated.originalWords[i];
            let translated = originalAndTranslated.translatedWords[i];
            // Find all the nodes replaced for a given word
            let nodes = document.getElementsByClassName(this.IDENTIFIER + id);
            for (let j = 0; j < nodes.length; j++) {
                let node = nodes[j];
                // TODO: Check how to do it faster
                ReactDOM.render(<WordHovering original={original} translated={translated}/>, node);
            }
        }
        console.log("Finish applyReactOnHover");
    }

    private markWords(htmlContent: string, original: string, translation: string, id:number) :string {
        const regEx = new RegExp(" " + original + " ", "g"); // g replaces all occurrences
        // htmlContent = htmlContent.replace(regEx, " <span class='" + this.IDENTIFIER + id + "'" + "style='background-color:blue'" + ">" +  translation.toUpperCase() + "</span> ");
        htmlContent = htmlContent.replace(regEx, " <span class='" + this.IDENTIFIER + id + "'" + ">" +  translation + "</span> ");
        return htmlContent;
    }
}