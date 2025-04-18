import React, { useEffect, useState } from "react";
import { View, Text, Switch, TouchableOpacity, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "./ThemeContext";
import { styles } from './styles/Config.styles';
import DataSyncInfo from "./DataProvider/DataSyncInfo";

// Definir el tipo de datos que vienen de la API
interface Evento {
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

// Función para obtener el día de la semana a partir de la fecha
const obtenerDiaSemana = (fechaStr: string): string => {
  try {
    const fecha = new Date(fechaStr);
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return diasSemana[fecha.getDay()];
  } catch (error) {
    console.error("Error al obtener día de la semana:", error);
    return ''; // En caso de error, devolver cadena vacía
  }
};

const Config = () => {
  const [selectedEventos, setSelectedEventos] = useState<Evento[]>([]);
  const { isDarkMode, toggleTheme, isThemeLoaded } = useTheme();
  const navigation = useNavigation();

  // Cargar eventos seleccionados
  useEffect(() => {
    loadSelectedEventos();
  }, []);

  // Cargar eventos seleccionados desde AsyncStorage
  const loadSelectedEventos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("selectedEventos");
      if (jsonValue !== null) {
        setSelectedEventos(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error("Error al cargar eventos seleccionados:", error);
    }
  };

  // Guardar eventos seleccionados en AsyncStorage
  const saveSelectedEventos = async (updatedSelectedEventos: Evento[]) => {
    try {
      const jsonValue = JSON.stringify(updatedSelectedEventos);
      await AsyncStorage.setItem("selectedEventos", jsonValue);
    } catch (error) {
      console.error("Error al guardar eventos seleccionados:", error);
    }
  };

  // Eliminar un evento seleccionado
  const removeEvento = (evento: Evento) => {
    Alert.alert(
      "Eliminar evento",
      `¿Estás seguro de que deseas eliminar "${evento.Evento}" de tus selecciones?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => {
            const updatedSelectedEventos = selectedEventos.filter(
              e => e._id !== evento._id
            );
            setSelectedEventos(updatedSelectedEventos);
            saveSelectedEventos(updatedSelectedEventos);
          },
          style: "destructive"
        }
      ]
    );
  };

  // Si el tema no se ha cargado aún, podríamos mostrar un spinner o nada
  if (!isThemeLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      
      <View style={styles.themeSection}>
        <View style={styles.themeToggleContainer}>
          <Text style={[styles.themeLabel, isDarkMode && styles.darkText]}>Modo oscuro</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: "#ddd", true: isDarkMode ? "#555" : "#ddd" }} // Color gris cuando está activado
            thumbColor={isDarkMode ? "#fff" : "#f4f3f4"} // Mantiene el color del "thumb" blanco
          />
        </View>
      </View>
      
      {/* Añadir componente DataSyncInfo */}
      <DataSyncInfo isDarkMode={isDarkMode} />

      <View style={styles.eventsSection}>
        <View style={styles.eventsSectionHeader}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Mis eventos ({selectedEventos.length})
          </Text>
          <TouchableOpacity
            style={styles.searchMoreButton}
            onPress={() => navigation.navigate("User" as never)}
          >
            <Text style={styles.searchMoreButtonText}>Buscar más</Text>
          </TouchableOpacity>
        </View>
        
        {selectedEventos.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={[styles.emptyStateText, isDarkMode && styles.darkText]}>
              No tienes eventos seleccionados.
            </Text>
            <TouchableOpacity
              style={styles.addFirstButton}
              onPress={() => navigation.navigate("User" as never)}
            >
              <Text style={styles.addFirstButtonText}>Agregar eventos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={selectedEventos}
            keyExtractor={(item) => item._id}
            style={styles.eventsList}
            renderItem={({ item }) => {
              // Obtener el día de la semana, ya sea del objeto o calculándolo desde la fecha
              const diaSemana = item.diaSemana || obtenerDiaSemana(item.Fecha);
              
              return (
                <View style={[styles.eventItem, isDarkMode && styles.darkEventItem]}>
                  <View style={styles.eventContent}>
                    <Text style={[styles.eventTitle, isDarkMode && styles.darkText]}>
                      {item.Evento}
                    </Text>
                    <Text style={[styles.eventDetails, isDarkMode && styles.darkSubText]}>
                      <Text style={[styles.dayOfWeek, isDarkMode && styles.darkSubText]}>
                        {diaSemana}
                      </Text>
                      {' • '}  {item.Inicio.substring(0, 5)} - {item.Fin.substring(0, 5)}
                    </Text>

                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeEvento(item)}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Config;