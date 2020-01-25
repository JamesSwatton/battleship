const board = []

const horVert = [
    "horizontal", 
    "vertical"
]

function horizonatalOrVertical() {
    const randIndex= Math.floor(Math.random() * Math.floor(2));
    return horVert[randIndex];
}

console.log(horizonatalOrVertical());
