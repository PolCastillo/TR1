// script.js
function flipCard(event) {
    event.stopPropagation(); // Evita que el clic en el botón de rotación también elimine la tarjeta
    const card = event.target.closest('.flashcard');
    if (card) {
        card.classList.toggle('flip');
    }
}

function addFlashcard() {
    const container = document.querySelector('.flashcard-container');
    const newCard = document.createElement('div');
    newCard.classList.add('flashcard');
    
    newCard.innerHTML = `
        <div class="front">
            <div class="flip-buttons">
                <button class="delete-btn" onclick="removeFlashcard(event)">×</button>
                <button class="rotate-btn" onclick="flipCard(event)">↔</button>
            </div>
            <textarea placeholder="Write your question here..."></textarea>
        </div>
        <div class="back">
            <div class="flip-buttons">
                <button class="delete-btn" onclick="removeFlashcard(event)">×</button>
                <button class="rotate-btn" onclick="flipCard(event)">↔</button>
            </div>
            <textarea placeholder="Write your answer here..."></textarea>
        </div>
    `;
    
    container.appendChild(newCard);
}


function removeFlashcard(event) {
    event.stopPropagation(); // Evita que el clic en el botón de eliminar también gire la tarjeta
    const card = event.target.closest('.flashcard');
    if (card) {
        card.remove();
    }
}
