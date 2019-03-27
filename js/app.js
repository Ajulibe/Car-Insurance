//variables 
const html = new HTMLUI()

const form = document.querySelector('#request-quote');






//eventlistners
eventlisteners();

function eventlisteners() {
    document.addEventListener('DOMContentLoaded', function() {
        html.getYear();
    })

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const make = document.querySelector('#make').value;
        const year = document.querySelector('#year').value;
        const level = document.querySelector('input[name="level"]:checked').value;
        if (make == "" || year == "" || level == "") {
            html.displayError('Make sure all the fields are completed')

        } else {
            //calculate the actual insurance
            const resultDiv = document.querySelector('.resultDiv');

            if (resultDiv != null) {
                resultDiv.remove();
            }
            const spinner = html.spinner();
            setTimeout(function() {
                const insuranceCal = new Insurance(make, year, level);
                const priceModel = insuranceCal.calculateQuotation(insuranceCal)
                html.showResults(insuranceCal, priceModel);
            }, 3000)


        }

    })
}



//main methods


function HTMLUI() {};

HTMLUI.prototype.getYear = function() {
    const max = new Date().getFullYear();
    let min = max - 20
    for (let i = max; i >= min; i--) {

        //seleect the year input
        const yearDiv = document.getElementById('year');
        //create an option tag
        const option = document.createElement('option');
        option.textContent = i
        yearDiv.appendChild(option)

    }

}


HTMLUI.prototype.spinner = function() {
    let spinner = document.querySelector('#loading img');
    spinner.style.display = 'block';
    setTimeout(function() {
        spinner.style.display = 'none';
    }, 3000)

}


HTMLUI.prototype.displayError = function(message) {
        const errorMessage = document.createElement('div');

        errorMessage.textContent = message;
        errorMessage.classList = 'error'
        errorMessage.classList = 'error'
        form.insertBefore(errorMessage, document.querySelector(".form-group"))
    }
    //create a message when any field is empty

//the message div


function Insurance(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;

}
Insurance.prototype.calculateQuotation = function(insuranceCal) {
    console.log(insuranceCal)
    const make = insuranceCal.make
    const Base = 2000;

    switch (make) {
        // note the switch statement makes use of values for the cases
        case "1":

            priceModel = Base * 1.2;
            break;
        case '2':

            priceModel = Base * 1.4
            break;
        case '3':

            priceModel = Base * 1.7
            break;

    }
    //calculate the year difference
    console.log(priceModel)
    const year = insuranceCal.year; //selects the present year
    const difference = this.yearDifference(year) //accetping the current year argument
    const PriceFinal = priceModel - (priceModel * 0.3 * difference);
    console.log(PriceFinal)
        //calculation for the level

    const level = insuranceCal.level //select hte level
    const levelswitch = insuranceCal.getlevelSwitch(insuranceCal, PriceFinal);
    return levelswitch;




}




HTMLUI.prototype.showResults = function(insuranceCal, priceModel) {

    let make = insuranceCal.make
    let level = insuranceCal.level



    switch (make) {
        case '1':
            make = "American";
            break;
        case '2':
            make = "Asian";
            break;
        case '3':
            make = "European";
            break;

    }


    const result = document.querySelector('#result');
    const Div = document.createElement('div');
    Div.classList = 'resultDiv'


    Div.innerHTML = `<p>TOTAL Insurance: $ ${priceModel}</p>
    <p> Make: ${make} </p>
    <p> level: ${level} </p> `
    result.appendChild(Div)


    console.log(Div)
}










Insurance.prototype.yearDifference = function(year) {
    return new Date().getFullYear() - year; //2019
}




Insurance.prototype.getlevelSwitch = function(insuranceCal, PriceFinal) {
    const level = insuranceCal.level //select hte level
    let priceMode
    switch (level) {
        case 'basic':
            priceMode = PriceFinal * 0.6;
            break;
        case 'Complete':
            priceMode = PriceFinal * 0.3;
            break;

    }
    return priceMode

}



///reduce every year
//price - yeardifferce*0.3ty