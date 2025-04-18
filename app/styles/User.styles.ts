import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#00000", // Matching Search background color
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
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 24,
  },
  darkText: {
    color: "#FFFFFF",
  },
  darkSubText: {
    color: "#95a5a6",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 12, // Reduced to make space for filters
    borderRadius: 50, // Rounded search bar like Search
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#000000",
  },
  darkSearchContainer: {
    borderColor: "#FFFFFF",
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
  eventList: {
    flex: 1,
  },
  // Card-style event items like in Search
  eventItem: {
    backgroundColor: "#F2F2F7",
    marginBottom: 10,
    borderRadius: 24, // More rounded corners like in Search
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
  selectedEventItem: {
    backgroundColor: "#e6e6e6",
    borderColor: "#000000",
  },
  darkSelectedEventItem: {
    backgroundColor: "#333333",
    borderColor: "#FFFFFF",
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 2, // Reduced margin to match Search design
  },
  eventHeader: {
    marginBottom: 2,
  },
  eventDetails: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 2,
    fontStyle: "italic", // Matching the italic style in Search
  },
  darkEventDetails: {
    color: "#FFFFFF",
    fontStyle: "italic",
  },
  eventLocation: {
    fontSize: 14,
    color: "#95a5a6",
  },
  // Room number badge like in Search
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#000", // Changed to match the dark badge in Search
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  darkSelectionIndicator: {
    backgroundColor: "#FFFFFF",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "normal",
  },
  darkCheckmark: {
    color: "#000",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  darkFooter: {
    borderTopColor: "#34495e",
  },
  selectedCount: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  darkSelectedCount: {
    color: "#ecf0f1",
  },
  configButton: {
    backgroundColor: "#000", // Changed to match the dark styling of Search
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50, // Rounded like the Search components
  },
  darkConfigButton: {
    backgroundColor: "#FFFFFF",
  },
  configButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  darkConfigButtonText: {
    color: "#000",
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
  
  // Filter styles (added from Search.styles.ts)
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
});