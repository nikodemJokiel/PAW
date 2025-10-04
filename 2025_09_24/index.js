const readline = require('node:readline');

const rl = readline.createInterface({
    input :process.stdin,
    output: process.stdout,
});

const Add = (a, b) => {
    return a + b;
}

const Subtract = (a, b) => {
    return a - b;
} 

const Divide = function(a, b) {
    if(b == 0) {
        console.error("You can't divide by zero");
        return;
    }
    else{
        return a / b;
    }
}

function Multiply(a, b){
    return a * b;
}


const Input = (message) => {
    return new Promise(resolve => {
        rl.question(message, value => {
            resolve(value);
        });
    });
}

let exit = false;


(async () => {

    while(!exit){

        let a = await Input("First number: ");
        let b = await Input("Second number: ");
        let choice = await Input(`Choose operation: \n1. Add \n2. Subtract \n3. Multiply \n4. Divide\n`);

        a = Number(a);
        b = Number(b);
            
        switch(choice){
            case "1":
                console.log(Add(a, b));
                break;
            case "2":
                console.log(Subtract(a, b));
                break;
            case "3":
                console.log(Multiply(a, b));
                break;
            case "4":
                console.log(Divide(a, b));
                break;
            default:
                console.log("error - wrong input");
        }

        temp = await Input("Do you want to exit? (y/n): ");
        exit = (temp === 'y');
    }
    rl.close();
})();




