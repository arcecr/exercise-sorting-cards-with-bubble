const cantInput = document.getElementById("cantInput");
const drawButton = document.getElementById("drawBtn");  
const sortButton = document.getElementById("sortBtn");


let cardsDeck = document.getElementById("cardsDeck");
let title = document.querySelector(".title");
let bubbleLogContainer = document.getElementById("bubbleLog");
let randomCards = 0; // Generated random cards


// Generate Random Cards; return object
const generateRandomCards = (cant) => {
  let suits = ['heart', 'spade', 'club', 'diamond'];
  let values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  let cards = []
  
  for (let i = 0; i < cant; i++) {
    let randomSuit = Math.floor(Math.random() * suits.length);
    let randomValue = Math.floor(Math.random() * values.length);
    
    cards.push({
      value: values.indexOf(values[randomValue]),
      text: values[randomValue],
      suit: suits[randomSuit]
    })
  }
  
  return cards;
}


// Generate Card DOM
const generateCardDOM = (obj) => {

  // Create card div
  let card = document.createElement("div");
  card.classList.add("card");
  card.classList.add(obj["suit"]);
  
  // Create paragraph of value
  const p = document.createElement("p");
  p.innerText = obj["value"];
  
  // Create i of FA Icon
  const suitTop = document.createElement("i");
  suitTop.classList.add("fas");
  suitTop.classList.add("fa-" + obj["suit"]);
  
  const suitBottom = suitTop.cloneNode();
  
  // Append to card div
  card.appendChild(suitTop);
  card.appendChild(p);
  card.appendChild(suitBottom);
  
  return card;
}


// Generate BubbleLog
const generateBubbleLogDOM = (obj, num) => {
  let bubbleLog = document.createElement("div");

  let iterationItem = document.createElement("div");
  iterationItem.classList.add("iteration");
  bubbleLog.appendChild(iterationItem);

  if (bubbleLogContainer.childNodes.length === 0) {
    bubbleLog.classList.add("iteration-0");
    iterationItem.innerText = "0";
  } else { 
    bubbleLog.classList.add(`iteration-${bubbleLogContainer.childNodes.length - 1 + 1}`);
    iterationItem.innerText = `${bubbleLogContainer.childNodes.length - 1 + 1}`;
  }

  obj.forEach((card) => {
    let cardDOM = generateCardDOM(card);
    bubbleLog.appendChild(cardDOM);
  });

  bubbleLogContainer.appendChild(bubbleLog);
}


// Draw 
let drawCardDeck = () => {
  if (!cantInput.value.length) {
    alert("Debe ingresar un número de cartas a generar...")
    return;
  }

  if (cardsDeck.childNodes.length) cardsDeck.innerHTML = ""

  randomCards = generateRandomCards(cantInput.value);

  randomCards.forEach((card) => {
    let cardDOM = generateCardDOM(card);
    cardsDeck.appendChild(cardDOM);
  });

  title.style.display = "none"
  cantInput.value = "";
  bubbleLogContainer.innerHTML = "";
}


// Sort
const sortCardDeck = () => {
  if (!randomCards.length) alert("Debe generar cartas...")
  if (randomCards.length >= 2) title.style.display = "block"

  let swapped;
  do {
    swapped = false;
    
    for (let i = 0; i < randomCards.length - 1; i++) {

      if (randomCards[i]['value'] > randomCards[i + 1]['value']) {
        let temp = randomCards[i];
          
        randomCards[i] = randomCards[i + 1]
        randomCards[i + 1] = temp;

        generateBubbleLogDOM(randomCards);

        swapped = true;
      }

    }

  } while(swapped);

}


drawButton.addEventListener("click", () => drawCardDeck());
sortButton.addEventListener("click", () => sortCardDeck());