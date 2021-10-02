import React from 'react';
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
    size?: number,
    color?: string,
    name: string
}

export const MyIcon = React.memo((props: Props) => {
    return (
        <Icon name={props.name} color={props.color ?? "#758283"} size={props.size ?? 28}/>
    );
});