document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('createdOk')) {
        let createdOk = document.querySelector('#createdOk')

        createdOk.style.display = 'block'

        setTimeout(() => {
            createdOk.style.display = 'none'
        }, 3000);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('createdError')) {
        let createdError = document.querySelector('#createdError')

        createdError.style.display = 'block'

        setTimeout(() => {
            createdError.style.display = 'none'
        }, 3000);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('updatedOk')) {
        let updatedOk = document.querySelector('#updatedOk')

        updatedOk.style.display = 'block'

        setTimeout(() => {
            updatedOk.style.display = 'none'
        }, 3000);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('updatedError')) {
        let updatedError = document.querySelector('#updatedError')

        updatedError.style.display = 'block'

        setTimeout(() => {
            updatedError.style.display = 'none'
        }, 3000);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('deletedOk')) {
        let deletedOk = document.querySelector('#deletedOk')

        deletedOk.style.display = 'block'

        setTimeout(() => {
            deletedOk.style.display = 'none'
        }, 3000);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('deletedError')) {
        let deletedError = document.querySelector('#deletedError')

        deletedError.style.display = 'block'

        setTimeout(() => {
            deletedError.style.display = 'none'
        }, 3000);
    }
})