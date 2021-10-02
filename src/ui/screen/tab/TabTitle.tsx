import React from 'react';
import { View } from 'react-native';
import { Divider } from '../../component/Divider';
import { Title } from '../../component/Title';

export const TabTitle = React.memo(({ title }: { title: string }) => {
    return (
        <View>
            <Title style={{ padding: 16 }}>
                {title}
            </Title>
            <Divider size={1} />
        </View>
    );
});