import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowImage } from 'react-native-hecom-common';

export default (treeNode, props) => {
    const isMultiLevel = props.multilevel;
    return isMultiLevel ? multiLevelNode(treeNode, props) : singleLevelNode(treeNode, props);
};

export const singleLevelNode = (treeNode, props) => {
    const {labelKey} = props;
    const isSelected = treeNode.isSelect(props.multilevel && props.multiselect);
    return (
        <View style={styles.row}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {treeNode.getInfo()[labelKey]}
                </Text>
                {isSelected && <Image source={single_check_image} style={styles.icon} />}
            </View>
        </View>
    );
};

export const multiLevelNode = (treeNode, props) => {
    return treeNode.isLeaf() ? multiLevelLeafNode(treeNode, props) : multiLevelNotLeafNode(treeNode, props);
};

export const multiLevelLeafNode = (treeNode, props) => {
    const image = getImage(treeNode, props.multilevel && props.multiselect);
    const {labelKey} = props;
    const info = treeNode.getInfo()[labelKey];
    return (
        <View key={info} style={styles.leafContainer}>
            <Image source={image} style={styles.cellSelected} />
            <Text style={styles.leafText}>{info}</Text>
        </View>
    );
};

export const multiLevelNotLeafNode = (treeNode, props) => {
    const image = getImage(treeNode, props.multilevel && props.multiselect);
    const {onPress, labelKey} = props;
    const selectable = props.selectable(treeNode);
    const info = treeNode.getInfo()[labelKey];
    return (
        <View key={info} style={styles.treeCellContainer}>
            <View style={styles.treeCellLeft}>
                {selectable && (
                    <TouchableOpacity onPress={() => onPress(treeNode, true)}>
                        <Image source={image} style={styles.cellSelected} />
                    </TouchableOpacity>
                )}
                <Text style={[styles.treeCellText, {marginLeft: selectable ? 0 : 25}]}>{info}</Text>
            </View>
            <ArrowImage style={styles.arrowImage} />
        </View>
    );
};

export const notselect_image = require('./image/checkbox.png');
export const select_image = require('./image/checkbox_hl.png');
export const incomp_image = require('./image/checkbox_noall.png');
export const single_check_image = require('./image/single_check.png');

export const getImage = (treeNode, cascade) => {
    if (treeNode.isNotSelect(cascade)) {
        return notselect_image;
    } else if (treeNode.isSelect(cascade)) {
        return select_image;
    } else if (treeNode.isInCompleteSelect(cascade)) {
        return incomp_image;
    } else {
        return undefined;
    }
};

const styles = StyleSheet.create({
    row: {
        backgroundColor: 'white',
        paddingLeft: 15,
    },
    container: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6ea',
    },
    text: {
        fontSize: 16,
        color: '#333333',
    },
    icon: {
        width: 19,
        height: 22,
    },
    cellSelected: {
        width: 18,
        height: 18,
        borderRadius: 9,
        marginRight: 10,
        marginLeft: 25,
        marginTop: 10,
        marginBottom: 10,
    },
    leafText: {
        fontSize: 16,
        color: '#333333',
    },
    treeCellContainer: {
        backgroundColor: 'white',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6ea',
    },
    leafContainer: {
        backgroundColor: 'white',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6ea',
    },
    treeCellLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    treeCellText: {
        fontSize: 16,
        color: '#333333',
    },
    arrowImage: {
        marginRight: 0,
    },
});