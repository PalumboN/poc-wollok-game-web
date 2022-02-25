const parentGame = document.getElementById('game')

function isSourceFile(file) { return file.name.endsWith('wlk') }
function isImageFile(file) { return file.name.endsWith('png') }

async function buildSource(file) {
    const name = file.name
    const content = await file.text()
    return { name, content }
}

function buildImage(file) {
    const possiblePaths = [file.name]
    const url = URL.createObjectURL(file)
    return { possiblePaths, url }
}

const input = document.getElementById('input-project')
input.onchange = async () => {
    const files = Array.from(input.files)
    const sourceFiles = files.filter(isSourceFile)
    const imageFiles = files.filter(isImageFile)
    const main = sourceFiles[0].name.split('.')[0]
    const sounds = []
    const images = imageFiles.map(buildImage)
    const sources = await Promise.all(sourceFiles.map(buildSource))
    const project = { main, images, sounds, sources }
    new Game(project).start(parentGame)
}