import { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('userinfo').then((userdata) => {
      const userinfo = JSON.parse(userdata);
      if (userinfo) {
        setUsername(userinfo.username);
        setPassword(userinfo.password);
        setRemember(true);
      }
    });
  }, []);

  const handleLogin = () => {
    console.log('username', username);
    console.log('password', password);
    console.log('remember', remember);
    if (remember) {
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({
          username,
          password
        })
      ).catch((e) => console.log('Could not save user info', e));
    } else {
      SecureStore.deleteItemAsync('userinfo').catch((e) =>
        console.log('Could not delete user info', e)
      );
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder='Username'
        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
        onChangeText={(text) => setUsername(text)}
        value={username}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <Input
        placeholder='Password'
        leftIcon={{ type: 'font-awesome', name: 'key' }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <CheckBox
        title='Remember Me'
        center
        checked={remember}
        onPress={() => setRemember(!remember)}
        containerStyle={styles.formCheckbox}
      />
      <View style={styles.formButton}>
        <Button onPress={() => handleLogin()} title='Login' color='#5637DD' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20
  },
  formIcon: {
    marginRight: 10
  },
  formInput: {
    padding: 10
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null
  },
  formButton: {
    margin: 40
  }
});

export default LoginScreen;
