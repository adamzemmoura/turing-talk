let conversationBacklog = []
let firstName

const commonPhrasesWithResponses = {
    "how are you" : [
        "Fine thanks, for asking.",
        "I'm good thanks, how are you?",
        "Rather splendid, nice of you to ask."
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
    "goodbye": [
        "Goodbye, it was nice talking to you!",
        "Bye, have a good day! 🙂"
    ]
}

const conversationStarter = [
    "Hi, I'm Alan. What's your name?",
    `Nice to meet you ${name}. How are you today?`,
    "What would you like to talk about?"
]

const randomPhrases = {

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

function respondToUserMessage(message) {

    if (conversationBacklog.length > 0) {
        return conversationBacklog.shift()
    }

    console.log("brain is processing " + message)
    const answers = commonPhrasesWithResponses[message] 
    if (answers) {
        return randomAnswer(answers)
    } 
    else if (message.indexOf('?') > -1) {
        return randomAnswer(genericResponsesToQuestions)
    }
    else {
        return "Don't have an answer for that"
    }
    
    
}

function randomAnswer(array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
}

function startNewConversation() {
    conversationBacklog = [...conversationStarter]
    return conversationBacklog.shift()
}

function setName(name) {
    firstName = name 
    console.log("Setting name to " + firstName)
}