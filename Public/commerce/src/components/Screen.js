import * as React from 'react';
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';

const Screen = ({ children, style }) => {

    return (
        <SafeAreaView style={[styles.screen, style]}>
            <ScrollView contentContainerStyle={ styles.contentContainer }>
                <View style={[styles.view, style]}>{ children }</View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 0
    },
    view: {
        flex: 1,
    },
})

export default Screen;
