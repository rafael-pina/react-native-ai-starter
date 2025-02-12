import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginBottom: -40,
  },
  containerInput: {
    position: 'relative',
    marginBottom: 30,
    minHeight: 100,
  },
  actionsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 10,
    top: 20,
  },
  input: {
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 10,
    paddingTop: 15,
    paddingRight: 40,
    flex: 1,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  microphoneContainer: {
    marginTop: 10,
    height: 60,
    justifyContent: 'center',
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  inputText: {
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  promptRecordingContainer: {
    position: 'absolute',
    left: 10,
    top: -5,
  },
});
