import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, Pressable, Modal, TextInput } from 'react-native'
import { AppContext } from '../../scripts/appContext';
import * as ImagePicker from 'expo-image-picker';


export default profile = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)
    const [image, setImage] = useState('https://www.jet.ir/uploadFiles/avatar/noprofile.png');
    const [newImage, setNewImage] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [novaSenha, setNovaSenha] = useState('')
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('')



    useEffect(() => {
        if (userInfo.profile_image) {
            setImage(userInfo.profile_image)
        }
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            console.log(result.assets[0])
            setImage(result.assets[0].uri);
            setNewImage(true)
        }
    };

    const handleSendImage = async () => {
        try {
            const data = {
                "file": image,
                "upload_preset": 'ml_default',
            }
            const res = await fetch('https://api.cloudinary.com/v1_1/drsblkw5n/upload', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            setImage(result.url)
            console.log(result.url)
            console.log(userInfo)
            setUserInfo({ ...userInfo, profile_image: result.url })
            await saveNewImageURLonBackend(result)
        }
        catch (e) {
            console.log(e)
        }
    }

    const saveNewImageURLonBackend = async (result) => {
        const response = await fetch(`http://localhost:8000/user/trocar-img/${userInfo.id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: result.url })
        });
        console.log(data)
        if (response.status === 200) {
            data = await response.json()
            alert('Imagem atualizada com sucesso')
            return
        }
        alert('Houve um erro ao atualizar a imagem')
    }

    const handleChangePassword = async () => {
        if (novaSenha != confirmarNovaSenha){
            alert('as senhas não coincidem')
            return
        }
        const res = await fetch(`http://localhost:8000/autenticacao/change-password/${userInfo.id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({novaSenha: novaSenha})
            });
        if (res.status != 200){
            alert('houve um problema, tente novamente')
            setIsModalOpen(!isModalOpen)
            return
        }
        alert('senha trocada com sucesso')
        setIsModalOpen(!isModalOpen)
    }

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                {userInfo ? (
                    <View style={styles.profileContainer}>
                        <TouchableOpacity onPress={pickImage}>
                            <Image
                                style={styles.logo}
                                source={{ uri: image }}
                            />
                        </TouchableOpacity>

                        {newImage && (
                            <Pressable onPress={handleSendImage} style={styles.changeImageButton}>
                                <Text style={styles.changeImageText}>Change Image</Text>
                            </Pressable>
                        )}

                        <View style={styles.userInfoContainer}>
                            <Text style={styles.nameText}>{userInfo.nome}</Text>
                            <Text style={styles.emailText}>{userInfo.email}</Text>
                            <Text style={styles.statusText}>{userInfo.status}</Text>
                        </View>
                        <Pressable onPress={() => setIsModalOpen(!isModalOpen)} style={styles.changeImageButton}>
                            <Text style={styles.changeImageText}>Trocar Senha</Text>
                        </Pressable>
                        <Pressable onPress={handleChangePassword} style={styles.changeImageButton2}>
                            <Text style={styles.changeImageText2}>Cancelar Assinatura</Text>
                        </Pressable>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isModalOpen}
                            onRequestClose={() => {
                                setIsModalOpen(!isModalOpen);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <TextInput
                                        placeholder='Nova senha'
                                        style={styles.inputTextBox}
                                        onChangeText={setNovaSenha}
                                        value={novaSenha}
                                        secureTextEntry={true}
                                    />
                                    <TextInput
                                        placeholder='Confirmar nova senha'
                                        style={styles.inputTextBox}
                                        onChangeText={setConfirmarNovaSenha}
                                        value={confirmarNovaSenha}
                                        secureTextEntry={true}
                                    />
                                    <Pressable onPress={handleChangePassword} style={styles.changeImageButton}>
                                        <Text style={styles.changeImageText}>Change Password</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                ) : (
                    <ActivityIndicator size="large" color="#ff8746" />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputTextBox: {
        backgroundColor: 'antiquewhite',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        placeholderTextColor: 'lightgray',
        width: '85%'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor:'F7F7F7'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#F7F7F7',
        padding: 20,
        height: '80%'
    },
    profileContainer: {
        alignItems: 'center',
        width: '100%',
        paddingVertical: 30,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        padding: 20,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxWidth: 400,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#FF8746',
        marginBottom: 20,
    },
    changeImageButton: {
        backgroundColor: '#FF8746',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginVertical: 15,
    },
    changeImageButton2: {
        backgroundColor: '#F7F7F7',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginVertical: 15,
    },
    changeImageText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    changeImageText2: {
        color: '#FF8746',
        fontWeight: 'bold',
        fontSize: 16,
    },
    userInfoContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    nameText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    emailText: {
        fontSize: 16,
        color: '#777',
        marginBottom: 5,
    },
    statusText: {
        fontSize: 16,
        color: '#999',
    },
});

