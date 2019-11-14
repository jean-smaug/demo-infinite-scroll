const main = document.querySelector("main")
const template = document.getElementById("template")

const image = template.querySelector("img")

const url = "https://picsum.photos/300/200"

let observedElement = template;

window.addEventListener("load", function() {    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const clonedTemplate = template.cloneNode()
                clonedTemplate.style.background = "blue"

                main.append(clonedTemplate)

                observer.unobserve(observedElement)
                
                observedElement = clonedTemplate

                observer.observe(clonedTemplate)

                setTimeout(function() {
                    entry.target.style.background = "red"
                }, 2000)
            }
        })
    })
    
    observer.observe(observedElement)
})
