Blockly.Blocks.events = { COLOUR: '#00a65a' }
Blockly.Wollok = Blockly.JavaScript

const toolbox = {
    "kind": "flyoutToolbox",
    "contents": [
        {
            "kind": "block",
            "type": "object"
        },
        {
            "kind": "block",
            "type": "attribute"
        },
        {
            "kind": "block",
            "type": "actionMethod"
        },
        {
            "kind": "block",
            "type": "valueMethod"
        },
        {
            "kind": "block",
            "type": "actionMessageSend"
        },
        {
            "kind": "block",
            "type": "valueMessageSend"
        },
        {
            "kind": "block",
            "type": "controls_if"
        },
    ]
}

// GAME
Blockly.Blocks['game'] = {
    init: function () {
        this.setColour(Blockly.Blocks.events.COLOUR)
        this.appendDummyInput().appendField('Al empezar el juego')
        this.appendStatementInput('PROGRAM')
        this.setDeletable(false)
        this.setEditable(false)
        this.setMovable(false)
    },
}
Blockly.Wollok.game = function (block) {
    const program = Blockly.Wollok.statementToCode(block, 'PROGRAM')
    return `
    import wollok.game.*
    program main {
        ${program}
        game.start()
    }`
}

// SEND
Blockly.Blocks['actionMessageSend'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://static.thenounproject.com/png/199713-200.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
            .appendField(new Blockly.FieldTextInput("receptor.mensaje(parametro)"), "MESSAGE")
        this.setInputsInline(true)
        this.setPreviousStatement(true, null)
        this.setColour(230)
    }
}
Blockly.Wollok.actionMessageSend = function (block) {
    return block.getFieldValue('MESSAGE')
}
Blockly.Blocks['valueMessageSend'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://www.freeiconspng.com/thumbs/message-icon-png/message-icon-png-4.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
            .appendField(new Blockly.FieldTextInput("receptor.mensaje(parametro)"), "MESSAGE")
        this.setInputsInline(true)
        this.setOutput(true, null)
        this.setColour(230)
    }
}
Blockly.Wollok.valueMessageSend = function (block) {
    return block.getFieldValue('MESSAGE')
}

// OBJECT
Blockly.Blocks['object'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("objecto")
            .appendField(new Blockly.FieldTextInput("nombre"), "NAME")
        this.appendStatementInput("ATTRIBUTES")
            .setCheck(null)
            .appendField("atributos")
        this.appendStatementInput("METHODS")
            .setCheck(null)
            .appendField("métodos")
        this.setColour(345)
    }
}
Blockly.Wollok.object = function (block) {
    const name = block.getFieldValue('NAME')
    const attributes = Blockly.Wollok.statementToCode(block, 'ATTRIBUTES')
    const methods = Blockly.Wollok.statementToCode(block, 'METHODS')
    return `
    object ${name} {
        ${attributes}

        ${methods}
    }`
}

Blockly.Blocks['attribute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("atributo")
            .appendField(new Blockly.FieldTextInput("nombre"), "NAME")
        this.appendValueInput("INIT")
            .setCheck(null)
            .appendField("valor inicial")
        this.appendDummyInput()
            .appendField("property")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "PROPERTY")
        this.setInputsInline(false)
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(345)
    }
}
Blockly.Wollok.attribute = function (block) {
    const name = block.getFieldValue('NAME')
    const property = block.getFieldValue('PROPERTY') == 'TRUE' ? 'property' : ''
    const initialValue = Blockly.Wollok.statementToCode(block, 'INIT')
    return `var ${property} ${name} = ${initialValue || 'null'}`
}

Blockly.Blocks['actionMethod'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("método")
            .appendField(new Blockly.FieldTextInput("nombre"), "NAME")
        this.appendStatementInput("BODY")
            .setCheck(null)
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(345)
    }
}
Blockly.Wollok.actionMethod = function (block) {
    const name = block.getFieldValue('NAME')
    const body = Blockly.Wollok.statementToCode(block, 'BODY')
    return `
    method ${name}() {
        ${body}
    }
    `
}

Blockly.Blocks['valueMethod'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("método")
            .appendField(new Blockly.FieldTextInput("nombre"), "NAME")
        this.appendStatementInput("BODY")
            .setCheck(null)
        this.appendValueInput("RETURN")
            .setCheck(null)
            .appendField("retornar")
        this.setInputsInline(true)
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(345)
    }
}
Blockly.Wollok.valueMethod = function (block) {
    const name = block.getFieldValue('NAME')
    const body = Blockly.Wollok.statementToCode(block, 'BODY')
    const returN = Blockly.Wollok.statementToCode(block, 'RETURN')
    return `
    method ${name}() {
        ${body}
        return ${returN}
    }
    `
}

Blockly.inject('blockly', { toolbox, trashcan: true, scrollbars: true })

const initialWorkspace =
    `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="game" x="15" y="15"></block>
  </xml>`



const initialDom = Blockly.Xml.textToDom(initialWorkspace)
Blockly.Xml.domToWorkspace(initialDom, Blockly.getMainWorkspace())