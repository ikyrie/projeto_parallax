import { Carousel } from "./carousel.js"

const indicadores = '[data-carousel-indicadores]'
const proximo = '[data-proximo]'
const anterior = '[data-anterior]'
const produtos = '[data-carousel-produtos]'

new Carousel(indicadores, proximo, anterior, produtos)
