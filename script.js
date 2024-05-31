document.addEventListener('DOMContentLoaded', function () {
    fetchCatFacts()
      .then(displayCatFacts)
      .catch(handleError);
  });
  
  function fetchCatFacts() {
    return new Promise((resolve, reject) => {
      fetch('https://catfact.ninja/facts?limit=5')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch cat facts');
          }
          return response.json();
        })
        .then(data => {
          resolve(data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  function displayCatFacts(catFacts) {
    const catFactsContainer = document.getElementById('catFacts');
    catFacts.forEach(fact => {
      const factCard = createFactCard(fact.fact);
      catFactsContainer.appendChild(factCard);
    });
  }
  
  function createFactCard(factText) {
    const cardCol = document.createElement('div');
    cardCol.classList.add('col-md-6', 'mb-3');
  
    const card = document.createElement('div');
    card.classList.add('card');
  
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    const factParagraph = document.createElement('p');
    factParagraph.classList.add('card-text');
    factParagraph.textContent = factText;
  
    cardBody.appendChild(factParagraph);
    card.appendChild(cardBody);
    cardCol.appendChild(card);
  
    return cardCol;
  }
  
  function handleError(error) {
    console.error('Error fetching cat facts:', error);
    // Display error message on UI
  }
  