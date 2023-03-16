console.log("hello");
// function to fetch the response from the API
async function fetchToneResponse(tone) {
  const response = await fetch(`https://example-api.com/tone?tone=${tone}`);
  const data = await response.json();
  return data;
}

// function to update the gig description
function updateGigDescription(description) {
  const gigDescriptionInput = document.querySelector("#description");
  gigDescriptionInput.value = description;
}

// function to add the tone button
function addToneButton(tone) {
  const gigDescriptionDiv = document.querySelector(".description-wrapper");
  const toneButton = document.createElement("button");
  toneButton.innerText = tone;
  toneButton.onclick = async () => {
    const toneResponse = await fetchToneResponse(tone);
    updateGigDescription(toneResponse.description);
  };
  gigDescriptionDiv.appendChild(toneButton);
}

// main function to add all tone buttons
function addToneButtons() {
  const tones = ["formal", "casual", "friendly", "informative"];
  tones.forEach((tone) => addToneButton(tone));
}

// call the main function to add tone buttons
addToneButtons();
