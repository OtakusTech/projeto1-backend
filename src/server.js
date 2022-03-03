const app = require('./app');

// Conectando a API:
const PORT = 5000;
app.listen(PORT, () => console.log("API conectada na porta "+ PORT));