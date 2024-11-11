import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, Pressable } from 'react-native'
import { AppContext } from '../../scripts/appContext';
import * as ImagePicker from 'expo-image-picker';


export default profile = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)
    const [image, setImage] = useState('https://www.jet.ir/uploadFiles/avatar/noprofile.png');
    const [newImage, setNewImage] = useState(false)

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
                "name": 'teste' //nao funcionou
            }
            const res = await fetch('https://api.cloudinary.com/v1_1/drsblkw5n/upload', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                  },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            console.log(result);
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            {userInfo ?
                <View>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            style={styles.logo}
                            source={{ uri: image }}
                        />
                    </TouchableOpacity>
                    {newImage && <Pressable onPress={handleSendImage} style={styles.buttonStyle}>
                        <Text>Change Image</Text>
                    </Pressable> }
                    <Text>{userInfo.nome}</Text>
                    <Text>{userInfo.email}</Text>
                    <Text>{userInfo.status}</Text>
                </View> :
                <ActivityIndicator />
            }

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
    buttonStyle: {
        backgroundColor: 'rgb(255, 135, 46)',
        padding: 10,
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
    }
})

