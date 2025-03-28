const baseURL = "http://localhost:3000/characters";


document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const name = document.getElementById("name");
    const image = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const form = document.getElementById("votes-form");
    const resetBtn = document.getElementById("reset-btn");

    let selectedCharacter = null;

    fetch(`${baseURL}`)
    .then(response => response.json())
    .then(characters => { 
        characters.forEach(character => { 
            const span = document.createElement("span");
            span.textContent = character.name;
            characterBar.appendChild(span);

            span.onclick = () => {
                selectedCharacter = character;
                name.textContent = character.name;
                image.src = character.image;
                image.alt = character.name;
                voteCount.textContent = character.votes;
            };
        });
    })
    .catch(err => console.log(err));

    let voteData = { count: 0 };


    
    form.onsubmit = (e) => {
        e.preventDefault();
        let votesInput = Number(document.getElementById("votes").value);

        if (selectedCharacter && votesInput) {
            voteData.count += votesInput;
            voteCount.textContent = voteData.count;

            fetch(`${baseURL}/${selectedCharacter.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ votes: voteData.count }),
            })
            .catch(err => console.log(err));
        }

        form.reset();
    };



    resetBtn.onclick = () => {
        if (!selectedCharacter) return;

        voteData.count = 0;
        voteCount.textContent = voteData.count;

        fetch(`${baseURL}/${selectedCharacter.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ votes: 0 }),
        })
        .catch(err => console.log(err));
    };
});// Your code here
