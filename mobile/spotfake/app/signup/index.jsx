import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Image, ScrollView, Pressable } from 'react-native'
import { Link, router } from 'expo-router'

export default registro = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [senha2, setSenha2] = useState('')
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [dataNascimento, setdataNascimento] = useState('')
    const [senhaIgual, setSenhaIgual] = useState(false)
    const [mensagem, setMensagem] = useState('')

    const handleSignUp = async () => {
        if (!email || !senha || !nome || !sobrenome || !dataNascimento) {
            setMessage('Todos os campos devem ser preenchidos')
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/autenticacao/registro', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, senha: senha, nome:nome, sobrenome:sobrenome, dataNascimento: dataNascimento })
            });
            console.log(response)
            if (response.status === 200) {
                setMensagem('Signup successfully!');
                router.push('/')
            } else if (response.status === 409) {
                setMensagem('Email already exists');
            } else {
                setMensagem('An error occurred, try again');
            }
        } catch (error) {
            setMensagem('Error during signup. Please try again.');
        }
    };

    const handleSenha = () => {
        return
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text> Faça parte do Spotfake </Text>
                <TextInput
                    placeholder='Insira seu nome'
                    style={styles.inputTextBox}
                    onChangeText={setNome}
                    value={nome}
                />
                <TextInput
                    placeholder='Insira seu sobrenome'
                    style={styles.inputTextBox}
                    onChangeText={setSobrenome}
                    value={sobrenome}
                />
                <TextInput
                    placeholder='Insira data de nascimento'
                    style={styles.inputTextBox}
                    onChangeText={setdataNascimento}
                    value={dataNascimento}
                />
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
                {/* <TextInput
                    placeholder='confirmar senha'
                    style={styles.inputTextBox}
                    secureTextEntry={true}
                    value={senha2}
                    onChange={handleSenha}
                /> */}
                <Pressable onPress={handleSignUp} style={styles.buttonStyle}>
                    <Text style={styles.changeImageText}>Registre-se</Text>
                </Pressable>
                <Text style={styles.textBox}>
                    Já possui uma conta?
                </Text>
                <Link href='../'>
                    <Text style={styles.textBox}>
                        Login
                    </Text>
                </Link>
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
        placeholderTextColor: 'lightgray'
    },
    textBox: {
        fontSize: 11,
        marginTop:10
    },
    inputContainer: {
        alignItems: 'center'
    },
    buttonStyle:{
        backgroundColor: 'rgb(255, 135, 46)',
        padding:10,
        width:'85%',
        alignItems:'center',
        borderRadius:10,
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