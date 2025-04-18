// app/EventCard.tsx
import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/Index.styles";
import { EventCardData } from "./EventStatsTypes";

interface EventCardProps {
  event: EventCardData;
}

/**
 * Component to render a single event card
 */
const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <View
      style={[
        styles.eventCard,
        { backgroundColor: event.color }
      ]}
    >
      <View style={styles.eventCardContent}>
        {/* Left side with times */}
        <View style={styles.eventTimeColumn}>
          {/* Start time */}
          <Text style={styles.timeNumber}>{event.startTime}</Text>
          <Text style={styles.timeMinutes}>{event.startMinutes}</Text>
          
          {/* Vertical Divider line */}
          <View style={styles.timeVerticalDivider} />
          
          {/* End time */}
          <Text style={styles.timeNumber}>{event.endTime}</Text>
          <Text style={styles.timeMinutes}>{event.endMinutes}</Text>
        </View>
        
        {/* Right side with event details */}
        <View style={styles.eventDetailsColumn}>
          {/* Event title split into two lines */}
          <View style={styles.titleContainer}>
            <View style={styles.titleFirstLineContainer}>
              <Text 
                style={styles.eventTitleFirstLine} 
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.5}
              >
                {event.titleFirstLine.toUpperCase()}
              </Text>
            </View>
            <Text 
              style={styles.eventTitleSecondLine} 
              numberOfLines={2} 
              ellipsizeMode="tail"
            >
              {event.titleSecondLine}
            </Text>
          </View>
          
          {/* Room display */}
          <View style={styles.roomContainerSimple}>
            <View style={styles.roomBadge}>
              <Text style={[styles.roomText, { color: event.color }]}>
                {event.room}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventCard;