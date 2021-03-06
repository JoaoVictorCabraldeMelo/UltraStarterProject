import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native'
import {styles} from "../styles/SignUp";
import {navigateTo} from "../helpers/navigation";
import {baseStyles, colors} from "../styles/base";
import IconInput from "../components/auth/IconInput";
import {CSComponent} from 'react-central-state'
import {login, signInWithGoogle} from '../helpers/api';
import GoogleBtn from '../components/auth/GoogleBtn';
import FacebookBtn from '../components/auth/FacebookBtn';
import { GoogleSignin } from 'react-native-google-signin';
import Spinner from 'react-native-loading-spinner-overlay';

class SignIn extends React.Component {
  constructor(props){
    super(props);
    GoogleSignin.configure();
    this.state = {
      password: '',
      email: '',
      signIninProgress: false,
      userInfo: {}
    }
  };

  updateWith(){
    return ['user', 'userSignedIn'];
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  };

  signIn = async () => {
    const { password, email } = this.state;
    login(email,password,this);
  };

  signInWithGoogle = async () => {
    signInWithGoogle(this).done();
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.signIninProgress}
          textContent={'Autenticando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <IconInput
          onChangeText={this.onChangeText}
          inputKey={'email'}
          placeholder={'Email'}
          icon={require('../assets/images/mail.png')}
        />
        <IconInput
          onChangeText={this.onChangeText}
          isSecureTextEntry={true}
          inputKey={'password'}
          placeholder={'Password'}
          icon={require('../assets/images/lock.png')}
        />

        <TouchableOpacity style={styles.restoreButtonContainer}>
          <Text style={baseStyles.textWhite}>Esqueceu a senha? Recuperar</Text>
        </TouchableOpacity>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.signIn()}
          >
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={
            () => navigateTo("SignUp","Cadastro", this.props.componentId)
          }
        >
          <Text style={baseStyles.textWhite}>Ainda não possui conta? Registrar-se</Text>
        </TouchableOpacity>

        <FacebookBtn onPress={() => console.log("facebook")}/>
        <GoogleBtn onPress={this.signInWithGoogle}/>
      </View>
    )
  }
}

export default CSComponent(SignIn);
