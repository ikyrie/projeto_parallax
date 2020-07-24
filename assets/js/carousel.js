export class Carousel {
    constructor(indicadores, proximo, anterior, produtos) {
        this.navegacao = document.querySelector(indicadores)
        this.listaProdutos = document.querySelector(produtos)
        this.proximo = document.querySelector(proximo)
        this.anterior = document.querySelector(anterior)

        this.indicadores = this.getListaIndicadores()
        this.slides = this.getListaSlides()
        this.tamanhoSlide = this.getTamanhoSlide()
        this.slideAtual = this.getSlideAtual()

        this.indiceDoSlideAtual = 0

        this.proximo.addEventListener('click', this.proximoSlide.bind(this))
        this.anterior.addEventListener('click', this.voltaSlide.bind(this))
        this.navegacao.addEventListener('click', this.pularParaSlide.bind(this))

        this.preparaSlides()
    }

    getListaIndicadores() {
        return Array.from(this.navegacao.children)
    }

    getListaSlides() {
        return Array.from(this.listaProdutos.children)
    }

    getTamanhoSlide() {
        return this.slides[0].getBoundingClientRect().width
    }

    getSlideAtual() {
        return this.slides[this.indiceDoSlideAtual]
    }

    getIndicadorAtual() {
        return this.indicadores[this.indiceDoSlideAtual]
    }

    scrollParaSlide(slideSelecionado) {
        this.listaProdutos.style.transform = 'translateX(-' + slideSelecionado.style.left + ')'
    }

    atualizaIndicadores(indicadorAtual, indicadorSelecionado) {
        indicadorAtual.classList.remove('carousel__indicador--ativo')
        indicadorSelecionado.classList.add('carousel__indicador--ativo')
    }

    vaParaSlide(posicao) {
        const indicadorAtual = this.getIndicadorAtual()
        this.indiceDoSlideAtual = posicao
        this.indiceDoSlideAtual = this.indiceDoSlideAtual % this.slides.length
        const proximoSlide = this.getSlideAtual()
        const proximoIndicador = this.getIndicadorAtual()

        this.scrollParaSlide(proximoSlide)
        this.atualizaIndicadores(indicadorAtual, proximoIndicador)
    }

    proximoSlide() {
        const proximaPosicao = this.indiceDoSlideAtual + 1
        this.vaParaSlide(proximaPosicao)
    }

    voltaSlide() {
        let posicaoAnterior = this.indiceDoSlideAtual - 1
        if(posicaoAnterior < 0) {
            posicaoAnterior = this.tamanhoSlide - 1
        }
        this.vaParaSlide(posicaoAnterior)
    }

    pularParaSlide(evento) {
        if(evento.target === evento.currentTarget) return

        const targetDot = evento.target.getAttribute('data-indicador')
        this.vaParaSlide(targetDot)
    }

    preparaSlides() {
        this.slides.forEach((slide, i) => {
            slide.style.left = this.tamanhoSlide * i + 'px'
        })
    }
}
