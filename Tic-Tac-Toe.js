const statusDisplay = document.querySelector('.game-status');  //game--status ünü tuttuğumuz elementimiz


let gameActive = true;
let currentPlayer = "X";  //başlangıçta default olarak "X" ten başlatıyoruz
let gameState = ["", "", "", "", "", "", "", "", ""];  //oyuncunun bulunduğu kutucuğu tutuyoruz


//Oyun sonucuna göre ekrana basılacak mesajlar.
const winningMessage = () => `Player ${currentPlayer} has won!🎉🎉`;
const drawMessage = () => `Game ended in a draw!🤝`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn🤓`;


statusDisplay.innerHTML = currentPlayerTurn();  //Hangi oyuncunun sırası ise onun bilgisi bastırılacak.


//"X" veya "O"ların 3x3'lük kutularda bulunma konumlarına göre bu şartları sağlayan oyuncu kazanır.
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Ekranda tıklanan kutucuğun bilgisini tutuyoruz ve önyüzde buna ilişkin değişiklik yapıyoruz ==> Kutucuğa "X" veya "O" bastırmak 
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

//"X" ve "O" olmasına göre sıranın hangi oyuncuda olduğunun durumunu ekrana bastırıyoruz ==> `It's ${currentPlayer}'s turn🤓`;
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
/*Burada 3'lü olarak "X"lerin veya "O"ların yerleştirildiği kutucuklardaki durumları tutularak kazanma 
şartlarını sağlayıp sağlamadıkları test ediliyor, eğer oyuncular ilgili sembolde 3 yerleştirme tamamlamadıysa oyun devam edecek durumu belirleniyor*/ 
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    //oyun bitti mi yine burada gamestate in doluluğuna göre kontrol ediyoruz
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
/*bu fonksiyona kadar gelindiyse eğer demek ki daha oyun bitmemiş ve oyuncuların 
eksik hamleleri var, buna bağlı olarak bu fonksiyon en son kim hamlesini yaptıysa sıradaki oyuncuya geçileceğinin fonksiyonu olarak çağırılır*/
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));  /*tıklanan kutucuğun indexine eriştiğimizde bize burada bir string dönüyor
fakat bize işlem yapabilmek için number type lazım bu yüzden "parseInt" kullanılır.*/

    if (gameState[clickedCellIndex] !== "" || !gameActive) {  //oyun devam ediyor mu diye kontrol yapılır.
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {  //Burada oyun yediden başlatılacağı için ilgili kutucuklar sıfırlanır ve ilgili elementlerin değeri default değerlerine döndürülür.
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);
 