var billInput = document.querySelector("#bill-amount");
var cashInput = document.querySelector("#cash-given");
var nextButton = document.querySelector("#next-btn");
var button = document.querySelector("#btn");
var output = document.querySelector("#output");
var change = document.querySelector("#change");
//array of all denominations
var notes = [2000, 500, 100, 20, 10, 5, 1]; 
//array giving the number of bills/ notes of each denominations
var billNumber = [0, 0, 0, 0, 0, 0, 0]; 
//array of elements related to output
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

//buffer is difference between bill-amount and cash-given
//function to calculate change with min number of notes 
function balanceCalculator (buffer) {
    
    for(var i = 0; i < notes.length; i++) {

        if(parseInt(buffer / notes[i]) > 0) {
          
          billNumber[i] = parseInt(buffer / notes[i]);
          buffer = buffer - (notes[i] * parseInt(buffer / notes[i]));
        }
        else {
            billNumber[i] = 0;
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

    //redundancy if the user decides to run the app without reloading
    billAmount = parseInt(billInput.value);

    cashAmount = parseInt(cashInput.value);
   
    if(cashAmount < 0) {
        output.innerText = "cash amount can't be negative";
    } else if(billAmount < 0) {
        output.innerText = "bill amount can't be negative";
    } else if(cashAmount < 0 && billAmount < 0) {
        output.innerText = "bill and cash amounts can't be negative";
    }
    else {
        if(cashAmount > billAmount) {
            
            output.innerText = "give change like this to minimize number of notes";
            var buffer = cashAmount - billAmount;
            balanceCalculator(buffer);
        }
         else if(billAmount > cashAmount) {

            output.innerText = "take more to clear the balance...";
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