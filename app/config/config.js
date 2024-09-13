// configuro un archivo JS para que me importe las variables definidas en mi env

const config = {
    URL: {
        URL_MOVIES: process.env.URL_MOVIES
    },
    AUTH: {
        API_TOKEN: process.env.AUTH_TMBD
    }
}

export default config