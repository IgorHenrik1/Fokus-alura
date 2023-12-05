const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const startPauseBt = document.querySelector('#start-pause')
const musicaPausar = new Audio('sons/pause.mp3')
const musicaIniciar = new Audio('sons/play.wav')
const musicaTempoEncerrado = new Audio('sons/beep.mp3')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const imgBt = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

let tempoDecooridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecooridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecooridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecooridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function(contexto){
        console.log(contexto.classList)
        contexto.classList.remove('active')
        
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;

        case "descanso-curto":
            titulo.innerHTML = ` 
            Que tal dar <br>
            uma respirada,<br>
            <strong class="app__title-strong">Faça uma<br>
            pausa curta!</strong>`

            break;
        case "descanso-longo":
            titulo.innerHTML = ` 
                Hora de voltar <br>
                á superficie.<br>
                <strong class="app__title-strong">Faça uma<br>
                pausa longa!</strong>`

            break;


        default:
            break;
    }
}

const contagemRegressiva = () => {

    if(tempoDecooridoEmSegundos <= 0){
        musicaTempoEncerrado.play()
        zerar()
        alert('Tempo Finalizado!')
        return
    }

    tempoDecooridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        zerar()
        musicaPausar.play()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    musicaPausar.play()
    iniciarOuPausarBt.textContent ="Pausar"
    imgBt.setAttribute('src', 'imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
    iniciarOuPausarBt.textContent ="Começar"
    imgBt.setAttribute('src', 'imagens/play_arrow.png')
}

function mostrarTempo(){
    const tempo = new Date(tempoDecooridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

