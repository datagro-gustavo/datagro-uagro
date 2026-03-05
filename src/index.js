
const fs = require("fs")

// NAME: Maestrin Software
// VERSION: 1.0.1

const odeia_ou_gosta = 'ODEIA'
const maestro = 'Maestrin'
const confirm_people = 'Oque vc acha disso Bianca?'
const array =
    [
        'odiadores',
        'slufs',
        'Fala que ele odeia slufs',
        'slufs de outros países',
        'odeia o odio',
        'Odeia developers',
        'Odeia strings random',
        'Odeia Stranger Things',
        'Odeia Xadrez',
        'Odeia quem odeia DAMA',
        'GOSTA DE MAGIC',
        'ODEIA dungeons and dragons',
        'Adora LOL que odeia adoradores de LOL',
        'Gosta de valorante mais odeia quem gosta do jogo',
        'Gosta de placas mães MATX Mais odeia ATX',
        'ODEIA MEMORIAS RAM DE 5 MIL REAIS',
        'Odeia todas as memorias ram',
        'Odeia em odeia quem gosta de digitar',
        'Odeia quem não gosta de digitar',
        'Odeia pesquisas no google',
        'Odeia quem gosta de pesquisar no google',
        'Odeia trindents',
        'Odeia quem gosta de tridents',
        'Adora Wordpress',
        'Odeia quem gosta de Wordpress',
        'ODEIA ODIADORES',
        'ODEIA LOGIN',
    ]


for (i = 0; i < array.length; i++) {

    const data = `${maestro} ${odeia_ou_gosta} ${array[i]}`

    fs.appendFile('arquivo.txt', data, (err, data) => {
        if (err) {
            console.log(er)
        }
        console.log("Maestrin Sucess")
    })
    console.log(`${maestro} ${odeia_ou_gosta} ${array[i]}`)
}


