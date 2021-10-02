import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from '../../component/Title';
import { TabTitle } from './TabTitle';

const TabScreenTimer = React.memo(() => {
    const [elapsed, setElapsed] = useState(0);

    // start the interval when this tab screen is in focus.
    // clear the interval when screen is blur.
    useFocusEffect(() => {
        const intervalId = setInterval(() => {
            setElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(intervalId);
    });

    return (
        <View style={styles.main}>
            <TabTitle title="FarMart Timer" />
            <View style={styles.container}>
                <Title style={{ color: "#1B98F5", fontSize: 22 }}>
                    {`${elapsed} sec.`}
                </Title>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    main: {
        flexGrow: 1,
        backgroundColor: "#fff",
    },
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default TabScreenTimer;