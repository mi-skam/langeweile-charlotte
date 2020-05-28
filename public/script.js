// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// define variables that reference elements on our page
const eintraegeListe = document.getElementById("eintraege");
const eintraegeForm = document.querySelector("form");


function neuenEintragHinzufuegen(eintrag) {
  const newListItem = document.createElement("p");
  newListItem.innerText = eintrag;
  eintraegeListe.append(newListItem);
  
}

// fetch the initial list of dreams
fetch("/eintraege")
  .then(response => response.json()) // parse the JSON from the server
  .then(eintraege => {
    // Platzhaltertext entfernen
    eintraegeListe.firstElementChild.remove();
  
    // alle eintraege werden hinzugefügt
    eintraege.forEach(neuenEintragHinzufuegen);
  
    // listen for the form to be submitted and add a new dream when it is
    eintraegeForm.addEventListener("submit", event => {
      // stop our form submission from refreshing the page
      event.preventDefault();

      // get dream value and add it to the list
      let neuerEintrag = eintraegeForm.elements.eintrag.value;
      eintraege.push(neuerEintrag);
      neuenEintragHinzufuegen(neuerEintrag);

      // reset form
      eintraegeForm.reset();
      eintraegeForm.elements.dream.focus();
    });
  });
