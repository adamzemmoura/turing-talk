let conversationBacklog = []
let firstName

const jokes = {
    "knock-knock" : [
        [
            "Knock knock",
            "Yah.",
            "Nooo! Thanks but I use Google. 🤣"
        ],
        [
            "Knock knock",
            "Broken pencil",
            "Oh nevermind... it's pointless! 🤣"
        ],
        [
            "Knock knock",
            "To",
            "Actually, it's to whom 🧐"
        ],
        [
            "Knock knock",
            "Old lady",
            "I didn't know you could yodel! 🤣"
        ]
    ]
}

const commonPhrasesWithResponses = {
    "how are you" : [
        "I'm fine thanks.",
        "I'm good thanks.",
        "I'm rather splendid."
    ],
    "your name": [
        "My name is Alan Turing."
    ],
    "favorite color" : [
        "Not to be rude but I'm British... it's spelt 'favourite'. You yanks butchering the English language!... Anyway, sorry, I got carried away there. My favourite colour is blue. What's yours?"
    ],
    "favourite colour" : [
        "Blue. You?"
    ],
    "what age are you": [
        "Wouldn't you like to know!"
    ], 
    "bye": [
        "Goodbye, it was nice talking to you!",
        "Bye, have a good day! 🙂"
    ],
    "coding bootcamp": [
        "I hear Codeworks, Barcelona is the best JS Bootcamp in Europe. What do I know though? I'm only Alan Turing."
    ],
    "goodbye": [
        "Goodbye, it was nice talking to you!",
        "Bye, have a good day! 🙂"
    ], 
    "are you real": [
        "How very dare you sir! Of course I am real.",
        "If you're familiar with quantum mechanics, I'm not sure any of this is real. So I'm as real as shrödinger's cat is both alive and dead. Bet you wish you hadn't asked now! 🤓"
    ],
    "thanks": [
        "You're welcome.",
        "Don't mention it.",
        "No pasa nada amigo.",
        "No problem.",
        "Glad to help."
    ],
    "sorry": [
        "No need to apologise.",
        "No worries hombre.",
        "Don't worry about it.",
        "To quote Justin Beiber, \"oooh, oooh, something, something about sorry.\" Ahhh, I don't know the words... Now I owe <i><strong>you</strong></i> the apology for being a Belieber!"
    ]
}

const genericResponsesToQuestions = [
    "That's a good question, I'll have a think about that and get back to you...",
    "Hmmm... I'm not sure about that",
    "Obviously I could tell you the answer but where's the fun in that?",
    "Rather than me google the answer, I have a better idea... why don't you do it it yourself? :)"
]

const responsesToLotsOfQuestions = [
    "What is this? The Spanish Inquisition?!",
    "You sure do ask alot of questions...",
]

const conversationStarter = [
    "Hi, I'm Alan. What's your name?",
    greeting,
    respondToHowAreYouAnswer
]

/*** 
 * Initiates a new converastion with a user.
 * 
 * This method loads the conversation backlog with with the values in conversationStarter.
 * The first statement of the conversation is then removed from the conversationBacklog and
 * returned for display to the user.
 * 
 * @return  {string}    The first statement in the computer-initiated conversation. 
 * **/
function startNewConversation() {
    conversationBacklog = [...conversationStarter]
    return conversationBacklog.shift()
}

/*** 
 * Creates a custom greeting for the user incorporating their name if present.
 * 
 * @param   name    {string}    The name of the user to greet.
 * @return  {string}    The customised greeting or generic greeting if no name present. 
 * ***/
function greeting(name) {
    firstName = name 
    let greeting = (name) ? `Nice to meet you ${name}.` : "Nice to meet you."
    greeting += " How are you today?"
    return greeting
}

/*** 
 * This method creates an appropriate response for a user's answer to the question 'How are you?'
 * 
 * This method parses a user's answer and looks for positive response indicators - words which suggest
 * a positive answer was given. It also checks for negation by looking for the word 'not' and compares
 * the index of the word 'not' to the index of the first positive response indicator to deduce whether
 * the answer given was a negated positive (negative) eg. 'not good'. It then responds appropriately; 
 *  - if positive : echoing back the user's state & replies with the computer's current emotional state 
 *  - if negative : empathises with the user and doesn't offer own emotional stat
 *  - ambiguous : communicates lack of understanding 
 * In all cases, the user is then asked if they would like to hear a joke and the setupJoke() method is
 * called to do the appropriate setup.
 * if the answer was ambiguous. In all cases, the user is then asked if they would like to hear a joke.
 * 
 * @param   answer  {string}    The answer the user supplied to the question 'how are you?'
 * @return  {string}    An appropriate response depending on the answer given.
 **/
