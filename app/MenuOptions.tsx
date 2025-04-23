import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  Linking, 
  TouchableWithoutFeedback,
  Alert,
  Share,
  Platform
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "./ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MenuOption {
  title: string;
  url?: string;
  action?: () => void;
  isShare?: boolean;
}

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

const MenuOptions = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { isDarkMode } = useTheme();

  // Función para compartir eventos seleccionados
  const shareSelectedEvents = async () => {
    try {
      // Cerrar modal primero
      setModalVisible(false);
      
      // Obtener eventos seleccionados
      const jsonValue = await AsyncStorage.getItem("selectedEventos");
      if (!jsonValue) {
        setTimeout(() => {
          Alert.alert("Sin eventos", "No tienes eventos seleccionados para compartir.");
        }, 300);
        return;
      }
      
      const selectedEvents: Evento[] = JSON.parse(jsonValue);
      if (selectedEvents.length === 0) {
        setTimeout(() => {
          Alert.alert("Sin eventos", "No tienes eventos seleccionados para compartir.");
        }, 300);
        return;
      }
      
      // Crear contenido de texto formateado
      let textContent = "MIS EVENTOS\n\n";
      
      selectedEvents.forEach((event, index) => {
        // Determinar día de la semana
        let diaSemana = event.diaSemana || "";
        if (!diaSemana && event.Fecha) {
          try {
            const fecha = new Date(event.Fecha);
            const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            diaSemana = diasSemana[fecha.getDay()];
          } catch (error) {
            console.error("Error al obtener día de la semana:", error);
          }
        }
        
        // Añadir evento al texto
        textContent += `## N${index + 1}. ${event.Evento}\n`;
        textContent += `   Tipo: ${event.Tipo}\n`;
        textContent += `   Día: ${diaSemana}\n`;
        textContent += `   Horario: ${event.Inicio.substring(0, 5)} - ${event.Fin.substring(0, 5)}\n`;
      });
      
      // Añadir pie de página
      textContent += "\nExportado desde la app Mis Salas ";
      
      // Compartir el contenido
      setTimeout(async () => {
        try {
          const result = await Share.share({
            message: textContent,
            title: "Mis Eventos UAI"
          });
          
          if (result.action === Share.sharedAction) {
            console.log("Contenido compartido exitosamente");
          }
        } catch (error) {
          console.error("Error al compartir eventos:", error);
          Alert.alert("Error", "No se pudieron compartir los eventos.");
        }
      }, 300);
      
    } catch (error) {
      console.error("Error preparando eventos para compartir:", error);
      setTimeout(() => {
        Alert.alert("Error", "Ocurrió un problema al preparar los eventos para compartir.");
      }, 300);
    }
  };

  const openWebPage = (url: string) => {
    // Cerrar el modal primero
    setModalVisible(false);
    
    // Usar setTimeout para dar tiempo a que el modal se cierre
    setTimeout(() => {
      // Intentar abrir la URL
      Linking.openURL(url).catch(err => {
        console.error(`Error al abrir la URL: ${url}`, err);
      });
    }, 300);
  };
  
  // Opciones del menú
  const menuOptions: MenuOption[] = [
    { title: "Compartir mis eventos", isShare: true, action: shareSelectedEvents },
    { title: "Sitio Oficial UAI", url: "https://www.uai.cl" },
    { title: "Portal del Alumno", url: "https://portal.uai.cl" },
    { title: "Moodle", url: "https://cursos.uai.cl" },
    { title: "Acerca De", url: "https://github.com/memoguevara" }
  ];

  return (
    <View>
      {/* Botón de tres puntos */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon 
          name="ellipsis-vertical" 
          size={24} 
          color={isDarkMode ? "#FFFFFF" : "#000000"} 
        />
      </TouchableOpacity>

      {/* Modal para el menú desplegable */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={[
                styles.modalContent,
                isDarkMode && styles.darkModalContent
              ]}>
                {menuOptions.map((option, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={[
                      styles.option,
                      index < menuOptions.length - 1 && styles.optionBorder,
                      isDarkMode && styles.darkOptionBorder,
                      option.isShare && styles.shareOption
                    ]}
                    onPress={() => {
                      if (option.action) {
                        option.action();
                      } else if (option.url) {
                        openWebPage(option.url);
                      }
                    }}
                  >
                    {option.isShare && (
                      <Icon 
                        name="share-outline" 
                        size={20} 
                        color={isDarkMode ? "#ffffff" : "#000000"} 
                        style={styles.shareIcon}
                      />
                    )}
                    <Text style={[
                      styles.optionText,
                      isDarkMode && styles.darkOptionText,
                      option.isShare && styles.shareText
                    ]}>
                      {option.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 5,
    marginTop: 50,
    marginRight: 10,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkModalContent: {
    backgroundColor: '#333333',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  darkOptionBorder: {
    borderBottomColor: '#444444',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  darkOptionText: {
    color: '#FFFFFF',
  },
  shareOption: {
    backgroundColor: '#000000',
    borderRadius:"2px",
  },
  shareText: {
    fontWeight: '500',
  },
  shareIcon: {
    marginRight: 10,
  },
});

export default MenuOptions;