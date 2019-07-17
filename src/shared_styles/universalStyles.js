import { StyleSheet } from 'react-native';

export const universalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  navbarImage: {
    marginRight: 16,
  },
  textContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  socialButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  error: {
    borderBottomColor: 'red',
  },
});
