export interface TranslatorInputInterface {
    id:number,
    word:string
    context:string,
}

class TranslatorAPI {
    translate(input:TranslatorInputInterface) {
        return "nucleos";
    }
    translateBatch(inputs:Array<TranslatorInputInterface>) {
        return "nucleos";
    }
}