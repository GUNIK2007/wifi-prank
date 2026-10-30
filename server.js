// Serveur Express minimal : il sert uniquement les fichiers du dossier "public".
// Il ne collecte, ne stocke et n'enregistre AUCUNE donnée sur les visiteurs.
const express = require("express");
const path = require("path");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.static(path.join(__dirname, "public")));

// Écoute sur 0.0.0.0 pour que d'autres appareils du même réseau puissent ouvrir le site
app.listen(PORT, "0.0.0.0", () => {
  console.log("\n  Wi-Fi Prank est lancé !\n");
  console.log(`  Sur cet ordinateur : http://localhost:${PORT}`);

  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        console.log(`  Sur le réseau local : http://${iface.address}:${PORT}`);
      }
    }
  }
  console.log("\n  Ctrl + C pour arrêter le serveur.\n");
});