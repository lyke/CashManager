import { Dimensions, StyleSheet } from 'react-native';

const { height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    alignItems: 'center',
    backgroundColor: '#cfdeca',

  },
  titleContainer: {
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#c0dcb5',
    height: 50,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    width: '100%',
    margin: 20,
    backgroundColor: '#729365',
    height: 50,
    justifyContent: 'center',
  },
  endButton: {
    borderRadius: 20,
    width: '100%',
    backgroundColor: '#729365',
    height: 50,
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  productContainer: {
    height: windowHeight / 100 * 60,
    // flexGrow: 1,
  },
  // productContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //     marginBottom: 10,
  //     backgroundColor: '#eff5c6',
  //     borderRadius: 10,
  //     width: '80%',
  //     height: '5%'
  // },


  text: {
    fontSize: 20,
  },

  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  camera: {
    flex: 1,
  },

  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#eff5c6',
    borderRadius: 10,
    width: '80%',
    height: '5%'
  },
  categoryText: {
    fontSize: 18,
  },
  productText: {
    fontSize: 18,
  },




  selectionList: {
    marginTop: 20,
    backgroundColor: '#E2EBCF',
    width: '90%',
    display: 'flex',
    height: windowHeight / 100 * 20,
    padding: '3%',
    borderRadius: 10,
  },
  formContainer: {
    backgroundColor: '#E2EBCF',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    borderRadius: 5,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
    maxWidth: 400,
    minHeight: 200,
    maxHeight: 300,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
  },
});

export default styles;
