require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  dbName: "uai-salas", // Asegura que esté conectando a la base de datos correcta
})

// Schema para la colección eventos (sin diaSemana por defecto)
const EventoSchema = new mongoose.Schema({
  Tipo: String,
  Evento: String,
  Fecha: String,
  Inicio: String,
  Fin: String,
  Sala: String,
  Edificio: String,
  Campus: String,
  fechaActualizacion: String
}, { strict: false });

// Schema para la colección all_eventos (incluye diaSemana)
const AllEventoSchema = new mongoose.Schema({
  Tipo: String,
  Evento: String,
  Fecha: String,
  Inicio: String,
  Fin: String,
  Sala: String,
  Edificio: String,
  Campus: String,
  fechaActualizacion: String,
  diaSemana: String,
  __v: Number
}, { strict: false });

const Evento = mongoose.model("Evento", EventoSchema, "eventos");
const AllEvento = mongoose.model("AllEvento", AllEventoSchema, "all_eventos");

// RUTA PARA OBTENER EVENTOS
app.get("/eventos", async (req, res) => {
  try {
    const eventos = await Evento.find();
    console.log(`Enviando ${eventos.length} eventos de la colección 'eventos'`);
    
    // Procesar para añadir el día de la semana de forma dinámica
    const processedEvents = eventos.map(event => {
      const eventObj = event.toObject();
      
      // Calcular el día de la semana si no existe
      if (!eventObj.diaSemana && eventObj.Fecha) {
        try {
          const fecha = new Date(eventObj.Fecha);
          const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
          eventObj.diaSemana = diasSemana[fecha.getDay()];
        } catch (error) {
          console.error(`Error al procesar la fecha para evento ${eventObj._id}:`, error);
        }
      }
      
      return eventObj;
    });
    
    res.json(processedEvents);
  } catch (err) {
    console.error("Error al obtener los datos:", err);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
});

// RUTA PARA OBTENER TODOS LOS EVENTOS
app.get("/all_eventos", async (req, res) => {
  try {
    // Eliminar cualquier límite implícito, establecer un límite alto explícitamente
    const allEventos = await AllEvento.find().limit(10000);
    
    // No es necesario procesar ya que all_eventos ya tiene diaSemana
    console.log(`Enviando ${allEventos.length} eventos de la colección 'all_eventos'`);
    res.json(allEventos);
  } catch (err) {
    console.error("Error al obtener los datos de all_eventos:", err);
    res.status(500).json({ error: "Error al obtener los datos de all_eventos" });
  }
});

// RUTA DE PRUEBA PARA VER SI EL SERVIDOR ESTÁ FUNCIONANDO
app.get("/", (req, res) => {
  res.send("Servidor funcionando en Vercel 🚀");
});

// Exportar `app` para Vercel
module.exports = app;