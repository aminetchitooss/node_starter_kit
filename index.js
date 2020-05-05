console.log('hello world')
function mood() {
    return ':)'
}

function text(param) {
    const v = param
    console.log('hello world', v)
}

function foo() {
    console.log('howdy')
    return text(mood())
}

foo()
