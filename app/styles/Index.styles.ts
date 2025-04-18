import { StyleSheet, StatusBar, Platform } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    // Añadir padding para StatusBar cuando es translúcido
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: "#1a1a1a",
  },
  header: {
    marginTop: 20,
    marginBottom: 32,
    alignItems: "center",
  },
// Actualiza estos estilos en tu archivo Index.styles.ts

// Estilo para la primera línea del título
eventTitleFirstLine: {
  fontSize: 50,           // Tamaño inicial del texto (se reducirá si es necesario)
  fontWeight: '400',
  transform: [{ scaleY: 0.95 }], // Ajusta la altura ligeramente
  color: '#000000',
  letterSpacing: 0,       // Espaciado entre letras
  marginBottom: 0,        // Controla el espacio entre las dos líneas
  flexShrink: 1,          // Permitir que se encoja
  alignSelf: 'flex-start', // Alinea al inicio
  width: '100%',          // Ocupar todo el ancho disponible
},

// Contenedor para la primera línea del título
titleFirstLineContainer: {
  marginBottom: -5,      // Este margin debería funcionar en un View
  width: '100%',          // Ocupar todo el ancho disponible
  paddingRight: 10,       // Dar un poco de espacio al final
},
  // Actualiza estos estilos en tu archivo Index.styles.ts


// Contenedor para la primera línea del título

// Estilo para la segunda línea del título (ej: "MEETING")
eventTitleSecondLine: {
  fontSize: 23,           // Tamaño del texto (ajustado a 23 como pediste)
  transform: [{ scaleY: 0.95 }],
  fontWeight: '400',
  color: '#000000',
  letterSpacing: 0,       // Espaciado entre letras
  flexWrap: 'wrap',       // Permite que el texto haga wrapping
  flexShrink: 1           // Permite que el texto se encoja si necesita
},
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  darkTitle: {
    color: "#ecf0f1",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
  },
  darkSubTitle: {
    color: "#95a5a6",
  },
  darkText: {
    color: "#ecf0f1",
  },
  darkSubText: {
    color: "#95a5a6",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    minWidth: 150,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkStatCard: {
    backgroundColor: "#2c3e50",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 32,
  },
  mainButton: {
    backgroundColor: "#3498db",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkMainButton: {
    backgroundColor: "#2980b9",
  },
  mainButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
  leftSideContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  userIconButton: {
    padding: 5,
  },


  // Nuevos estilos para agregar a tu StyleSheet.create({})
// Agrega estos estilos al final de tu objeto de estilos existente

// Contenedor principal para mantener el espacio adecuado
mainContentContainer: {
  flex: 1,
  width: '100%',
},

// Añade o actualiza estos estilos en tu archivo Index.styles.ts

// Contenedor para el título completo
titleContainer: {
  marginBottom: 12,
  flex: 1,        // Asegura que el contenedor ocupe todo el espacio disponible
  maxWidth: '85%' // Limita el ancho para no chocar con otros elementos
},

// Columna derecha con detalles del evento
eventDetailsColumn: {
  flex: 1,
  paddingLeft: 15,
  justifyContent: 'center',
  width: '100%'   // Asegura que ocupe todo el ancho disponible
},

// Contenido de la tarjeta de eventos
eventCardContent: {
  flexDirection: 'row',
  alignItems: 'flex-start', // Cambiado a flex-start para mejor alineación
  width: '100%',
  paddingHorizontal: 5     // Añade un poco de padding para mejor espaciado
},

// Tarjeta de evento 
eventCard: {
  width: '100%',
  borderRadius: 33,
  padding: 15,
  marginBottom: 8,
  minHeight: 120          // Altura mínima para asegurar que quepa el contenido
},

// Reducir el margen superior para que la lista comience más arriba
eventListContentContainer: {
  marginTop: 15,
  paddingBottom: 20,
},

// Asegurar que el contenedor de la lista tenga flex:1 para ocupar todo el espacio disponible
eventListContainer: {
  flex: 1,
  width: '100%',
  marginVertical: 10,
},



// Columna izquierda con la información de tiempo
eventTimeColumn: {
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 1,
  width: 40,
},

// Estilo para los números de hora
timeNumber: {
  fontSize: 19,
  fontWeight: 'bold',
  color: '#000000',
  lineHeight: 32,
},

// Estilo para los minutos
timeMinutes: {
  fontSize: 15,

  color: '#000000',
  marginBottom: 4,
},
// Estilos actualizados para la sala con color coincidente

// Contenedor simple para la sala sin etiqueta
roomContainerSimple: {
  marginTop: 8,
},

// Badge/Pill para el número de sala
roomBadge: {
  backgroundColor: '#000000',
  borderRadius: 30,
  paddingHorizontal: 15,
  paddingVertical: 5,
  alignSelf: 'flex-start', // Hace que el badge tenga el ancho de su contenido
},

// Texto del número de sala - ahora sin color fijo
// El color se aplica dinámicamente en el componente para que coincida con el de la tarjeta
roomText: {
  fontSize: 16,
  fontWeight: 'bold',
  // El color se establece dinámicamente: color: event.color
},

// OPCIONAL: Variantes de estilo para el badge de la sala

// Opción 1: Badge más grande
roomBadgeLarge: {
  backgroundColor: '#000000',
  borderRadius: 40,
  paddingHorizontal: 18,
  paddingVertical: 8,
  alignSelf: 'flex-start',
},
// Línea divisoria vertical entre los tiempos de inicio y fin
timeVerticalDivider: {
  height: 19,
  width: 1,
  backgroundColor: '#000000',
  opacity: 0.5,
  marginVertical: 8,
},

// Contenedor para el área de la sala
roomContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 8,
},

// Etiqueta "Sala"
roomLabel: {
  fontSize: 12,
  color: '#000000',
  opacity: 0.7,
  marginRight: 10,
},


// Opción 2: Insignia con esquinas menos redondeadas
roomBadgeSquared: {
  backgroundColor: '#000000',
  borderRadius: 10,
  paddingHorizontal: 15,
  paddingVertical: 5,
  alignItems: 'center',
  justifyContent: 'center',
},

// Opción 3: Insignia con borde
roomBadgeWithBorder: {
  backgroundColor: '#000000',
  borderRadius: 30,
  paddingHorizontal: 15,
  paddingVertical: 5,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '#FFFFFF',
},
groupedEventCard: {
  borderWidth: 2,
  borderColor: '#FFFFFF',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 6,
},// Añade estos estilos a tu archivo Index.styles.ts

// Estilos para el indicador de lapso de tiempo entre eventos
timeGapContainer: {
  height: 60,
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 8,
  position: 'relative',
},
timeGapLine: {
  position: 'absolute',
  width: 2,
  height: '100%',
  backgroundColor: '#ccc',
  left: 23, // Alinear con el centro de la columna de tiempo
},
timeGapBadge: {
  backgroundColor: '#e6e6e6',
  borderRadius: 12,
  paddingHorizontal: 10,
  paddingVertical: 4,
  position: 'absolute',
  left: 35,
  borderWidth: 1,

},
timeGapText: {
  fontSize: 12,
  fontWeight: 'bold',
  color: '#666',
},
// Columna derecha con detalles del evento

titleSpacer: {
  height: 0, // Ajusta este valor para controlar el espacio
},

// Estilo del título del evento
eventTitleText: {
  fontSize: 50,

  fontWeight: '400',
  color: '#000000',

  letterSpacing: 1,
},

// Estilo del contenedor de participantes
eventParticipantsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
},

