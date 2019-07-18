import { StyleSheet } from 'react-native';

export const universalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 15,
  },
  navbarImage: {
    marginRight: 16,
  },
  textContainer: {
    paddingTop: 15,
    alignItems: 'center',
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 55,
    marginLeft: 10,
    marginRight: 10,
  },
  socialButton: {
    alignItems: 'center',
    marginTop: 15,
  },
  error: {
    borderBottomColor: 'red',
  },
});
