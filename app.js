
const main = document.querySelector("main")
const template = document.getElementById("template")

template.removeAttribute("id")

let observedElement = template;

function getRandom() {
    return Math.floor(Math.random() * 1000)
}


function getDimensions({ minWidth, maxWidth, minHeight, maxHeight }) {
    const dimensions = { width: getRandom(), height: getRandom() }

    if(
        dimensions.width > minWidth
        && dimensions.height > minHeight
        && dimensions.width < maxWidth
        && dimensions.height < maxHeight
    ) return dimensions

    return getDimensions({ minWidth, maxWidth, minHeight, maxHeight })
}

function getImageUrl({ width, height }) {
    return `https://picsum.photos/${width}/${height}`
}

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const clonedTemplate = template.cloneNode(true)
            clonedTemplate.querySelector("img").src = getImageUrl(getDimensions({ minWidth: 200, maxWidth: 500, minHeight: 150, maxHeight: 400 }))

            main.append(clonedTemplate)

            observer.unobserve(observedElement)
            
            observedElement = clonedTemplate

            observer.observe(clonedTemplate)
        }
    })
})

observer.observe(observedElement)
