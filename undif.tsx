import React from 'react';
import {CommonActions} from '@react-navigation/routers';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Main() {
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigate('Sub', {
            title: `${Date.now()}`,
          })
        }>
        <Text>go to sub</Text>
      </TouchableOpacity>
    </View>
  );
}

function Sub() {
  return (
    <View style={styles.container}>
      <Text>Sub</Text>
      <TouchableOpacity>
        <Text>go to main?</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen
        name="Sub"
        component={Sub}
        options={({navigation, route}) => {
          const title =
            route.params && route.params.title ? route.params.title : '0';
          const seed = parseInt(title, 10) % 3;
          switch (seed) {
            case 0:
              console.log('goback');
              navigation.goback();
              break;
            case 1:
              console.log('replace');
              navigation.replace('Main');
              break;
            default:
              console.log('reset');
              const action = CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'Main',
                  },
                ],
              });
              navigation.dispatch(action);
              break;
          }
          return {title};
        }}
      />
    </Stack.Navigator>
  );
}

export default function () {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
