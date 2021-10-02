import React from 'react';
import { View, StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

interface Props {
    size?: number,
    color?: string,
    style?: StyleProp<ViewStyle>
}

export const LoadingCircle = React.memo((props: Props) => {
    return (
        <View style={[styles.main, props.style]}>
            <ActivityIndicator size={props.size ?? 32} color={props.color ?? "#1B98F5"} />
        </View>
    );
});

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});