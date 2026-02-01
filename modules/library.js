import { state, saveLocalState, db } from "./storage.js";
import { playTrack } from "./player.js";

export function renderLibrary(app) {
  app.innerHTML = `
    <h2>Library</h2>

    <input type="file" id="fileInput" multiple accept="audio/*,video/*" />

    <div id="trackList"></div>
  `;

  document.getElementById("fileInput").addEventListener("change", handleFiles);

  renderTrackList();
}

function handleFiles(e) {
  const files = [...e.target.files];

  files.forEach((file) => {
    const id = "track_" + Date.now() + "_" + Math.random().toString(16).slice(2);

    const reader = new FileReader();
    reader.onload = () => {
      const track = {
        id,
        name: file.name.replace(/\.[^/.]+$/, ""),
        type: file.type.startsWith("video") ? "video" : "audio",
        blob: reader.result
      };

      const tx = db.transaction("tracks", "readwrite");
      tx.objectStore("tracks").put(track);

      state.tracks.push({ id, name: track.name, type: track.type });
      saveLocalState();
      renderTrackList();
    };

    reader.readAsDataURL(file);
  });
}

function renderTrackList() {
  const list = document.getElementById("trackList");
  if (!list) return;

  list.innerHTML = state.tracks
    .map(
      (t) => `
      <div class="track-row">
        <span>${t.name}</span>
        <button data-id="${t.id}" class="playBtn">Play</button>
      </div>
    `
    )
    .join("");

  document.querySelectorAll(".playBtn").forEach((btn) => {
    btn.addEventListener("click", () => playTrack(btn.dataset.id));
  });
}
