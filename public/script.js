// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// define variables that reference elements on our page
const eintraegeListe = document.getElementById("answers").getElementsByClassName("slideshow")[0];
const eintraegeForm = document.querySelector("form");


function neuenEintragHinzufuegen(eintrag) {
  const newDivItem = document.createElement("div");
  newDivItem.classList.add("mySlides", "fade");
  const entryItem = document.createElement("p");
  const nameItem = document.createElement("p");

  entryItem.innerHTML = eintrag.eintrag;
  nameItem.innerHTML = eintrag.name;
  newDivItem.append(entryItem);
  newDivItem.append(nameItem);

  eintraegeListe.insertAdjacentElement('afterbegin', newDivItem)
}

// fetch the initial list of dreams
fetch("/eintraege")
  .then(response => response.json()) // parse the JSON from the server
  .then(eintraege => {
    // alle eintraege werden hinzugefügt
    eintraege.forEach(neuenEintragHinzufuegen);

    // listen for the form to be submitted and add a new dream when it is
    // eintraegeForm.addEventListener("submit", event => {
    //   // stop our form submission from refreshing the page
    //   event.preventDefault();

    //   // get dream value and add it to the list
    //   let neuerEintrag = eintraegeForm.elements.eintrag.value;
    //   eintraege.push(neuerEintrag);
    //   neuenEintragHinzufuegen(neuerEintrag);

    //   // reset form
    //   eintraegeForm.reset();
    //   eintraegeForm.elements.dream.focus();
    // });
  });
