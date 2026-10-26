const liste = document.querySelector("#serien-liste");

async function ladeSerien() {
  const antwort = await fetch("/serien");
  const serien = await antwort.json();

  liste.replaceChildren();

  for (const serie of serien) {
    const eintrag = document.createElement("li");

    const anzeige = document.createElement("span");
    anzeige.textContent = `${serie.titel} – ${serie.status}`;

    const patchButton = document.createElement("button");
    patchButton.textContent = "Als abgeschlossen markieren";

    patchButton.addEventListener("click", async () => {
    await fetch(`/serien/${serie.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "abgeschlossen" }),
    });

    await ladeSerien();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";

    deleteButton.addEventListener("click", async () => {
        await fetch(`/serien/${serie.id}`, {
            method: "DELETE",
        });

        await ladeSerien();
    });

    eintrag.append(anzeige, " ", patchButton, " ", deleteButton);
    liste.append(eintrag);
  }
}

const formular = document.querySelector("#serien-form");
const titelFeld = document.querySelector("#titel");
const statusFeld = document.querySelector("#status");

formular.addEventListener("submit", async (event) => {
  event.preventDefault();

  const neueSerie = {
    titel: titelFeld.value,
    status: statusFeld.value,
  };

  await fetch("/serien", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(neueSerie),
  });

  titelFeld.value = "";
  await ladeSerien();
});

ladeSerien();