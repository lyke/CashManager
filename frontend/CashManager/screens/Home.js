import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <TouchableOpacity
      onPress={()=>{navigation.navigate('ManagerConnection')}}>
        <Text>GotoConnection</Text>
      </TouchableOpacity>
    </View>
  );
}
