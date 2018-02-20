function initiateGame() {
    const colorsAllowed = ['R', 'J', 'B', 'O', 'V', 'N'],
        masterCombination = [];

    for (let i = 0; i < 4; i++) {
        let random = Math.floor(Math.random() * colorsAllowed.length);
        masterCombination.push(colorsAllowed[random]);
    }
    return {
        colors_allowed: colorsAllowed,
        master_combination: masterCombination
    };
}

let count = 0,
    counterGoodLetters = 0,
    counterMisplacedLetters = 0,
    startGame;

function testCombination() {
    count++;

    if (count === 1) {
        startGame = initiateGame();
    }

    let code = document.getElementById('code').value.toUpperCase().split('');

    // Vérifie la longueur du tableau
    if (code.length !== 4) {
        alert('Please enter 4 letters!');
        return;
    }

    // Vérifie les lettres non autorisées
    code.forEach(element => {
        if (!startGame.colors_allowed.includes(element)) {
            alert(element + ' is not a good letter. (R: Rouge, J: Jaune, B: Bleu, O: Orange, V: Vert, N: Noir)');
            return;
        }
    });

    //Game
    counterGoodLetters = 0;
    counterMisplacedLetters = 0;

    for (let i = 0; i < code.length; i++) {
        console.log(code[i]);
        console.error(startGame.master_combination[i]);

        if (code[i] === startGame.master_combination[i]) {
            counterGoodLetters++;
        } else {
            if (startGame.master_combination.indexOf(code[i]) !== -1) {
                counterMisplacedLetters++;
            }
        }
    }

    // Data Binding
    document.getElementById('good-letters-number').innerHTML = counterGoodLetters;
    document.getElementById('misplaced-letters-number').innerHTML = counterMisplacedLetters;
    document.getElementById('counter-turn').innerHTML = count;


    document.getElementById('previous-test').innerHTML +=
        code.join('') + ' ' + counterGoodLetters + ' ' + counterMisplacedLetters + '<br>';

    if (code.join('') === startGame.master_combination.join('')) {
        alert('you won !');
        location.reload();
    }

    if (code.join('') !== startGame.master_combination.join('') && count === 10) {
        alert('You lost !!!');
        startGame = initiateGame();
        count = 0;
        location.reload();
    }

}