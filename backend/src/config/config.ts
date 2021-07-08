export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    BD: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/fotofusion',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
};