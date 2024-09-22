const express=require('express')
const app=express()
app.use(express.json())
 app.use(express.urlencoded({extended:true}))
const fs = require('fs')
const hs = require('./data.json')




//get
app.get('/get', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        const hsd = JSON.parse(data)
        res.send(hsd)
    })

});




//post

app.post('/post', (req, res) => {
    const newdata = req.body;
    hs.push(newdata);

    fs.writeFile("data.json", JSON.stringify(hs), () => {

        console.log("File has been updated");
        res.send("Data added successfully");
    });
});

//put
app.put('/put/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    if (id >= 0 && id < hs.length) {
        hs[id] = updatedData;

        fs.writeFile("data.json", JSON.stringify(hs), () => {

            console.log("File has been updated");
            res.send("Data updated successfully");
        });
    } else {
        res.status(404).send("Item not found");
    }
});

//delete
app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < hs.length) {
        hs.splice(id, 1);

        fs.writeFile("data.json", JSON.stringify(hs), () => {

            console.log("File has been updated");
            res.send("Data deleted successfully");
        });
    } else {
        res.status(404).send("Item not found");
    }
});






app.listen(5000,()=>{
    console.log('listening to 5000')
})
