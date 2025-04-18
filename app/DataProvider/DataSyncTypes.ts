// Define the interface for events
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
    diaSemana?: string;
  }