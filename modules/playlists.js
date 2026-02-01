import { state, saveLocalState } from "./storage.js";

document.getElementById("createPlaylist").addEventListener("click", () => {
  const name = document.getElementById("playlistName").value.trim();
  if (!name) return;

  state.playlists.push({
    id: "pl_" + Date.now(),
    name,
    trackIds: []
  });

  saveLocalState();
  renderPlaylistList();
});

renderPlaylistList();

function renderPlaylistList() {
  const list = document.getElementById("playlistList");
  list.innerHTML = state.playlists
    .map(
      (pl) => `
      <div class="playlist-card">
        <strong>${pl.name}</strong>
        <span>${pl.trackIds.length} tracks</span>
      </div>
    `
    )
    .join("");
}
