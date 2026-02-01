import { state } from "./storage.js";

const preview = document.getElementById("preview");

preview.innerHTML = `
  <h1>${state.profile.name}</h1>
  <p>${state.profile.tagline}</p>

  <h3>Tracks</h3>
  <ul>
    ${state.tracks.map(t => `<li>${t.name}</li>`).join("")}
  </ul>

  <h3>Playlists</h3>
  <ul>
    ${state.playlists.map(pl => `<li>${pl.name}</li>`).join("")}
  </ul>
`;
