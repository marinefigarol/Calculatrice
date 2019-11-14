// Fonction qui inialise les constantes
function init() {
    firstPart = secondPart = 0;
    operator = null ;
    operation = false ;
}

// Fonction permettant de réinitialiser l'affichage
function cleanAll() {
    display.value = '0';
    init();
}

// Fonction permettant de supprimer le dernier chiffre entré
function cleanOne() {
    display.value.length===1?display.value=0:display.value = display.value.substring(0, display.value.length-1);
}

// Fonction permettant d'afficher le chiffre entré
function write() {
    if (this.id === 'point') {
        if (Number.isInteger(parseFloat(display.value))) {
            display.value += this.firstChild.textContent ;
        } else {
            display.value = '0' + this.firstChild.textContent ;
        }
        operation = false ;
    }
    else if (display.value === '0') {
        display.value=this.firstChild.textContent ;
    }
    else if (operation === true) {
        display.value=this.firstChild.textContent ;
        operation = false ;
    } else {
        display.value += this.firstChild.textContent ;
    }
}

// Fonction qui réalise le calcul
function compute(first, second, op) {
    if (op === '+' || op === null) {
        return(first + second) ;
    }
    else if (operator === '-') {
        return(first - second) ;
    }
    else if (operator === '×') {
        return(first * second) ;
    }
    else if (operator === '÷') {
        return(first / second) ;
    }
}

// Réalise le calcul lorsque l'on appuie sur '='
function finalCompute() {
    secondPart = parseFloat(display.value) ;
    operation = true ;
    display.value = compute(firstPart, secondPart, operator) ;
    firstPart = secondPart = 0 ;
    operator = null ;
}

// Réalise les opération lorsqu'on appuie sur un opérateur
function makeOperation() {
    if ((display.value === '0' && operator === null && operation === false) || (operator != null && operation === true)) {
        return ;
    }
    operation = true ;
    firstPart = compute(firstPart, parseFloat(display.value), operator) ;
    operator = this.firstChild.textContent ;
}


// Récupération des boutons de la calculatrice et de l'input d'affichage
const button_list = document.getElementsByTagName('button'),
    display = document.getElementById('display');

var firstPart, secondPart, operator, operation;
init() ;

for (var i=0, c=button_list.length ; i<c ; i++) {
    // Bouton qui efface tout
    if (button_list[i].id == 'clean') {
        button_list[i].addEventListener('click', cleanAll);
    }
    // Bouton qui supprime la dernière entrée
    else if (button_list[i].id == 'erase') {
        button_list[i].addEventListener('click', cleanOne);
    }
    // bouton avec un chiffre
    else if (button_list[i].className == 'number') {
        button_list[i].addEventListener('click', write);
    }
    // Bouton égal
    else if (button_list[i].id == 'equal') {
        button_list[i].addEventListener('click', finalCompute);
    }
    // Bouton d'opération
    else if (button_list[i].className == 'operator') {
        button_list[i].addEventListener('click', makeOperation);
    }
}