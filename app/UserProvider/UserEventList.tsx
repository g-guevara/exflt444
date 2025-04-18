// app/UserEventList.tsx
import React from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { styles } from '../styles/User.styles';
import { Evento, obtenerDiaSemana } from "./UserTypes";

interface UserEventListProps {
  isLoading: boolean;
  searchText: string;
  filteredEventos: Evento[];
  selectedEventos: Evento[];
  isDarkMode: boolean;
  totalCount: number;
  toggleEventoSelection: (evento: Evento) => void;
}

const UserEventList: React.FC<UserEventListProps> = ({ 
  isLoading, 
  searchText, 
  filteredEventos, 
  selectedEventos,
  isDarkMode,
  totalCount,
  toggleEventoSelection
}) => {
  // Check if an event is already selected
  const isEventoSelected = (evento: Evento) => {
    return selectedEventos.some(e => e._id === evento._id);
  };

  // Render each event item
  const renderEventItem = ({ item }: { item: Evento }) => {
    // Get day of week, either from item or calculate it
    const diaSemana = item.diaSemana || obtenerDiaSemana(item.Fecha);
    
    return (
      <TouchableOpacity
        style={[
          styles.eventItem,
          isDarkMode && styles.darkEventItem,
          isEventoSelected(item) && (isDarkMode ? styles.darkSelectedEventItem : styles.selectedEventItem)
        ]}
        onPress={() => toggleEventoSelection(item)}
      >
        <View style={styles.eventContent}>
          <View style={styles.eventHeader}>
            <Text style={[styles.eventTitle, isDarkMode && styles.darkText]}>
              {item.Evento}
            </Text>
          </View>
          
          <Text style={[styles.eventDetails, isDarkMode && styles.darkEventDetails]}>
            {diaSemana}, {item.Campus}, {item.Inicio.substring(0, 5)} - {item.Fin.substring(0, 5)}
          </Text>
        </View>
        
        {isEventoSelected(item) && (
          <View style={[styles.selectionIndicator, isDarkMode && styles.darkSelectionIndicator]}>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDarkMode ? "#FFFFFF" : "#000000"} />
      </View>
    );
  }

  if (searchText.trim() !== "" && filteredEventos.length === 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={[styles.noResultsText, isDarkMode && styles.darkText]}>
          No se encontraron resultados para "{searchText}".
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredEventos}
      keyExtractor={(item) => item._id}
      style={styles.eventList}
      renderItem={renderEventItem}
      initialNumToRender={20}
      maxToRenderPerBatch={20}
      windowSize={10}
      removeClippedSubviews={true}
      ListEmptyComponent={
        !isLoading && filteredEventos.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={[styles.instructionText, isDarkMode && styles.darkText]}>
              No se encontraron eventos disponibles.
            </Text>
          </View>
        ) : null
      }
      ListHeaderComponent={
        filteredEventos.length > 0 ? (
          <Text style={[styles.resultsCount, isDarkMode && styles.darkText]}>
            {filteredEventos.length} resultado{filteredEventos.length !== 1 ? "s" : ""} encontrado{filteredEventos.length !== 1 ? "s" : ""} 
            {totalCount > 0 ? ` (de ${totalCount} totales)` : ''}
          </Text>
        ) : null
      }
    />
  );
};

export default UserEventList;