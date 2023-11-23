function countGivenArr(arr) {
    const counts = {};
  
    arr.forEach(obj => {
      const symbol = Object.keys(obj)[0];
      counts[symbol] = (counts[symbol] || 0) + obj[symbol];
    });
  
    return counts;
  }
//counts the number of matches of a symbol (excluding diagonal matches)in the arrays
function countMatched(nArray) {
    let totalConOcur = 0;
    let totalConOcurArr = [];
    for (let i = 0; i < nArray.length; i++) {
        for (let j = 0; j < nArray[i].length; j++) {
            const currentSymbol = nArray[i][j];
            let symbolOcur = 0;
            if (i > 0 && nArray[i - 1][j] === currentSymbol) { // Check top
                totalConOcur++;
                symbolOcur++;
                totalConOcurArr.push({[currentSymbol]: symbolOcur});
                continue;
            }

            if (i < nArray.length - 1 && nArray[i + 1][j] === currentSymbol) { // Check bottom
                totalConOcur++;
                symbolOcur++;
                totalConOcurArr.push({[currentSymbol]: symbolOcur});
                continue;
            }

            if (j > 0 && nArray[i][j - 1] === currentSymbol) { // Check left
                totalConOcur++;
                symbolOcur++;
                totalConOcurArr.push({[currentSymbol]: symbolOcur});
                continue;
            }

            if (j < nArray[i].length - 1 && nArray[i][j + 1] === currentSymbol) { // Check right
                totalConOcur++;
                symbolOcur++;
                totalConOcurArr.push({[currentSymbol]: symbolOcur});
                continue;
            }
            
        }
    }
    console.log(totalConOcurArr);
    console.log(countGivenArr(totalConOcurArr));
    return totalConOcurArr;
}


datasetArray = ['🍎','🥥','🥝','🍉','🌮','🍔','🍕','🍟','🥪'];

function createArrays(dataArr, dimension){
    //nxn array
    let finalArray = [];
    
    for(let i =0;i<dimension;i++){
        innerArray =[];
        for(let j = 0; j<dimension; j++){
            randomIndex =Math.floor((Math.random()*dataArr.length));
            innerArray.push(datasetArray[randomIndex]);
        }
        finalArray.push(innerArray);
    }
    return finalArray;
}


// const nestedArray = [
//     ['a', '*', '*', '*', '*'],
//     ['🍅', 'g', '*', 'd', 'h'],
//     ['🍅', 'g', '*', '*', 'h'],
//     ['*', '*', '*', 'i', 'j'],
//     ['k', 'l', 'm', 'n', 'o']
// ];


// ADDING ROWS AS PARA IN HTML:

function displayArrays(givenArr){
    rowsHTML = '';
    for(let row = 0; row< givenArr.length; row++){
        innerHTML = '<p>';

        for(let element = 0; element < givenArr[row].length; element++){
            let elementValue = givenArr[row][element];
            innerHTML += elementValue;
            innerHTML += ' ';
            // const html = `<p>${nestedArray[i]}</p>`;
        }
        innerHTML +='</p>'
        
        
        rowsHTML +=innerHTML;
    }
    console.log(rowsHTML);
    document.querySelector('.js-output-array').innerHTML = rowsHTML;
}

function displayMatchedCount(nArray){
    outputHTML = '';
    countedArray = countGivenArr(countMatched(nArray));
    for(let i = 0; i<Object.keys(countedArray).length; i++){
        outputHTML += `<p>${Object.keys(countedArray)[i]} matched ${Object.values(countedArray)[i]} times.</p>`;
    }
    document.querySelector('.js-display-matched-count').innerHTML = outputHTML;
}


function startGame(){
    nestedArray = createArrays(datasetArray, 7);
    displayArrays(nestedArray);
    displayMatchedCount(nestedArray);
    console.log(countMatched(nestedArray));
    
}

startGame()