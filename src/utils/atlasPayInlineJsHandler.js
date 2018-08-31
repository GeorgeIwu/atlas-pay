// import Vue from 'vue'

export const scriptLoader = {
    loaded: [],
    load (src) {
        if (this.loaded.indexOf(src) !== -1) {
            return
        }

        this.loaded.push(src)

        if (document) {
            const script = document.createElement('script')
            script.setAttribute('src', src)
            document.head.appendChild(script)
        }
    }
}

// Vue.use({
//     install () {
//         Vue.prototype.$scriptLoader = scriptLoader
//     }
// })