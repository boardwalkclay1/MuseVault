import { state, saveLocalState } from "./storage.js";

document.getElementById("profileName").value = state.profile.name;
document.getElementById("profileTagline").value = state.profile.tagline;

document.getElementById("saveProfile").addEventListener("click", () => {
  state.profile.name = document.getElementById("profileName").value;
  state.profile.tagline = document.getElementById("profileTagline").value;

  saveLocalState();
});
