const parentGame = document.getElementById('game')
const runButton = document.getElementById('run')
const saveButton = document.getElementById('save')
saveButton.onclick = () => { pbUtils.guardarSolucionEnUrl() }

initialButton()

function buildSources() {
    const name = 'main.wlk'
    const content = Blockly.Wollok.workspaceToCode(Blockly.getMainWorkspace())
    console.log({ content })
    return [{ name, content }]
}

let images = []
function start() {
    const main = 'main'
    const sounds = []
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

async function loadImgsIn(path, imgNames) {
    images = await Promise.all(
        imgNames.map(async name => {
            const file = await fetch(`${path}/${name}`).then(res => res.blob())
            const possiblePaths = [name]
            const url = URL.createObjectURL(file)
            return { possiblePaths, url }
        })
    )
}

loadImgsIn('pepita/imgs', ['pepita.png', 'silvestre.png', 'uqbar.png'])