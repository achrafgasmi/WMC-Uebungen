const myarray = [1, 7, 4, 2, 8, 3, 13, 11];


const evenNumbers = myarray.filter(x => x % 2 === 0);
console.log(`Even Numbers in Array: ${evenNumbers}`);


const oddNumbers = myarray.filter(x => x % 2 !== 0);
console.log(`Odd Numbers in Array: ${oddNumbers}`);


//Uebung1

//- Modifizieren Sie filter....ts so,
//  dass alle Zahlen, die NICHT durch 3 teilbar sind, ausgegeben werden.

// LambdaAusdruck:
const notDivisibleBy3 = myarray.filter(x => x % 3 !== 0);
console.log(`Numbers not divisible by 3 in Array: ${notDivisibleBy3}`);

//eigenständige function
function NotDivisibleBy3Function (x: number): boolean{
    return x % 3 !== 0;
}
console.log(`Numbers not divisible by 3 in Array: ${myarray.filter(NotDivisibleBy3Function)}`);



//- Alle Zahlen, welche prim sind

// LambdaAusdruck:
const isPrime = (x : number) : boolean =>{
    if (x <= 1) return false;
    for (let i = 2; i <= Math.sqrt(x); i++) {
        if (x % i === 0) return false;
    }
    return true;
};
console.log(`Prime Numbers in Array: ${myarray.filter(isPrime)}`);

//eigenständige function:
function isPrimeFunction(x: number): boolean {
    if (x <= 1) return false;
    for (let i = 2; i <= Math.sqrt(x); i++) {
        if (x % i === 0) return false;
    }
    return true;
}
console.log(`Prime Numbers in Array: ${myarray.filter(isPrimeFunction)}`);