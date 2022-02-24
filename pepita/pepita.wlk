import wollok.game.*

object pepita {
    var property position = game.at(1,1)
    const property image = 'pepita.png'
}

object uqbar {
    const property position = game.at(4,4)
    const property image = 'uqbar.png'
}

program juego {
    game.addVisualCharacter(pepita)
    game.addVisual(uqbar)
    game.onCollideDo(pepita, { alguien => game.say(pepita, "Llegué :)") })
    game.start()
}