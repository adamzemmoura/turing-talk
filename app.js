let userHasGivenName = false 

$(document).ready(() => {
    $("#user-message-form").on('submit', (e) => {
        console.log("form submitted")
        e.preventDefault()
        const newMessage = $("#message-input")[0].value
        $("#message-input")[0].value = ""

        // If name is empty, assume the user is answering the first question by providing their name.
        if (!userHasGivenName) {
            console.log(newMessage)
            setName(newMessage)
            userHasGivenName = true 
        }

        console.log(newMessage)
        createNewUserMessage(newMessage)
        const response = respondToUserMessage(newMessage)
        simulateReadingDelayBeforeTyping(2000, response)
    })
    
    const openingStatment = startNewConversation()
    createNewBotMessage(openingStatment)
});

/*** 
 *  Creates a new user message and prints to the screen.
 *
 *  This method creates the markup required to display a user message in the chat display
 *  and appends the message to the bottom of the display. scollToBottom() is called to 
 *  ensure the message is visible.
 * 
 *  @param  messageText {String}    The message entered by the current user to display.
 * ***/
function createNewUserMessage(messageText) {
    const html = `
        <div class="chat-message-container">
            <div class="speech-bubble user-chat-bubble">
                <p>${messageText}</p>
            </div>
        </div>
    `
    $(html).appendTo($("#chat-display"))

    scrollToBottom()
}

/*** 
 *  Scrolls the chat display to the bottom.
 *  
 *  This method should be called anytime a new message is added to the display to ensure 
 *  it is visible to the user. 
 * ***/
function scrollToBottom() {
    $(".chat-message-container").last()[0].scrollIntoView({
        behavior: "smooth"
    })
}

/*** 
 *  Creates & displays a new computer generated message. 
 * 
 *  This method creates the required markup to display a computer generated message in 
 *  the chat display window. After adding the message, scrollToBottom() is called to ensure
 *  the new message is visible.
 * 
 *  @param  messageText {string}   The new computer-generated message to display.
 * ***/
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

    scrollToBottom()
}

function simulateReadingDelayBeforeTyping(delay, message) {
    setTimeout(() => {
        addReadReceipt()
        simulateTypingDelay(message)
    }, delay)
}

/*** 
 *  Add a read-receipt below the last sent message.
 * 
 *  This method is used to simulate a human partner having read the message you sent. 
 *  The appropriate markup is created and appended below the last message in the chat
 *  display along with the formatted time.  This method should always be called before
 *  createNewBotMessage() to ensure it is in the correct place - below the sent message.
 * ***/
function addReadReceipt() {
    const readReceiptHTML = `<p class='read-receipt'>Read ${getCurrentTimeString()}</p>`
    $(readReceiptHTML).appendTo($('#chat-display'))
}

/*** 
 *  Simulate a human user typing by adding a realistic delay.
 * 
 *  This method uses setTimeout() to simulate a human-like time delay to simulate typing.
 *  By default the typing speed of 150 words per minute is simulated. If a different speed
 *  is required, change the wordsPerMinute constant.  showTypingIndicator() is called both
 *  to show the typing indicator then hide it again before calling createNewBotMessage() to
 *  print the message to the screen.
 * 
 *  @param  message {string}    The message to print to the screen after the simulated typing delay.
 * ***/
function simulateTypingDelay(message) {
    const wordsPerMinute = 150
    showTypingIndicator(true)
    const wordCount = message.split(' ').length
    console.log(wordCount)
    const millisecondOfDelay = (wordCount / (wordsPerMinute / 60)) * 1000 // simulate 100 words per minute 
    console.log(millisecondOfDelay)
    setTimeout(() => {
        showTypingIndicator(false)
        createNewBotMessage(message)
    }, millisecondOfDelay)
}

/*** 
 *  Toggles the typing indicator.
 * 
 *  This method should be called to display / hide the typing indicator. The typing indicator should
 *  be called to simulate typing ie. simulating a human partner. Pass true to display to the indicator
 *  and false to hide it.
 * 
 * @param   bool {boolean} True to show the indicator and false to hide it.
 * 
 * ***/
function showTypingIndicator(bool) {
    const typingIndicator = `
    <div id="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
    </div>
    `
    if (bool) {
        $(typingIndicator).appendTo($('#chat-display'))
        scrollToBottom()
    } else {
        $('#typing-indicator').remove()
    }
}

/*** 
 *  Returns the current local time as a formatted string.
 * 
 *  If the hour returned from Date.getHours() are single digit ie. before 10am, a 0 is prepended to the hours 
 *  and similarly for minutes, if the minutes returned from Date.getMinutes() is single digit ie. before 10 
 *  past the hour, a 0 is prepended to the minutes. 
 * 
 *  @returns {string}   The formatted time in format HH:MM
 * ***/
function getCurrentTimeString() {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    let hoursString = (hours < 10) ? `0${hours}` : hours
    let minsString = (minutes < 10) ? `0${minutes}` : minutes
    return hoursString + ":" + minsString
}