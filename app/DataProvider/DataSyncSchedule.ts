import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './DataSyncConstants';
import { fetchAndSaveEvents } from './DataSyncFetch';
import { getScheduledUpdateTime } from './DataSyncUtils';

/**
 * Check if we need to sync data based on the scheduled time
 */
export async function checkAndSyncData(): Promise<void> {
  try {
    const lastSyncDateStr = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SYNC_DATE);
    const lastSuccessfulSyncDateStr = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SUCCESSFUL_SYNC_DATE);
    const { hour, minutes } = await getScheduledUpdateTime();
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    
    // Get the date part only (year, month, day) for comparison
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // If it's the first time or we're at the scheduled time, sync the data
    if (!lastSyncDateStr || (currentHour === hour && currentMinutes === minutes)) {
      console.log('Time to sync data!');
      await fetchAndSaveEvents();
      return;
    }
    
    // Handle failed attempts
    if (lastSyncDateStr && !lastSuccessfulSyncDateStr) {
      console.log('Previous sync attempt detected but no successful sync record, trying again');
      await fetchAndSaveEvents();
      return;
    }
    
    await checkMissedSyncToday(lastSyncDateStr, hour, minutes, nowDate);
  } catch (error) {
    console.error('Error checking and syncing data:', error);
  }
}

/**
 * Check sync timing based on last successful sync date
 */
export async function checkSyncTiming(lastSuccessfulSyncStr: string): Promise<void> {
  const lastSuccessfulSync = new Date(lastSuccessfulSyncStr);
  const now = new Date();
  
  // Calculate days difference
  const daysDifference = Math.floor((now.getTime() - lastSuccessfulSync.getTime()) / (1000 * 60 * 60 * 24));
  
  // If more than 1 day has passed since the last successful sync
  // This likely means the device was turned off during scheduled syncs
  if (daysDifference > 1) {
    console.log(`${daysDifference} days since last successful sync, performing catch-up sync`);
    await fetchAndSaveEvents();
  } else {
    // Normal check based on today's schedule
    await checkAndSyncData();
  }
}

/**
 * Check for missed sync today
 */
async function checkMissedSyncToday(
  lastSyncDateStr: string,
  scheduledHour: number,
  scheduledMinutes: number,
  nowDate: Date
): Promise<void> {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  
  const lastSuccessfulSyncDateStr = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SUCCESSFUL_SYNC_DATE);
  
  // Parse the dates for comparison
  const lastSuccessfulSyncDate = lastSuccessfulSyncDateStr ? new Date(lastSuccessfulSyncDateStr) : null;
  
  if (lastSuccessfulSyncDate) {
    await checkExpectedNextSync(lastSuccessfulSyncDate, scheduledHour, scheduledMinutes, nowDate);
  }
  
  // Standard check if we missed the sync time today
  const lastSyncDate = new Date(lastSyncDateStr);
  const lastSyncDay = new Date(
    lastSyncDate.getFullYear(),
    lastSyncDate.getMonth(),
    lastSyncDate.getDate()
  );
  
  // If the last sync was before today and the scheduled time has already passed today, sync now
  if (lastSyncDay < nowDate && 
      (currentHour > scheduledHour || 
      (currentHour === scheduledHour && currentMinutes > scheduledMinutes))) {
    console.log('Missed scheduled sync for today, doing it now');
    await fetchAndSaveEvents();
  }
}

/**
 * Check expected next sync
 */
async function checkExpectedNextSync(
  lastSuccessfulSyncDate: Date,
  scheduledHour: number,
  scheduledMinutes: number,
  nowDate: Date
): Promise<void> {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  
  // Get just the date part (year, month, day)
  const lastSuccessfulSyncDay = new Date(
    lastSuccessfulSyncDate.getFullYear(),
    lastSuccessfulSyncDate.getMonth(),
    lastSuccessfulSyncDate.getDate()
  );
  
  // Calculate the expected next sync day (adding 1 day to last successful sync)
  const expectedNextSyncDay = new Date(lastSuccessfulSyncDay);
  expectedNextSyncDay.setDate(expectedNextSyncDay.getDate() + 1);
  
  // If current date is after the expected next sync day, we missed at least one sync
  if (nowDate > expectedNextSyncDay) {
    console.log('Missed scheduled sync due to device being off, syncing now');
    await fetchAndSaveEvents();
    return;
  }
  
  // If it's the same day as expected next sync but after scheduled time
  if (nowDate.getTime() === expectedNextSyncDay.getTime() && 
      (currentHour > scheduledHour || 
       (currentHour === scheduledHour && currentMinutes > scheduledMinutes))) {
    console.log('On sync day and scheduled time has passed, syncing now');
    await fetchAndSaveEvents();
  }
}