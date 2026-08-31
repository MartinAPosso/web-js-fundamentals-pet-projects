
const MONEY_VALUE = [["ONE HUNDRED", 10000], ["TWENTY", 2000], ["TEN", 1000], ["FIVE", 500], ["ONE", 100], ["QUARTER", 25] , ["DIME", 10], ["NICKEL", 5], ["PENNY", 1]];

function sumTotalCid(cid){
    return cid.reduce((sum, [,value]) => sum + value, 0)
}

function calculateChange(cidInCents, due){
    return cidInCents.reduce((accumulator, [name, available, unitValue]) => {
        if(accumulator.due === 0) return accumulator;

        const maxUsable = Math.min(accumulator.due, available);
    
        const amountToUse = Math.floor(maxUsable / unitValue) * unitValue;
        
        if(amountToUse === 0) return accumulator;

        return {
            due: accumulator.due - amountToUse,
            change: [...accumulator.change, [name, amountToUse/100]]
        };
            
    }, { due: due , change: [] })
}

function checkCashRegister(price, cash, cid) {
    const dueChange = parseFloat((cash - price).toFixed(2));

    // Ordenando de mayor a menor el cid, y transformado su valor a centavos
    const cidInCents = MONEY_VALUE.map(([name, unitValue]) => {
        const found = cid.find(([cidName]) => cidName === name);
        const available = found?Math.round(found[1] * 100):0;
        return [name, available, unitValue];
    });

    // Calculando total de dinero en la caja 
    const totalCid = sumTotalCid(cidInCents);
    const due = Math.round(dueChange * 100);

    if(totalCid < due){
        return {status: 'INSUFFICIENT_FUNDS', change: []};
    }
    
    if(totalCid === due){
        return {status: 'CLOSED', change: cid};
    }
    
    const result = calculateChange(cidInCents, due);

    if(result.due > 0) return {status: 'INSUFFICIENT_FUNDS', change: []};

    return {status: 'OPEN', change: result.change};
}

// const resultadoFinal = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// console.log(resultadoFinal);


// const resultadoFinal2 = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// console.log(resultadoFinal2);

// const resultadoFinal3 = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

// console.log(resultadoFinal3);

const resultadoFinal4 = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

console.log(resultadoFinal4);

