// app/TimeGapIndicator.tsx
import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/Index.styles";

interface TimeGapIndicatorProps {
  hoursDiff: number;
  minutesDiff: number;
}

/**
 * Component to render the time gap between events
 */
const TimeGapIndicator: React.FC<TimeGapIndicatorProps> = ({ 
  hoursDiff, 
  minutesDiff 
}) => {
  // Don't show anything for small gaps
  if (hoursDiff === 0 && minutesDiff === 0) {
    return null;
  }
  
  return (
    <View style={styles.timeGapContainer}>
      <View style={styles.timeGapLine} />
      <View style={styles.timeGapBadge}>
        <Text style={styles.timeGapText}>
          {hoursDiff > 0 ? `${hoursDiff}h` : ""} 
          {minutesDiff > 0 ? `${minutesDiff}m` : ""}
        </Text>
      </View>
    </View>
  );
};

export default TimeGapIndicator;