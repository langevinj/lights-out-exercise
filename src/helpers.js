function getRandomTF(){
    return Math.floor(Math.random() * 2) === 0 ? true : false
}

function getSurroundingCells(y, x){
    const surroundingCoordinates = []
    surroundingCoordinates.push([y, x + 1])
    surroundingCoordinates.push([y, x - 1])
    surroundingCoordinates.push([y + 1, x])
    surroundingCoordinates.push([y - 1, x])
    return surroundingCoordinates;
}

export { getRandomTF, getSurroundingCells }