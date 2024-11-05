import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { AppContext } from '../../scripts/appContext';



export default profile = () => {
    const { userInfo, setUserInfo } = useContext(AppContext)
    console.log(userInfo)

    return (
        <View style={styles.container}>
            {userInfo ?
                <View>
                    <TouchableOpacity>
                        <Image
                            style={styles.logo}
                            source={{ uri: 'https://www.jet.ir/uploadFiles/avatar/noprofile.png' }}
                        />
                    </TouchableOpacity>
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
})

