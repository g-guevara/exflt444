import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  Linking, 
  TouchableWithoutFeedback
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "./ThemeContext";

interface MenuOption {
  title: string;
  url: string;
}

const menuOptions: MenuOption[] = [
  { title: "Sitio Oficial UAI", url: "https://www.uai.cl" },
  { title: "Portal del Alumno", url: "https://portal.uai.cl" },
  { title: "Moodle", url: "https://cursos.uai.cl" },
  { title: "Acerca De", url: "https://github.com/memoguevara" }
];

const MenuOptions = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { isDarkMode } = useTheme();

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
                      isDarkMode && styles.darkOptionBorder
                    ]}
                    onPress={() => openWebPage(option.url)}
                  >
                    <Text style={[
                      styles.optionText,
                      isDarkMode && styles.darkOptionText
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
});

export default MenuOptions;