const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

async function main() {
    
    await mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@projetosenac.kp78yzy.mongodb.net/?retryWrites=true&w=majority&appName=ProjetoSenac`
    );
    console.log("Conectou ao banco!");
}

main().catch((error) => console.log(error));

module.exports = main;