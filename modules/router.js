import { renderLibrary } from "./library.js";
import { renderPlaylists } from "./playlists.js";
import { renderProfile } from "./profile.js";

export function initRouter() {
  loadPage("library");

  window.addEventListener("hashchange", () => {
    const page = location.hash.replace("#", "") || "library";
    loadPage(page);
  });
}

function loadPage(page) {
  const app = document.getElementById("app");

  if (page === "library") return renderLibrary(app);
  if (page === "playlists") return renderPlaylists(app);
  if (page === "profile") return renderProfile(app);

  app.innerHTML = `<p>Page not found</p>`;
}
