const main = document.querySelector("main")
const template = document.getElementById("template")

let observedElement = template;

function getImageUrl({ width, height }) {
    return `https://picsum.photos/${width}/${height}?nocache=${performance.now()}`
}

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const clonedTemplate = template.cloneNode(true)
            const image = clonedTemplate.querySelector("img")
            const spinner = clonedTemplate.querySelector(".lds-dual-ring")
            const errorMessage = clonedTemplate.querySelector("span")
            
            clonedTemplate.removeAttribute("id")

            image.src = getImageUrl({ width: image.width, height: image.height })
            image.onload = function() {
                clonedTemplate.removeChild(spinner)
            }

            image.onerror = function() {
                clonedTemplate.removeChild(spinner)
                clonedTemplate.removeChild(image)
                errorMessage.className = "center error-message"

                setTimeout(function () {
                    main.removeChild(clonedTemplate)
                }, 5000)
            }

            main.append(clonedTemplate)
            observer.unobserve(observedElement)
            observedElement = clonedTemplate
            observer.observe(clonedTemplate)
        }
    })
})

observer.observe(observedElement)
