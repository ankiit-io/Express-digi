import express from "express";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;


//adding a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});


//route to get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//route to find any particular tea
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); //finding tea inside array by find fxn
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  res.status(201).send(tea);
});

//update 
app.put("/teas/:id",(req,res)=>{

  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); //finding tea inside array by find fxn
    if (!tea) {
      return res.status(404).send("tea not found");
    }
 
    const {name,price} = req.body

    tea.name = name
    tea.price=price

    res.status(201).send(tea)

})

//delete
app.delete("/teas/:id",(req,res)=>{
    const index = teaData.findIndex(t=> t.id===parseInt(req.params.id))
    if(index===-1){
          return res.status(404).send("tea not found");
    }
    teaData.splice(index,1);
   return res.status(201).send("deleted")
})

app.listen(port, () => {
  console.log(`server is listening at port:${port}`);
});