// Estilo para cada nombre de participante
eventParticipantText: {
  fontSize: 12,
  color: '#000000',
  marginRight: 16,
  marginBottom: 4,
  opacity: 0.8,
  letterSpacing: 0.5,
},

  // Add these new styles to your existing styles.js file

// New styles to add to your StyleSheet.create({})
// Just append these to your existing styles object


// Divider line between start and end times
timeDivider: {
  height: 1,
  width: 20,
  backgroundColor: '#000000',
  opacity: 0.5,
  marginVertical: 8,
},



// Event title styling


  // dateContainer: {j
  //   marginTop: 10,
  //   alignItems: "center",
  //   flexDirection: "row",
  // },
  // dateDay: {
  //   fontSize: 50,
  //   color: "#2c3e50",
  //   lineHeight: 70, // Asegura suficiente espacio vertical
  //   marginRight: 15, 
  //   fontWeight: "300",
    
  // },
  // dateMonth: {
  //   fontSize: 50,
  //   color: "#2c3e50",
  //   lineHeight: 70, // Asegura suficiente espacio vertical
  //   fontWeight: "300"
  // },
  dateTextContainer: {
    alignItems: "center", // Asegura que el texto esté centrado en columna
  },




  dateContainer: {
    alignItems: "flex-start", // Alinea todo a la izquierda
    justifyContent: "center",
    marginLeft: 10, // Margen para que no quede pegado al borde
  },
  
  dateWeekday: {
    fontSize: 18, // Reduce un poco el tamaño del texto
    color: "#2c3e50",
    marginBottom: 2, // Reduce el espacio entre el día de la semana y el número
    textAlign: "left",
    fontWeight: "400",
  },
  
  dateRow: {
    flexDirection: "row", // Alinea el número del día y el mes en la misma línea
    alignItems: "center", // Asegura que estén alineados correctamente
    gap: 10, // Reduce el espacio entre el número y el mes
  },
  
  dateDay: {
    fontSize: 45, // Reduce un poco el tamaño del número
    color: "#2c3e50",
    lineHeight: 50, // Reduce el espacio vertical
    fontWeight: "300",
    transform: [{ scaleY: 0.95 }], // Ajusta la altura ligeramente
  },
  
  dateMonth: {
    fontSize: 45, // Reduce el tamaño del mes
    color: "#2c3e50",
    lineHeight: 50, // Reduce el espacio vertical
    fontWeight: "300",
    transform: [{ scaleY: 0.95 }], // Ajusta la altura ligeramente
  },
  
  
  searchIconButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 5,
  },
  footerText: {
    fontSize: 14,
    color: "#7f8c8d",
  },

  // Add these styles to your existing styles object in Index.styles.js

// Event list styles
// eventListContainer: {
//   width: '100%',
//   marginVertical: 20,
// },
// eventCard: {
//   width: '100%',
//   borderRadius: 16,
//   padding: 15,
//   marginBottom: 12,
//   flexDirection: 'column',
// },
eventTimeContainer: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginBottom: 4,
},
eventTimeText: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#000000',
  marginRight: 10,
},


// // Main content container for proper spacing
// mainContentContainer: {
//   flex: 1,
//   width: '100%',
// },

// eventListContentContainer: {
//   marginTop: 100,

  
// },


// Modifica estos estilos en el archivo Index.styles.js


// Add these new styles to your existing styles.js file

// New styles to add to your StyleSheet.create({})
// Just append these to your existing styles object

// Time styling for matching the image design
timeRow: {
  flexDirection: 'row',
  marginBottom: 10,
},
timeBlock: {
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginRight: 10,
},
// Add these styles to your existing styles in Index.styles.ts

// Styles for when no events are selected
noEventsContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20,
  marginTop: 50,
},
noEventsText: {
  fontSize: 16,
  color: '#2c3e50',
  textAlign: 'center',
  marginBottom: 20,
},
addEventsButton: {
  backgroundColor: '#000',
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 50,
},
addEventsButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
},



});