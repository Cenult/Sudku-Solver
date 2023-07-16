const express = require("express")
const sudokuSolver = require("./scripts/sudoku");

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server started on localhost:${PORT}`);
})

app.set("view engine","ejs");

// Setting middlewares
app.use(express.static("public"));
app.use(express.json());


// Handlers
app.get("/", (req, res) => {
    res.render("index", {title: "Sudoku Solver"});
})

app.post("/solveSudoku", (req, res) => {
    console.log(req.body);
    const solution = sudokuSolver.initiate(req.body.sudoku);
    if (solution != false){
        res.json({solution})
    } else {
        res.json({error: "The board is unsolvable or invalid"});
    }
})
app.get("/aboutMe", (req,res) => {
    res.render("aboutMe", {title: "About Me"});
})
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")){
        res.render("404", {title: "Not Found"})
    } else if (req.accepts("json")) {
        res.json({error: "404: Not Found"})
    } else {
        res.send("404: Not Found")
    }
})

