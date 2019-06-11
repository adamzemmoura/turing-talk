let name = ""


$(document).ready(() => {
    $("#enterButton").click((e) => {
        e.preventDefault()
        name = $("#nameInput")[0].value
        console.log(name)
        if (name.length === 0 || name === null) {
            displayLoginError("Please make sure you enter your name")
        }
        
    })

    $("#user-message-form").on('submit', (e) => {
        e.preventDefault()
        const newMessage = $("#message-input")[0].value
        console.log(newMessage)
        createNewUserMessage(newMessage)
        const response = respondToUserMessage(newMessage)
        simulateTypingDelay(response)
    })
});

function displayLoginError(errorMessage) {
    $("#errorMessage")[0].innerText = errorMessage
}

function createNewUserMessage(messageText) {
    const html = `
        <div class="chat-message-container">
            <div class="speech-bubble user-chat-bubble">
                <p>${messageText}</p>
            </div>
        </div>
    `
    $(html).appendTo($("#chat-display"))

    // scroll the new message into view 
    $(".chat-message-container").last()[0].scrollIntoView({
        behavior: "smooth"
    })
}

function createNewBotMessage(messageText) {
    const html = `
        <div class="chat-message-container">
            <div class="speech-bubble bot-chat-bubble">
                <p>${messageText}</p>
            </div>
            <img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2F68%2F41%2F40%2F684140b42a313f01da0de85af999175d.jpg&f=1" alt="">
        </div>
    `
    $(html).appendTo($("#chat-display"))

    // scroll the new message into view 
    $(".chat-message-container").last()[0].scrollIntoView({
        behavior: "smooth"
    })
}

function simulateTypingDelay(response) {
    const wordCount = response.split(' ').length
    console.log(wordCount)
    const millisecondOfDelay = (wordCount / (150 / 60)) * 1000 // simulate 100 words per minute 
    console.log(millisecondOfDelay)
    setTimeout(() => {
        createNewBotMessage(response)
    }, millisecondOfDelay)
}