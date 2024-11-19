import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { AppContext } from '../../scripts/appContext';
import Ionicons from '@expo/vector-icons/Ionicons'
import {router} from 'expo-router'


export default home = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)
    //criar uma variavel que vai armazenar a lista de artistas ([])

    //criar uma funcao que faz um fetch para http://localhost:8000/artista/
    //atualizar a variavel com a lista de artistas obtidos

    //utilizar um useEffect para chamar a funcao

    return (
        <View style={styles.container}>
            <Ionicons name="person-circle-outline" size={32} color="white" onPress={() => router.push('/profile')} style={styles.iconQR} />
            <Text>Home page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    iconQR:{
        alignSelf:'flex-end',
        margin:6
    }
})

