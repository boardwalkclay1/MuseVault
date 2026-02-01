import { db } from "./storage.js";

let audio = new Audio();

export function playTrack(id) {
  const tx = db.transaction("tracks", "readonly");
  const req = tx.objectStore("tracks").get(id);

  req.onsuccess = () => {
    const track = req.result;
    if (!track) return;

    audio.src = track.blob;
    audio.play();
  };
}
