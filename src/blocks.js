const parentGame = document.getElementById('game')
const runButton = document.getElementById('run')
initialButton()

function buildSources() {
    const name = 'main.wlk'
    const content = Blockly.Wollok.workspaceToCode(Blockly.getMainWorkspace())
    console.log({ content })
    return [{ name, content }]
}

function start() {
    const main = 'main'
    const sounds = []
    const images = []
    const sources = buildSources()
    const project = { main, images, sounds, sources }
    new Game(project).start(parentGame)
    runButton.innerHTML = 'Parar'
    runButton.onclick = stop
}

function stop() {
    document.getElementsByTagName('canvas')[0].remove()
    initialButton()
}

function initialButton() {
    runButton.innerHTML = 'Ejecutar'
    runButton.onclick = start
}


