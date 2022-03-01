const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Conectado ao Banco de Dados!"));
}

module.exports = connectDB