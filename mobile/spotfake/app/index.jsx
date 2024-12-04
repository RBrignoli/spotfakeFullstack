import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Image, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { AppContext } from '../scripts/appContext';
import { router } from 'expo-router'


export default login = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const { userInfo, setUserInfo } = useContext(AppContext)



    const handleLogin = async () => {
        if (!email || !senha) {
            setMensagem('Todos os campos devem ser preenchidos')
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/autenticacao/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, senha: senha })
            });
            data = await response.json()
            if (response.status === 200) {
                setMensagem('Signup successfully!');
                setUserInfo(data.userInfo)
                {userInfo.status == 'active'? router.push('/profile'): router.push('/payment')}
            } else if (response.status === 409) {
                setMensagem('Email already exists');
            } else {
                setMensagem('An error occurred, try again');
            }
        } catch (error) {
            setMensagem('Error during signup. Please try again.');
        }
    };
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/images/logo.png')}
            />
            <Text>Bem-vindo ao Spotfake</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='example@email.com'
                    style={styles.inputTextBox}
                    onChangeText={setEmail}
                    value={email}
                    inputMode='email'
                    keyboardType='email-address'
                />
                <TextInput
                    placeholder='senhasupersegura'
                    style={styles.inputTextBox}
                    onChangeText={setSenha}
                    value={senha}
                    secureTextEntry={true}
                />
                <Pressable onPress={handleLogin} style={styles.buttonStyle}>
                    <Text style={styles.changeImageText}>Login</Text>
                </Pressable>
                {mensagem &&
                    <View>{mensagem}</View>
                }
                <View>
                        <Text style={styles.textBox}>
                            Ainda não possui uma conta?
                        </Text>
                        <Link href='/signup'>
                            <Text style={styles.textBox}>
                                Cadastre-se
                            </Text>
                        </Link>
                    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    inputTextBox: {
        backgroundColor: 'antiquewhite',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        placeholderTextColor: 'lightgray',
        width: '85%'
    },
    textBox: {
        fontSize: 11,
        marginTop: 10
    },
    inputContainer: {
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: 'rgb(255, 135, 46)',
        padding: 10,
        width: '85%',
        alignItems: 'center',
        borderRadius: 10,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },

    changeImageText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})