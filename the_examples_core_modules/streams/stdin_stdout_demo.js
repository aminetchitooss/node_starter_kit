const questions = [
    "hello, What's your name",
    "And your hobby is ?",
]
const answers = []

process.stdin.on('data', (incomingData) => {
    answers.push(incomingData.toString().trim())
    if (answers.length < questions.length) {
        ask(answers.length)
    } else {
        process.stdout.write(`\nSo your name is ${answers[0]} and you like ${answers[1]} \n\n`)
        process.exit()
    }
})

function ask(pQuestionIndex) {
    process.stdout.write( questions[pQuestionIndex] + '\n')
}

ask(0)