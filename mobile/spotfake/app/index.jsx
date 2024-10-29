import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center' },
    textInput: { paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', justifyContent: 'center' },
    Input: { height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, borderRadius: 10, justifyContent: 'center', backgroundColor: 'lightgray' },
    text: { fontSize: 24, fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' },
    text2: { fontSize: 16, marginTop: 10, alignItems: 'center', justifyContent: 'center' },
    button: {
        borderRadius: 10,
        backgroundColor: 'midnightblue',
        alignItems: 'center',
        fontWeight: "bold",
        width: '80%'
    },
    textButton: { fontSize: 16, marginTop: 10, color:'white' },

})

export default Signup = () => {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        dataNascimento:''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [Message, setMessage] = useState(null);

    const handleSubmit = async () => {
        if (!formData.nome || !formData.email || !formData.senha) {
            setMessage('Todos os campos devem ser preenchidos')
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/registro', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            console.log(response)
            if (response.status === 200) {
                setMessage('Signup successfully!');
            } else if (response.status === 409) {
                setMessage('Email already exists');
            } else {
                setMessage('An error occurred, try again');
            }
        } catch (error) {
            setMessage('Error during signup. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textInput}>
                <Text style={styles.text}>
                    Spotfake
                </Text>
                <Text style={styles.text2}>
                    Crie seu usuario enviando Nome, sobrenome, email, senha e data de nascimento
                </Text>
                <Text style={styles.text}>
                    REGISTRO
                </Text>
                <TextInput
                    style={styles.Input}
                    placeholder="Name"
                    value={formData.nome}
                    onChangeText={(text) => setFormData({ ...formData, nome: text })}
                    required
                />
                <TextInput
                    style={styles.Input}
                    placeholder="Second Name"
                    value={formData.sobrenome}
                    onChangeText={(text) => setFormData({ ...formData, sobrenome: text })}
                    required
                />
                <TextInput
                    style={styles.Input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    required
                />
                <TextInput
                    style={styles.Input}
                    placeholder="Password"
                    value={formData.senha}
                    onChangeText={(text) => setFormData({ ...formData, senha: text })}
                    secureTextEntry={!showPassword}
                    required
                />
                <TextInput
                    style={styles.Input}
                    placeholder="Birthdate"
                    value={formData.dataNascimento}
                    onChangeText={(text) => setFormData({ ...formData, dataNascimento: text })}
                    required
                />
                <Pressable onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.textButton}>Sign Up</Text>
                </Pressable>
            </View>
        </View>
    );
};

