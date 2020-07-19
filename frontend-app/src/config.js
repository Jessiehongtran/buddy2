export const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://buddy-talk.herokuapp.com'
    : 'http://localhost:5002'