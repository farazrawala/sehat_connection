import React from 'react';
import { FlatList } from 'react-native';
import {Colors, Constants} from '../../utils';
import styles from './styles';
import { Textview } from '../textview';

const _keyExtractor = (item,index) => ""+index;

const ListView = ({
    showIndicator=false,
    renderItem,
    extraData,
    data=[],
    refreshing=false,
    onRefresh,
    horizontal=false,
    layoutStyle={}
}) => (
    <FlatList
        showsVerticalScrollIndicator={showIndicator}
        showsHorizontalScrollIndicator={showIndicator}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
        extraData={extraData}
        data={data}
        horizontal={horizontal}
        refreshing={refreshing}
        refreshControl={onRefresh}
        style={layoutStyle}
    />
);

export {ListView};
