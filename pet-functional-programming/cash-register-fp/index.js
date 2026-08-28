
const MONEY_VALUE = [["ONE HUNDRED", 10000], ["TWENTY", 2000], ["TEN", 1000], ["FIVE", 500], ["ONE", 100], ["QUARTER", 25] , ["DIME", 1], ["NICKEL", 5], ["PENNY", 1]];

function sumTotalCid(cid){
    return cid.reduce((sum, [,value]) => sum + value, 0)
}


function checkCashRegister(price, cash, cid) {
    const dueChange = parseFloat((cash - price).toFixed(2));

    // Ordenando de mayor a menor el cid, y transformado su valor a centavos
    const cidInCents = MONEY_VALUE.map(([name, unitValue]) => {
        const found = cid.find(([cidName]) => cidName === name);
        // console.log(found);
        const available = found?Math.round(found[1] * 100):0;
        // console.log(available);
        return [name, available, unitValue];
    });

    // Calculando total de dinero en la caja 
    const totalCid = sumTotalCid(cidInCents);
    // console.log(totalCid);
    const due = Math.round(dueChange * 100);

    if(totalCid < due){
        return {status: 'INSUFFICIENT_FUNDS', change: []};
    }
    
    if(totalCid === due){
        return {status: 'CLOSED', change: cid};
    }
    
    const result = cidInCents.reduce((accumulator, [name, available, unitValue]) => {
        if(accumulator.due === 0) return accumulator;

        const maxUsable = Math.min(accumulator.due, available);
        // console.log(maxUsable);
        const amountToUse = Math.floor(maxUsable / unitValue) * unitValue;
        // console.log("amount to use " + amountToUse);

        if(amountToUse === 0) return accumulator;

        return {
            due: accumulator.due - amountToUse,
            change: [...accumulator.change, [name, amountToUse/100]]
        };
            
    }, { due: due , change: [] })



    return {status: 'OPEN', change: result.change};
}

cosnt = resultadoFinal = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
console.log(resultadoFinal);


cosnt = resultadoFinal2 = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
console.log(resultadoFinal2);



