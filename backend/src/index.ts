import app from './app'
import './database'

// Arranque del servidor
app.listen(app.get('PORT'));
console.log(`El servidor se está ejecutando en el puerto ${app.get('PORT')}`);