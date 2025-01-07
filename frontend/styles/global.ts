import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  gameList: {
    width: '90%',
    maxWidth: 800,
    alignSelf: 'center',
    marginVertical: 16,
  },
  placeholder: {
    fontStyle: 'italic',
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    backgroundColor: '#4B5563',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#F9FAFB',
    fontSize: 14,
  },
  nav: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
  },
  navLink: {
    color: '#9ca3af',
    fontSize: 14,
  },
  modal: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    marginTop: 8,
    color: 'red',
    textAlign: 'center',
  },
});

export const aboutStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#111827', // Equivalent to bg-gray-900
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#E5E7EB', // Equivalent to text-gray-200
      marginBottom: 16,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      color: '#9CA3AF', // Equivalent to text-gray-400
      textAlign: 'center',
      marginBottom: 24,
      maxWidth: 600,
    },
    linkButton: {
      backgroundColor: '#4B5563', // Equivalent to bg-gray-700
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginTop: 16,
    },
    linkText: {
      color: '#F9FAFB', // Equivalent to text-gray-100
      fontSize: 14,
      textAlign: 'center',
    },
  });

export const rulesStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // Tailwind slate-900
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f1f5f9', // Tailwind slate-100
        marginBottom: 24,
        textAlign: 'center',
    },
    sectionContainer: {
        marginBottom: 24,
        backgroundColor: '#1e293b', // Tailwind slate-800
        borderRadius: 12,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#e2e8f0', // Tailwind slate-200
        marginBottom: 12,
    },
    sectionContent: {
        marginLeft: 8,
    },
    description: {
        fontSize: 16,
        color: '#cbd5e1', // Tailwind slate-300
        marginBottom: 12,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#e2e8f0', // Tailwind slate-200
        marginTop: 12,
        marginBottom: 8,
    },
    listItemContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    listItemBullet: {
        color: '#64748b', // Tailwind slate-500
        marginRight: 8,
        fontSize: 16,
    },
    listItemText: {
        flex: 1,
        fontSize: 16,
        color: '#cbd5e1', // Tailwind slate-300
    },
    linkButton: {
        backgroundColor: '#3b82f6', // Tailwind blue-500
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 24,
    },
    linkText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export const crmStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#1F2937', // Tailwind gray-800
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB', // Tailwind gray-200
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#D1D5DB', // Tailwind gray-300
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#374151', // Tailwind gray-700
    color: '#E5E7EB', // Tailwind gray-200
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#4B5563', // Tailwind gray-600
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#4B5563', // Tailwind gray-600
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: '#374151', // Tailwind gray-700
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#F9FAFB', // Tailwind gray-100
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const joinModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#1F2937', // Tailwind gray-800
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB', // Tailwind gray-200
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#D1D5DB', // Tailwind gray-300
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#374151', // Tailwind gray-700
    color: '#E5E7EB', // Tailwind gray-200
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#4B5563', // Tailwind gray-600
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#4B5563', // Tailwind gray-600
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: '#374151', // Tailwind gray-700
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#F9FAFB', // Tailwind gray-100
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: '#F87171',
    fontSize: 12,
    marginTop: 4,
  },
});

export const gameListStyles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#1F2937', // Tailwind gray-800
    padding: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB', // Tailwind gray-200
    marginBottom: 12,
    textAlign: 'center',
  },
  list: {
    maxHeight: 350,
    overflow: 'hidden',
  },
  listContent: {
    gap: 8,
  },
  gameItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#374151', // Tailwind gray-700
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  gameDetails: {
    flex: 1,
  },
  gameName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#E5E7EB', // Tailwind gray-200
  },
  gameInfo: {
    fontSize: 12,
    color: '#9CA3AF', // Tailwind gray-400
  },
  joinButton: {
    backgroundColor: '#4B5563', // Tailwind gray-600
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  joinButtonText: {
    color: '#F9FAFB', // Tailwind gray-100
    fontSize: 14,
    fontWeight: 'bold',
  },
  noGamesContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  noGamesText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#555',
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#666',
  },
  gameCode : {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  overlay : {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer : {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 20,
    elevation: 5,
  },
  modalTitle : {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 10,
    textAlign: 'center',
  },
  gameListStyles : {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  input : {
    backgroundColor: '#374151', // Tailwind gray-700
    color: '#E5E7EB', // Tailwind gray-200
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#4B5563', // Tailwind gray-600
    marginBottom: 10
  },
  buttonContainer : {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  cancelButton : {
    backgroundColor: '#4B5563',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  submitButton : {
    backgroundColor: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText : {
    color: '#F9FAFB', // Tailwind gray-100
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: '#F87171',
    fontSize: 12,
    marginTop: 4,
  },
});