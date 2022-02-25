const parentGame = document.getElementById('game')
const runButton = document.getElementById('run')
initialButton()

function buildSources() {
    const name = 'main.wlk'
    const content = Blockly.Wollok.workspaceToCode(Blockly.getMainWorkspace())
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

Blockly.Blocks.events = { COLOUR: '#00a65a' }
Blockly.Wollok = Blockly.JavaScript

const toolbox = {
    "kind": "flyoutToolbox",
    "contents": [
        {
            "kind": "block",
            "type": "messageSend"
        },
        {
            "kind": "block",
            "type": "controls_if"
        },
        {
            "kind": "block",
            "type": "controls_repeat_ext"
        },
        {
            "kind": "block",
            "type": "logic_compare"
        },
        {
            "kind": "block",
            "type": "math_number"
        },
        {
            "kind": "block",
            "type": "math_arithmetic"
        },
        {
            "kind": "block",
            "type": "text"
        },
        {
            "kind": "block",
            "type": "text_print"
        },
    ]
}

// BLOCKS
Blockly.Blocks.game = {
    init: function () {
        this.setColour(Blockly.Blocks.events.COLOUR)
        this.appendDummyInput().appendField('Al empezar el juego')
        this.appendStatementInput('program')
        this.setDeletable(false)
        this.setEditable(false)
        this.setMovable(false)
    },
}
Blockly.Wollok.game = function (block) {
    let program = Blockly.JavaScript.statementToCode(block, 'program')
    return `
    import wollok.game.*
    program main {
        ${program}
        game.start()
    }`
}

Blockly.Blocks.messageSend = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://static.thenounproject.com/png/199713-200.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
            .appendField(new Blockly.FieldTextInput("receptor.mensaje(parametro)"), "message")
        this.setInputsInline(true)
        this.setPreviousStatement(true, null)
        this.setColour(230)
    }
}
Blockly.Wollok.messageSend = function (block) {
    return block.getFieldValue('message')
}

Blockly.inject('blockly', { toolbox, trashcan: true })

const initialWorkspace =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="game" x="15" y="15"></block>
  </xml>`



const initialDom = Blockly.Xml.textToDom(initialWorkspace)
Blockly.Xml.domToWorkspace(initialDom, Blockly.getMainWorkspace())
