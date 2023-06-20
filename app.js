const cols = document.querySelectorAll('.main-column')

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent)
    }
})

function generateRandomColors() {

    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}


function copyToClickboard(text) {
    return navigator.clipboard.writeText((text))
}


function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const colText = col.querySelector('.main-column__text')
        const colButton = col.querySelector('.main-column__button')

        if (isLocked) {
            colors.push(colText.textContent)
            return
        }
        const color = isInitial
            ? colors[index]
                ? colors[index]
                : generateRandomColors()
            : generateRandomColors()

        if (!isInitial) {
            colors.push(color)
        }

        colText.textContent = color
        col.style.background = color

        setTextColor(colText, color)
        setTextColor(colButton, color)
    })

    updateColorsHash(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors
        .map((col) => {
            return col.toString().substring(1)
        }).join('-')
}

function getColorsFromHash() {
    if (document.location.hash > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map((color) => '#' + color)
    }
    return []
}


setRandomColors(true)