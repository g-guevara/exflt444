import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#00000",
  },
  darkContainer: {
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 20,
    marginBottom: 16,
  },
  darkTitle: {
    color: "#ecf0f1",
  },
  darkText: {
    color: "#FFFFFF",
  },
  darkSubText: {
    color: "#95a5a6",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 12,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#000000",
  },
  darkSearchContainer: {
    borderColor: "#FFFfFF",
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 18,
    color: "#2c3e50",
  },
  darkSearchInput: {
    backgroundColor: "#1a1a1a",
    color: "#FFFFFF",
  },
  // Filter section styles
  filtersScrollView: {
    flexGrow: 0,
    marginBottom: 12,
  },
  filtersContainer: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  filterDropdownContainer: {
    marginRight: 16,
  },
  filterLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    marginBottom: 4,
    marginLeft: 4,
  },
  chipScrollView: {
    maxHeight: 40,
  },
  
  // Search results styles
  searchButton: {
    backgroundColor: "#3498db",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  noResultsText: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
  },
  resultsCount: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 12,
  },
  eventList: {
    flex: 1,
  },
  
  // Card event item styles
  cardEventItem: {
    backgroundColor: "#F2F2F7",
    marginBottom: 10,
    borderRadius: 24, // Más redondeado como en la imagen
    padding: 10,
    borderWidth: 1,
    borderColor: "#F2F2F7",
  },
  darkCardEventItem: {
    backgroundColor: "#2C2C2E",
    borderColor: "#2C2C2E",
    borderWidth: 2,
  },
  eventHeader: {
    marginBottom: 2,
  },
  eventTitle: {
    fontSize: 16, // Tamaño más grande para el título
    fontWeight: "bold",
    color: "#2c3e50",
  },
  eventTimeContainer: {
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 14, // Tamaño medio para el horario
    color: "#7f8c8d",
    fontStyle: "italic",
  },
  darkEventTime: {
    color: "#FFFFFF",
    fontStyle: "italic",
  },
  roomNumberContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#000",
    borderRadius: 50,
    paddingVertical: 1,
    marginTop: 2,
    paddingHorizontal:12,
  },
  darkRoomNumberContainer: {
    marginTop: 2,
    backgroundColor: "#FFFFFF",
  },
  roomNumber: {
    fontSize: 15, // Tamaño para el número de sala
    fontWeight: "bold",
    color: "#fff",
  },
  darkRoomNumber: {
    color: "#000",
  },
  
  // Estilos originales que mantener
  eventItem: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 1,
  },
  darkEventItem: {
    backgroundColor: "#2c3e50",
    borderColor: "#34495e",
  },
  selectedEventItem: {
    backgroundColor: "#e8f4fd",
    borderColor: "#3498db",
  },
  darkSelectedEventItem: {
    backgroundColor: "#2980b9",
    borderColor: "#3498db",
  },
  eventContent: {
    flex: 1,
  },
  
  eventType: {
    fontSize: 14,
    color: "#3498db",
    marginBottom: 4,
    fontStyle: "italic",
  },
  eventDetails: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#95a5a6",
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  footerButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  instructionText: {
    textAlign: "center",
    fontSize: 16,
    color: "#34495e",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontStyle: "italic",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  darkFooterButton: {
    backgroundColor: "#2c3e50",
    borderColor: "#34495e",
  },
  footerButtonText: {
    color: "#2c3e50",
    fontWeight: "bold",
  },
  darkFooterButtonText: {
    color: "#ecf0f1",
  },
});