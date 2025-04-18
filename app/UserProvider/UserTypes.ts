// app/UserTypes.ts
// Type definitions and helper functions

// Function to get day of week from date
export const obtenerDiaSemana = (fechaStr: string): string => {
    try {
      const fecha = new Date(fechaStr);
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return diasSemana[fecha.getDay()];
    } catch (error) {
      console.error("Error al obtener día de la semana:", error);
      return ''; // Return empty string on error
    }
  };
  
  // Event interface definition
  export interface Evento {
    _id: string;
    Tipo: string;
    Evento: string;
    Fecha: string;
    Inicio: string;
    Fin: string;
    Sala: string;
    Edificio: string;
    Campus: string;
    fechaActualizacion: string;
    diaSemana?: string; // Optional field
  }
  
  // Normalize text for search (remove accents, lowercase)
  export const normalizeText = (text: string | undefined | null): string => {
    if (text === undefined || text === null) {
      return ''; // Return empty string for undefined/null values
    }
    return text.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^\w\s]/gi, ''); // Remove special characters
  };