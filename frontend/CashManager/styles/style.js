import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'lightblue',
        // paddingHorizontal: 20,
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 40,
    },
    cameraContainer: {
        width: '80%',
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 40,
    },
    camera: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        borderRadius: 10,
        width: '100%',
        textAlign: 'center',
        margin: 30,
        backgroundColor: '#c0dcb5',
        height: 50,
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
    button: {
        borderRadius: 20,
        padding:
          10,
        elevation:
          2,
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
        backgroundColor: '#729365',
    }
});

export default styles;
