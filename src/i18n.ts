import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    es: {
        translation: {
            // DefaultPopup
            "Learn a new language": "Aprende un new lenguage",
            "Without releasing": "Sin darte cuenta :)",
            "Choose difficulty": "Escoge dificultad",
            "Easy": "Fácil (Pocas y fáciles)",
            "Middle": "Medio (Frequentes y más difíciles)",
            "Hard": "Difícil (Muchas y complicadas)",
            "I want to learn:": "Quiero aprender:",
            "Loro is": "Loro está:",
            "Turn off translations": "Necesitas apagar las traducciones un rato? Prueba apagando Loro :)",
            "Turn on loro": "Enciende Loro para ver traducciones de nuevo :)",
            "Allow in": "Permitir en",
            "Allow translations": "Las traducciones apareceran en esta pagina.",
            "Disallow translations": "Las traducciones no apareceran en esta pagina.",
            "Contact": "Contacto",
            // Report an error
            "Thanks report": "Gracias por ayudarnos a mejorar!",
            "Error reported": "Error reportado con éxito :)",
            "Problems sending report": "Problemas enviando el reporte :(",
            "Help us to improve": "Por favor ayudanos a mejorar dandonos más datos del problema.",
            "Orthographic  error": "Error ortográfico",
            "Grammatical error": "Error gramatical",
            "Context error": "Error contextual",
            "Other": "Otros",
            "Send": "Enviar",
            // On boarding
            "Wellcome to Loro": "Bienvenido a Loro",
            "I want to learn": "Quiero aprender:",
            "How it works": "Como funciona",
            "Settings": "Ajustes",
            "Loro is ready": "Loro está listo!",
            "How it works step": `
                        Mientras navegas la web Loro traducira algunas palabras para que puedas aprender
                        un nuevo idioma sin esfuerzo.
                        Fijate en las palabras con fondo azul y veras que estan en otro idioma. Pasa el ratón por encima de
                        ellas para ver su traducción.
                    `,
            "Settings step 1": "Accede a los ajustes desde el icono",
            "Settings step 2": "al pasar el ratón por encima de alguna palabra traducida. Tambien puedes acceder a los ajustes desde el menu de extensiones de chrome.",
            "Loro is ready step": "Ya puedes cerrar esta ventana y continuar navegando y aprendiendo."
        }
    },
    en: {
        translation: {
            // DefaultPopup
            "Learn a new language": "Learn a new idioma",
            "Without releasing": "Without even realizing it :)",
            "Choose difficulty": "Choose difficulty",
            "Easy": "Easy (A few and easy)",
            "Middle": "Middle (Frequent and a bit hard)",
            "Hard": "Hard (Many and complicated)",
            "I want to learn:": "I want to learn:",
            "Loro is": "Loro is:",
            "Turn off translations": "Do you need to turn off translations for a bit? Try turning off Loro :)",
            "Turn on loro": "Turn on Loro to see translations again :)",
            "Allow in": "Allow in",
            "Allow translations": "The translations will appear in this page.",
            "Disallow translations": "The translations will not appear in this page.",
            "Contact": "Contact",
            // Report an error
            "Thanks report": "Thanks for helping us to improve!",
            "Error reported": "Error reported successfully :)",
            "Problems sending report": "Problems sending the report :(",
            "Help us to improve": "Please help us giving more details about the problem.",
            "Orthographic  error": "Orthographic  error",
            "Grammatical error": "Grammatical error",
            "Context error": "Context error",
            "Other": "Other",
            "Send": "Send",
            // On boarding
            "Wellcome to Loro": "Wellcome to Loro",
            "I want to learn": "I want to learn:",
            "How it works": "How it works",
            "Settings": "Settings",
            "Loro is ready": "Loro is ready!",
            "How it works step": `
                          While browsing the web Loro will translate some words so you can learn
                          a new language without effort.
                          Look at the words with a blue background and you will see that they are in another language. Hover the mouse over
                          them to see their translation.
                    `,
            "Settings step 1": "You can access settings by clicking the icon",
            "Settings step 2": "when you are hovering the mouse over a translated word. You can also access settings from the chrome extensions menu.",
            "Loro is ready step": "Now you can close this popup and start learning :)"
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;