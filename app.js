const main = document.querySelector("main")
const template = document.querySelector("template").content.querySelector("div")

function getImageUrl({
    width,
    height
}) {
    return `https://picsum.photos/${width}/${height}?nocache=${performance.now()}`
}

function renderPicture() {
    const picture = template.cloneNode(true)
    const image = picture.querySelector("img")
    const spinner = picture.querySelector(".lds-dual-ring")
    const errorMessage = picture.querySelector("span")

    image.src = getImageUrl({
        width: image.width,
        height: image.height
    })
    image.onload = function () {
        picture.removeChild(spinner)
    }

    image.onerror = function () {
        picture.removeChild(spinner)
        picture.removeChild(image)
        errorMessage.className = "center error-message"

        setTimeout(function () {
            main.removeChild(picture)
        }, 5000)
    }

    return picture
}

const initialPicture = renderPicture()
let observedPicture = initialPicture;

const observer = new IntersectionObserver(function (entries) {
    const entry = entries[0]
    
    if (entry.isIntersecting) {
        const picture = renderPicture()

        observer.unobserve(observedPicture)
        observedPicture = picture
        
        main.append(observedPicture)
        observer.observe(observedPicture)
    }
})

main.appendChild(observedPicture)
observer.observe(observedPicture)