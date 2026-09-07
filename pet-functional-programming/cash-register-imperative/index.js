const MONEY_VALUE = [["ONE HUNDRED", 10000], ["TWENTY", 2000], ["TEN", 1000], ["FIVE", 500], ["ONE", 100], ["QUARTER", 25] , ["DIME", 10], ["NICKEL", 5], ["PENNY", 1]];


function checkCashRegister(price, cash, cid) {
  const dueChangeDollars = parseFloat((cash - price).toFixed(2));
  const due = Math.round(dueChangeDollars * 100);


  const cidInCents = [];
  for (let i = 0; i < MONEY_VALUE.length; i++) {
    const name = MONEY_VALUE[i][0];
    const unitValue = MONEY_VALUE[i][1];

    let available = 0;
    for (let j = 0; j < cid.length; j++) {
      if (cid[j][0] === name) {
        available = Math.round(cid[j][1] * 100);
        break;
      }
    }

    cidInCents.push([name, available, unitValue]);
  }

  let totalCid = 0;
  for (let i = 0; i < cidInCents.length; i++) {
    totalCid += cidInCents[i][1];
  }

  if (totalCid < due) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (totalCid === due) {
    return { status: "CLOSED", change: cid };
  }

  let remainingDue = due;
  const change = [];

  for (let i = 0; i < cidInCents.length; i++) {
    const name = cidInCents[i][0];
    const available = cidInCents[i][1];
    const unitValue = cidInCents[i][2];

    if (remainingDue === 0) break;

    const maxUsable = Math.min(remainingDue, available);
    const amountToUse = Math.floor(maxUsable / unitValue) * unitValue;

    if (amountToUse === 0) continue;

    change.push([name, amountToUse / 100]);
    remainingDue -= amountToUse;
  }

  if (remainingDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: change };
}

// Pruebas
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));