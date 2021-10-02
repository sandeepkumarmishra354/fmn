import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
//#eff4f7

interface Props {
    vertical?: boolean,
    size?: number,
    style?: StyleProp<ViewStyle>
}

export const Divider = React.memo((props: Props) => {
    const vertical = props.vertical ?? false;
    const size = props.size ?? 0.5;
    return (
        <View style={[{
            backgroundColor: "#f8f8ff",
            width: vertical ? size : "100%",
            height: vertical ? "100%" : size
        }, props.style]}>
        </View>
    );
});