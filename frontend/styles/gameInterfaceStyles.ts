import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  circleContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: '#e2e8f0',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  playerDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4a5568',
  },
  gameInfo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4a5568',
  },
  bidAskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
    marginTop: 8,
  },
  bidAskText: {
    fontSize: 14,
    color: '#1f2937',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 16,
  },
  actionButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    margin: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contractCard: {
    width: '90%',
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  contractTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#1f2937',
  },
  contractText: {
    fontSize: 14,
    color: '#4a5568',
  },
});
