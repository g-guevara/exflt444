import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF", // Fondo claro por defecto
  },
  darkContainer: {
    backgroundColor: "#1a1a1a", // Fondo oscuro
  },
  
  // Sección de tema
  themeSection: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  themeToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  darkText: {
    color: "#FFFFFF",
  },
  
  // Sección de eventos
  eventsSection: {
    flex: 1,
  },
  eventsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  searchMoreButton: {
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
  },
  searchMoreButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  
  // Eventos
  eventsList: {
    flex: 1,
  },
  eventItem: {
    backgroundColor: "#F2F2F7",
    marginBottom: 10,
    borderRadius: 24,
    padding: 10,
    borderWidth: 1,
    borderColor: "#F2F2F7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  darkEventItem: {
    backgroundColor: "#2C2C2E",
    borderColor: "#2C2C2E",
    borderWidth: 2,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 2,
  },
  eventDetails: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 2,
    fontStyle: "italic",
  },
  dayOfWeek: {
    fontWeight: "500", // Make the day of week slightly bolder
    fontStyle: "italic",
  },
  eventLocation: {
    fontSize: 14,
    color: "#95a5a6",
  },
  darkSubText: {
    color: "#95a5a6",
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  // Estado vacío
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 16,
  },
  addFirstButton: {
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
  },
  addFirstButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});