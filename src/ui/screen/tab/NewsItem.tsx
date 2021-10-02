import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import { NO_IMAGE } from '../../../constant';
import { StackNavigationType, StackScreens } from '../../../navigation';
import { IArticle } from '../../../types';
import { SubTitle } from '../../component/SubTitle';
import { Title } from '../../component/Title';

export const NewsItem = React.memo((props: IArticle) => {
    const navigation = useNavigation<StackNavigationType<StackScreens.HOME>>();

    const onPress = () => {
        navigation.navigate(StackScreens.FULL_NEWS, props);
    }

    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.main}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: props.urlToImage ?? NO_IMAGE }} />
                </View>
                <View style={styles.container}>
                    <Title numberOfLines={2} style={styles.title}>
                        {props.title}
                    </Title>
                    <SubTitle style={{ fontSize: 14 }}>
                        {props.source.name ?? "N / A"}
                    </SubTitle>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
});

const styles = StyleSheet.create({
    main: {
        width: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: 8,
        paddingVertical: 16,
        flexDirection: "row",
    },
    image: {
        width: "90%",
        height: 65,
        borderRadius: 5
    },
    title: {
        fontSize: 15,
        lineHeight: 20
    },
    container: {
        flex: 2,
        paddingLeft: 8,
        justifyContent: "space-between"
    },
    info: {
        width: "100%",
        flexDirection: "row"
    }
});