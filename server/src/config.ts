

const config = {
    app: {
        port: process.env.PORT || 8000,
        jwtSecret: process.env.JWT_SECRET || 'secret',
        endpoint: process.env.API_ENDPOINT || 'https://api.indietours.tech',
        mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-booking',
        IS_DEBUG: process.env.NODE_ENV !== 'production',
    }
}

export default config;