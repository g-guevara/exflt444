import React from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { styles } from './styles/Search.styles';
import { Evento } from "./Search";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SearchResultsProps {
  isLoading: boolean;
  searchText: string;
  filteredEventos: Evento[];
  isDarkMode: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  isLoading, 
  searchText, 
  filteredEventos, 
  isDarkMode 
}) => {
  
  // Función para manejar la selección de un evento
  const handleEventSelection = (item: Evento) => {
    Alert.alert(
      "Agregar evento",
      `¿Quieres agregar "${item.Evento}" a tus eventos seleccionados?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Agregar",
          onPress: async () => {
            try {
              // Obtener eventos seleccionados actuales
              const jsonValue = await AsyncStorage.getItem("selectedEventos");
              let selectedEventos: Evento[] = [];
              
              if (jsonValue !== null) {
                selectedEventos = JSON.parse(jsonValue);
                
                // Verificar si el evento ya está seleccionado
                const isAlreadySelected = selectedEventos.some(e => e._id === item._id);
                
                if (isAlreadySelected) {
                  Alert.alert("Evento ya agregado", "Este evento ya está en tu lista de seleccionados.");
                  return;
                }
              }
              
              // Agregar el nuevo evento y guardar
              const updatedSelectedEventos = [...selectedEventos, item];
              await AsyncStorage.setItem("selectedEventos", JSON.stringify(updatedSelectedEventos));
              
              Alert.alert("Evento agregado", "El evento ha sido agregado a tu lista.");
            } catch (error) {
              console.error("Error al guardar evento seleccionado:", error);
              Alert.alert("Error", "No se pudo guardar tu selección.");
            }
          }
        }
      ]
    );
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={isDarkMode ? "#FFFFFF" : "#000000"} />
        </View>
      ) : searchText.trim() !== "" && filteredEventos.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={[styles.noResultsText, isDarkMode && styles.darkText]}>
            No se encontraron resultados para "{searchText}".
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredEventos}
          keyExtractor={(item) => item._id}
          style={styles.eventList}
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
              </Text>
            ) : null
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.cardEventItem,
                isDarkMode && styles.darkCardEventItem
              ]}
              onPress={() => handleEventSelection(item)}
            >
              <View style={styles.eventHeader}>
                <Text style={[styles.eventTitle, isDarkMode && styles.darkText]}>
                  {item.Evento}
                </Text>
              </View>
              
              <View style={styles.eventTimeContainer}>
                <Text style={[styles.eventTime, isDarkMode && styles.darkEventTime]}>
                  {item.Tipo} en {item.Campus}, {item.Inicio.substring(0, 5)} - {item.Fin.substring(0, 5)}
                </Text>
              </View>
              
              <View style={[styles.roomNumberContainer, isDarkMode && styles.darkRoomNumberContainer]}>
                <Text style={[styles.roomNumber, isDarkMode && styles.darkRoomNumber]}>
                  {item.Sala} 
                </Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={1}
        />
      )}
    </>
  );
};