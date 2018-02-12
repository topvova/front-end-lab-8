const UAHinEUR = 33.2090;
const UAHinUSD = 27.0585;

let currency = {};
let i = 1;

do {
    amount = +prompt('Enter amount ' + i + ', please:', '0');

    if (isNaN(amount)) {
        alert('Enter a number, please');
        continue;
    } else if (amount < 0) {
        alert('Enter a positive number, please');
        continue;
    }

    currency[i] = amount;
    i++;
} while (i <= 2);

function EURintoUAH(amount) {
    const result = (UAHinEUR * amount).toFixed(0);
    return amount + ' euros are equal ' + result + ' UAH, ';
}

function USDintoUAH(amount) {
    const result = (UAHinUSD * amount).toFixed(0);
    return amount + ' dollars are equal ' + result + ' UAH, ';
}

console.log(EURintoUAH(currency[1]) + USDintoUAH(currency[2]) +
    'one euro is equal ' + (UAHinEUR / UAHinUSD).toFixed(4) + ' dollars.');