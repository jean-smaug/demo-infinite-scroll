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
            clonedTemplate.querySelector("img").src = getImageUrl({ width: 400, height: 250 })
            clonedTemplate.removeAttribute("id")

            main.append(clonedTemplate)
            observer.unobserve(observedElement)
            observedElement = clonedTemplate
            observer.observe(clonedTemplate)
        }
    })
})

observer.observe(observedElement)
