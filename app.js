var billInput = document.querySelector("#bill-amount");
var cashInput = document.querySelector("#cash-given");
var nextButton = document.querySelector("#next-btn");
var button = document.querySelector("#btn");
var output = document.querySelector("#output");
var change = document.querySelector("#change");
var notes = [2000, 500, 100, 20, 10, 5, 1];
var billNumber = [0, 0, 0, 0, 0, 0, 0];
var outputArray = [
    document.querySelector("#n2000"), 
    document.querySelector("#n500"),
    document.querySelector("#n100"),
    document.querySelector("#n20"),
    document.querySelector("#n10"),
    document.querySelector("#n5"),
    document.querySelector("#n1")
];
var billAmount = -1;
var cashAmount = -1;

function balanceCalculator (buffer) {
    
    for(var i = 0; i < notes.length; i++) {

        if(parseInt(buffer / notes[i]) > 0) {
          
          billNumber[i] = parseInt(buffer / notes[i]);
          buffer = buffer - (notes[i] * parseInt(buffer / notes[i]));
        }
    }
    for(var i = 0; i < outputArray.length; i++) {

        outputArray[i].innerText = billNumber[i];
    }
}

nextButton.addEventListener('click', function billAmountChangeHandler(e) {
   
    billAmount = parseInt(billInput.value);
  
    if(billAmount < 0) {
        output.innerText = "bill amount can't be negative"
    } else {
        cashInput.hidden = false;
        button.hidden = false;
        nextButton.hidden = true;
    }
});
button.addEventListener("click", function btnClickHandler() {

    cashAmount = parseInt(cashInput.value);
   
    if(cashAmount < 0) {

        output.innerText = "cash amount can't be negative";
    } else {
        if(cashAmount > billAmount) {
            
            output.innerText = "Give like this to minimize number of notes";
            var buffer = cashAmount - billAmount;
            balanceCalculator(buffer);
        }
         else if(billAmount > cashAmount) {

            output.innerText = "Take more to clear the balance...";
            var buffer = billAmount - cashAmount;
            balanceCalculator(buffer);
        } else if(billAmount === cashAmount) {
               
            output.innerText = "balance cleared!";
            for(var i = 0; i < outputArray.length; i++) {
                outputArray[i].innerText = "0";
            }
        }
        change.hidden = false;
    }
});