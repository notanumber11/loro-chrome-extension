// The goal of this class in encapsulate the functions that the GUI will use to interact with google chrome.
// This has 2 main benefits:
// 1) Enable testing of the GUI without loading the extension and just using a mock for this class
// 2) Enable future development of extensions for other browsers

export default abstract class GuiProxy {
    abstract sendMessage(message: any, responseCallback?: (response: any) => void): void;
}