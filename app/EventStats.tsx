// app/EventStats.tsx
import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./styles/Index.styles";
import { useEventStats } from "./EventProvider/useEventStats";
import EventCard from "./EventProvider/EventCard";
import TimeGapIndicator from "./EventProvider/TimeGapIndicator";
import EventStatsEmptyState from "./EventProvider/EventStatsEmptyState";

interface EventStatsProps {
  isDarkMode: boolean;
  navigation: any;
}

const EventStats: React.FC<EventStatsProps> = ({ isDarkMode, navigation }) => {
  const { cardEvents, timeGaps, isLoading } = useEventStats(navigation);
  
  // Show empty state if no events and not loading
  if (cardEvents.length === 0 && !isLoading) {
    return <EventStatsEmptyState isDarkMode={isDarkMode} navigation={navigation} />;
  }
  
  return (
    <View style={styles.mainContentContainer}>
      {/* Add spacing at the top to prevent overlap with the date header */}
      <View style={{ height: 110 }} />
      
      {/* Event List with ScrollView */}
      <ScrollView
        style={styles.eventListContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.eventListContentContainer}
      >
        {cardEvents.map((event, index) => (
          <React.Fragment key={`event-block-${event.id}`}>
            {/* Event Card */}
            <EventCard event={event} />
            
            {/* Add time gap indicator if this isn't the last event */}
            {index < timeGaps.length && (
              <TimeGapIndicator 
                hoursDiff={timeGaps[index].hoursDiff} 
                minutesDiff={timeGaps[index].minutesDiff} 
              />
            )}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

export default EventStats;