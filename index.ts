import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

import rooms from "./rooms.json";

// Definición de tipo Room
type Room = {
  roomNumber: number;
  roomType: string;
  bedType: string;
  roomFloor: string;
  photos: string[];
  description: string;
  offer: "YES" | "NO";   // si solo puede ser YES o NO
  price: number;
  discount: number;
  cancellation: string;
  amenities: string[];
};

app.get("/", (req, res) => {
  // Ordenar por precio
  rooms.sort((a, b) => a.price - b.price);

  // Convertir rooms a CSV
  const csvHeaders = Object.keys(rooms[0]).join(",") + "\n"; // ej: "id,name,price\n"

  const csvRows = rooms
    .map(room => Object.values(room).join(","))
    .join("\n");

  const csvData = csvHeaders + csvRows;

  // Guardar archivo CSV en la carpeta actual
  const filePath = path.join(__dirname, "rooms.csv");

  fs.writeFile(filePath, csvData, (err) => {
    if (err) {
      console.error("Error guardando archivo CSV:", err);
      return res.status(500).send("Error guardando CSV");
    }

    console.log("CSV guardado en", filePath);
    res.send(rooms); // O enviar un mensaje de éxito si prefieres
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

