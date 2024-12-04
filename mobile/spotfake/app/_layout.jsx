import React from "react";
import { StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { AppProvider } from "../scripts/appContext";
import { LinearGradient } from 'expo-linear-gradient';


export default Layout = () => {
    return (
        <AppProvider>
            <LinearGradient
                colors={['chocolate', 'goldenrod']}
                style={styles.background}
            />
            <Slot />
        </AppProvider>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    }
})