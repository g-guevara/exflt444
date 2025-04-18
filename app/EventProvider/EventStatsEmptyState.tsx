// app/EventStatsEmptyState.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "../styles/Index.styles";

interface EventStatsEmptyStateProps {
  isDarkMode: boolean;
  navigation: NavigationProp<any>;
}

/**
 * Component to display when there are no events
 */
const EventStatsEmptyState: React.FC<EventStatsEmptyStateProps> = ({ 
  isDarkMode, 
  navigation 
}) => {
  return (
    <View style={styles.mainContentContainer}>
      <View style={{ height: 110 }} />
      <View style={styles.noEventsContainer}>
        <Text style={[styles.noEventsText, isDarkMode && styles.darkText]}>
          No tienes eventos para hoy.
        </Text>
        <TouchableOpacity
          style={styles.addEventsButton}
          onPress={() => navigation.navigate("Config" as never)}
        >
          <Text style={styles.addEventsButtonText}>
            Agregar eventos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventStatsEmptyState;