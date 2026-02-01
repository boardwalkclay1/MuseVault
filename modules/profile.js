import { state, saveLocalState } from "./storage.js";

export function renderProfile(app) {
  app.innerHTML = `
    <h2>Profile</h2>

    <label>Name</label>
    <input id="profileName" value="${state.profile.name}" />

    <label>Tagline</label>
    <input id="profileTagline" value="${state.profile.tagline}" />

    <button id="saveProfile">Save</button>
  `;

  document.getElementById("saveProfile").addEventListener("click", () => {
    state.profile.name = document.getElementById("profileName").value;
    state.profile.tagline = document.getElementById("profileTagline").value;

    saveLocalState();
  });
}
