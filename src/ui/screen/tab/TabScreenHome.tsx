import React, { useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { serviceApi } from '../../../service/service.api';
import { IArticle } from '../../../types';
import { Divider } from '../../component/Divider';
import { LoadingCircle } from '../../component/LoadingCircle';
import { SubTitle } from '../../component/SubTitle';
import { NewsItem } from './NewsItem';
import { TabTitle } from './TabTitle';

const TabScreenHome = React.memo(() => {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState(false);
    const [listEnd, setListEnd] = useState(false);
    const page = useRef(1);

    const loadHeadlines = () => {
        // if already loading or all items fetched just return.
        if (loading || listEnd)
            return;
        setLoading(true);
        serviceApi.fetchHeadlines(page.current)
            .then(headlines => {
                if (headlines) {
                    // increment page by 1
                    setLoading(false);
                    if (headlines.articles?.length > 0) {
                        page.current += 1;
                        setArticles([...articles, ...headlines.articles]);
                    }
                    else
                        setListEnd(true);
                } else {
                    setLoading(false);
                    setListEnd(true);
                }
            }).catch(() => {
                setLoading(false);
                setListEnd(true);
            });
    }

    const extractKey = useCallback((item: IArticle, index: number) => {
        return `${item.source.id}-${index}`;
    }, []);

    const renderSeperator = useCallback(() => <Divider size={2} />, []);
    const renderItem = useCallback(({ item }: { item: IArticle }) => {
        return <NewsItem {...item} />;
    }, []);

    const renderFooter = useCallback(() => {
        if (loading)
            return (
                <SubTitle style={styles.loadingText}>
                    loading...
                </SubTitle>
            );
        return null;
    }, [loading]);

    useEffect(() => {
        // load 1st page of top headings
        loadHeadlines();
    }, []);

    return (
        <View style={styles.main}>
            <TabTitle title="FarMart News" />
            <View style={{ flexGrow: 1 }}>
                {
                    loading && articles.length === 0
                        ?
                        <LoadingCircle />
                        :
                        <FlatList
                            style={{ flex: 1 }}
                            data={articles}
                            keyExtractor={extractKey}
                            renderItem={renderItem}
                            ListFooterComponent={renderFooter}
                            ItemSeparatorComponent={renderSeperator}
                            onEndReached={loadHeadlines} />
                }
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    main: {
        flexGrow: 1,
        backgroundColor: "#fff",
    },
    loadingText: {
        width: "100%",
        textAlign: "center",
        paddingVertical: 18
    }
});

export default TabScreenHome;