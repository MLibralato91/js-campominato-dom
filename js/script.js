/*


Esercizio di oggi: Griglia Campo Minato


Consegna 1

L'utente clicca su un bottone che genererà una griglia di gioco quadrata.

Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.



 `<div class="square">1</div>`



Quando premo play l'utente inizia a giocare
easy = 100
normal = 81
hard = 49



width: calc(100% / 10);
height: calc(100% / 10);

CONSEGNA 2
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.


*/

const levelForm = document.getElementById('levelForm');
levelForm.addEventListener('submit', play);

function drawSquare(index, numSquares) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `calc(100% / ${numSquares})`;
    square.style.height = square.style.width;
    square.innerHTML = index;


    return square;
}
//funzionme per generare l'array delle bombe

function generateBombs(bombsnum, numsquares) {
    const bombs = [];


    while (bombs.length < bombsnum) {
        const bomb = getRndNumber(1, numsquares);
        if (!bombs.includes(bomb))
            // if che verifica che all'interno dell'array sia presente l'indice
            bombs.push(bomb);
    }

    return bombs;
}

function setMessage(message) {
    const score = document.getElementById('score');
    score.innerHTML = message;
}
function showAllBombs(bombs) {
    const squares = document.querySelectorAll('.square');
    for (let square of squares) {
        if (bombs.includes(parseInt(square.innerText))) {
            square.classList.add('squareUnsafe');
        }
    }
}
;
function play(e) {
    e.preventDefault();

    const playground = document.getElementById('playground');
    playground.innerHTML = '';
    const NUM_BOMBS = 16;
    let score = 0;
    let gameOver = false;
    //prendo il livello
    const level = document.getElementById('level').value;
    //console.log(level);
    let message = 'Selezione la difficoltà e premi PLAY!'
    setMessage(message)

    //Imposto il numero di celle a seconda del livello
    let squareNumbers;

    switch (level) {
        case 'easy':
            squareNumbers = 100;
            break;
        case 'normal':
            squareNumbers = 81;
            break;
        case 'hard':
            squareNumbers = 49;
            break;

    };
    //console.log(squareNumbers);

    //Determino il numero di celle per lato
    let squareForRow = Math.sqrt(squareNumbers);

    //Genera numeri casuali

    const bombs = generateBombs(NUM_BOMBS, squareNumbers);

    let maxScores = squareNumbers - NUM_BOMBS;
    //Ciclo per il numero di celle e genero la cella
    for (let i = 1; i <= squareNumbers; i++) {
        const square = drawSquare(i, squareForRow)

        //console.log(bombs.indexOf(i));
        //aggiunto evento click per colorale le square clickate
        square.addEventListener('click', function () {
            if (!gameOver) {
                if (bombs.includes(parseInt(this.innerText))) {
                    this.classList.add('squareUnsafe');
                    message = `Hai perso! il tuo punteggio è : ${score}`;
                    gameOver = true;
                    showAllBombs(bombs);
                    // this funziona in base al contesto in cui ci troviamo. In questo caso this è square.
                } else {

                    this.classList.add('squareSafe');
                    score++;
                    if (score === maxScores) {
                        message = `Hai vinto! il tuo punteggio è : ${score}`;
                    } else {
                        message = `il tuo punteggio è : ${score}`;
                    }
                }
                setMessage(message);

            }



        }); console.log(bombs[i])
        playground.appendChild(square);
    }




}