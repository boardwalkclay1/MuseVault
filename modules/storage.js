export let db;
export let state = {
  tracks: [],
  playlists: [],
  profile: {
    name: "Your Name",
    tagline: "Your sound, your page, your rules."
  }
};

export function initStorage() {
  loadLocalState();
  initDB();
}

function loadLocalState() {
  const raw = localStorage.getItem("musevault_state");
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    state = { ...state, ...parsed };
  } catch (e) {}
}

export function saveLocalState() {
  localStorage.setItem("musevault_state", JSON.stringify(state));
}

function initDB() {
  const req = indexedDB.open("musevault_db", 1);

  req.onupgradeneeded = (e) => {
    db = e.target.result;
    db.createObjectStore("tracks", { keyPath: "id" });
  };

  req.onsuccess = (e) => {
    db = e.target.result;
  };
}
