// Listen to messages sent from other parts of the extension.
// This is executed on the popup of the application
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Executing listener on background.ts ...");
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.popupMounted) {
        console.log('eventPage notified that Popup.tsx has mounted.');
    }

    if (request.action == "getSource") {
        console.log("Listener received event getSource");
        // console.log(request.source)
    }
    return isResponseAsync;
});

export default {};