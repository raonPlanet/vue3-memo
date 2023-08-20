const express = require('express')
const bodyParser = require("express");
const app = express()
const port = 3000
const database = require("./database");

const memos = [];
app.use(bodyParser.json());
app.get('/api/memos', async (req, res) => {
    const result = await database.run("select * from memos");
    res.send(result)
});
app.post('/api/memos', async (req, res) => {
    console.log(req.body);
    await database.run(`insert into memos (content) VALUES (?)`,[req.body.content]);
    const result = await database.run("select * from memos");
    res.send(result);
});
app.put('/api/memos/:id', async (req, res) => {
    console.log(req.params);
    await database.run(`update memos set content = ? where id = ?`,[req.body.content,req.params.id])
    const result = await database.run("select * from memos");
    res.send(result);
});
app.delete('/api/memos/:id',async (req,res)=>{
   await database.run("delete from memos where id = ?",[req.params.id]);
   const result = await database.run("select * from memos")
    res.send(result);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})