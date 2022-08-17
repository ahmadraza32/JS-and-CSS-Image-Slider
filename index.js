const track = document.querySelector('.carousel__track')
const slides = Array.from(track.children)
const log = console.log
const nextButton = document.querySelector('.carousel__button--right')
const prevButton = document.querySelector('.carousel__button--left')
const dotNav = document.querySelector(".carousel__nav")
const dots = Array.from(dotNav.children)

const slideWidth = slides[0].getBoundingClientRect().width

const setPosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px'
}

slides.forEach(setPosition)

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-'+ targetSlide.style.left +')'
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
}

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling
    const currentDot = dotNav.querySelector('.current-slide')
    const prevDot = currentDot.previousElementSibling
    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDot)
    hideShowArrow(slides, prevButton, nextButton, prevIndex)
})

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling
    const amountToMove = nextSlide.style.left
    const currentDot = dotNav.querySelector('.current-slide')
    const nextDot = currentDot.nextElementSibling
    const nextIndex = slides.findIndex(slide => slide === nextSlide)

    moveToSlide(track, currentSlide, nextSlide)
    updateDots(currentDot, nextDot)
    hideShowArrow(slides, prevButton, nextButton, nextIndex)
})

const hideShowArrow = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0){
        prevButton.classList.add('is-hidden')
        nextButton.classList.remove('is-hidden')
    }
    else if(targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden')
        nextButton.classList.add('is-hidden')
    }
    else{
        prevButton.classList.remove('is-hidden')
        nextButton.classList.remove('is-hidden')
    }
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')
}

dotNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button')

    if(!targetDot) return

    const currentSlide = track.querySelector('.current-slide')
    const currentDot = dotNav.querySelector('.current-slide')
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]

    moveToSlide(track, currentSlide, targetSlide)

    updateDots(currentDot, targetDot)

    hideShowArrow(slides, prevButton, nextButton, targetIndex)
})