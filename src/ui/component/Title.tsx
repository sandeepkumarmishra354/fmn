import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

interface Props {
    style?: StyleProp<TextStyle>,
    numberOfLines?: number,
    onPress?: () => void
}

export const Title: React.FC<Props> = React.memo((props) => {
    return (
        <Text
            style={[styles.title, props.style]}
            numberOfLines={props.numberOfLines}
            onPress={props.onPress}>
            {props.children}
        </Text>
    );
});

const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        color: "#242B2E"
    }
});