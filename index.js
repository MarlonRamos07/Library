import express from "express"
const app = express()
app.use(express.json())

const users = []

app.post("/users",  (req, res) => {
    const body = req.body
    users.push(body)
    res.status(201).send("Usuário Criado com Sucesso")
})

// Method ( Método ) => GET, POST, PUT/PATCH, DELETE
// Name ( Nome da Rota ) => Sempre começa com '/' , Sempre no plural 
// Callback Functions+> Onde executamos o backend (lógica, regra de negócio entre outras coisas)

app.get("/users", (req, res) =>{
    res.send({message:"Esses são os Usuários", users})
})

app.listen(3000, () => console.log("Server is running on port 3000"))