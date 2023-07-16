const sudokuUnsolved = document.querySelector(".sudoku-unsolved");




for (let i = 0; i < 9*9; i++){
    const entry = document.createElement("input");
    entry.className = "entry";
    entry.setAttribute("type","number");
    entry.setAttribute("maxLength", "1");
    entry.setAttribute("max", "9");
    entry.setAttribute("min","1");

    sudokuUnsolved.append(entry);
}

document.getElementById("solve").addEventListener("click" , async (event) => {
    const entries = document.getElementsByClassName("entry");
    let problem = "";
    for (let entry of entries){
        let value = parseInt(entry.value);
        if(value != NaN && value >= 1 && value <= 9 && !entry.classList.contains("entrySolved")) {
            problem = problem + value;
        } else {
            problem += ".";
        }
    }
    // console.log("Sudoku:",problem);
    try {
        const response = await fetch("/solveSudoku", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({"sudoku":problem})
        })
        const data = await response.json()
        
        if (data.error) {
            document.querySelector(".sudokuError").textContent = "Error: "+data.error;
        }
        if (data.solution){
            console.log(data.solution);
            for (let i=0; i < 81; i++){
                if (entries[i].value != data.solution.charAt(i) || entries[i].classList.contains("entrySolved")){
                    entries[i].classList.add("entrySolved");
                    entries[i].value = data.solution.charAt(i);
                }
            }
        }
    } catch (error){
        console.log(error);
    }
    
})

document.querySelector(".sudoku-unsolved").addEventListener("click", (event) => {

    if (event.target.classList.contains("entrySolved")){
        event.target.classList.remove("entrySolved");
    }
})
document.getElementById("clear-board").addEventListener("click",()=> {
    const entries = document.getElementsByClassName("entry");
    for (let entry of entries) {
        entry.classList.remove("entrySolved");
        entry.value = "";
    }
})

document.getElementById("clear-solution").addEventListener("click" , ()=> {
    const entries = document.getElementsByClassName("entry");

    for (let entry of entries){
        if (entry.classList.contains("entrySolved")){
            entry.classList.remove("entrySolved");
            entry.value = "";
        }
    }
})