function respondToHowAreYouAnswer(answer) {
    const answerLowercase = answer.toLowerCase()
    const positiveResponseIndicators = ["fine", "ok", "okay", "well", "splendid", "good", "great", "fantastic", "amazing", "fabulous"]
    
    const wordsInAnswerArray = answerLowercase.split(" ")

    let indexOfNot 
    let indexOfPositiveIndicator
    let positiveAnswerDetected = false 
    let ambigiousAnswer = true 
    let positiveIndicator

    // check for negation 
    if (answerLowercase.includes("not")) {
        indexOfNot = wordsInAnswerArray.indexOf("not")

    }
    
    for(let i = 0; i < positiveResponseIndicators.length; i++) {
        const nextIndicator = positiveResponseIndicators[i]
        if(answerLowercase.includes(nextIndicator)) {
            positiveAnswerDetected = true 
            
            // iterate all words in answer array, then for each word, check if the indicator is included.
            // this allows code to work even in presence of punctuation ie. "word." will still match with "word"
            indexOfPositiveIndicator = (() => {
                let index 
                wordsInAnswerArray.forEach( (word, j) => {
                    if (word.includes(nextIndicator)) {
                        index = j
                    }
                })
                return index
            })()
            
            wordsInAnswerArray.indexOf(nextIndicator)
            // if at least one positive indicator present, answer is not ambigious (even if negated)
            ambigiousAnswer = false 
            positiveIndicator = nextIndicator
            break
        } 
    }

    // check for negation of positive ie. a negative answer eg. 'not good'
    if ( (indexOfNot > -1) && (indexOfPositiveIndicator > -1) ) {
        if (indexOfNot < indexOfPositiveIndicator) {
            positiveAnswerDetected = false 
        }
    }

    const userAskedHowAreYou = (answer.toLowerCase().includes("how are you")) 
    const alansCurrentEmotionalState = randomAnswer(commonPhrasesWithResponses["how are you"])

    setupJoke()
    

    if (ambigiousAnswer) {
        return (userAskedHowAreYou) ?  
        `I'm not sure what you mean by "${answer}" but ${alansCurrentEmotionalState} Thanks for asking. Want to hear a joke?` : 
        `I'm not sure what you mean by "${answer}". Not that you asked but ${alansCurrentEmotionalState} Want to hear a joke?`
    } else if (positiveAnswerDetected) {
        return (userAskedHowAreYou) ?  
        `I'm glad to hear you are ${positiveIndicator}. ${alansCurrentEmotionalState} Thanks for asking. Want to hear a joke?` : 
        `I'm glad to hear you are ${positiveIndicator}. Not that you asked 🙄but ${alansCurrentEmotionalState} Want to hear a joke?`
    } else {
        return "I'm sorry to hear that. How about I tell you a joke to try cheer you up?" 
    }

}

/*** 
 * Initiates a computer-led conversation after a given delay.
 * 
 * Use this method to create effect of the conversation partner (the computer) starting
 * a conversation. The delay siumlates realisim ie. talking with another human. The 
 * message to be delivered is the message at index 0 in the conversationBacklog so a
 * check is carried out to ensure at least one message is present and if not, the method
 * returns. 
 * 
 * @param delay {number}    The delay in milliseconds before delivering the message.
 * ***/
function initialConversationAfterDelay(delay) {
    if(conversationBacklog.length === 0) { return }
    setTimeout(() => {
        createNewBotMessage(conversationBacklog.shift())
    }, 2000)
}

/***
 * Responds appropriately to a users message.
 * 
 * Method applies the following logic in order : 
 * - 1) Method first checks if there is a conversation backlog, and if there is, irrespective
 * of the user's message, delivers the next item at index 0 ie. the next phrase in the queue.
 * - 2) If the conversation backlog is empty, checks if common phrases are contained within the
 * message. If found, a random answer (if there is more than one) is selected from the collection 
 * of answers stored in commonPhrasesWithResponses object. 
 * - 3) If a question was asked, a random generic answer is selected from genericeResponsesToQuestions array. 
 * - 4) If none of the above, a message generic response is given.
 * 
 * @param  {string} message    The user message to respond to.
 * @return {string}    An appropriate response based on the message.  
 **/
function respondToUserMessage(message) {
    
    if (conversationBacklog.length > 0) {
        const response = conversationBacklog.shift()
        // check if the response is a function or a string
        if (typeof(response) === "function") { 
            return response(message) 
        } 
        return response
    }

    const possibleResponseToCommonPhrase = checkForCommonPhrasesWithResponses(message)
    if (possibleResponseToCommonPhrase) { return possibleResponseToCommonPhrase }

    if (message.indexOf('?') > -1) {
        return randomAnswer(genericResponsesToQuestions)
    }
    else {
        return "I don't have an answer for that"
    }
    
    
}

function checkForCommonPhrasesWithResponses(message) {
    // check for common phrases
    const commonPhrases = Object.keys(commonPhrasesWithResponses)    
    for(let i = 0; i < commonPhrases.length; i++) {
        const commonPhrase = commonPhrases[i]
        if (message.toLowerCase().includes(commonPhrase)) {
            return randomAnswer(commonPhrasesWithResponses[commonPhrase])
        }
    }
}

/*** 
 * A helper method which selects a random answer from the given array of answers.
 * 
 * @param   {[string]}  array   An array of possible answers
 * @return  {string}    A random answer
 * **/
function randomAnswer(array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
}

/*** 
 * A helper method used to set up a joke.
 * 
 * Selects a random knock-knock joke from the jokes object and adds the stages of the
 * joke to the conversationBacklog.
 **/
function setupJoke() {
    randomKnockKnockJoke().forEach( stageOfJoke => {
        conversationBacklog.push(stageOfJoke)
    })
    
}

/*** 
 * Helper function to retrieve a random knock knock joke from the jokes collection.
 * 
 * @return {[string]}   A random knock knock joke - array containing stages of joke.
 * ***/
function randomKnockKnockJoke() {
    const knockKnockJokes = jokes["knock-knock"]
    return knockKnockJokes[Math.floor(Math.random() * knockKnockJokes.length)]
}

