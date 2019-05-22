import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ArrowImage from '@hecom/image-arrow';
import {isCascade} from './Util';

export default (treeNode, props) => props.multilevel ? multiLevelNode(treeNode, props) : singleLevelNode(treeNode, props);

export const singleLevelNode = (treeNode, props) => {
    const {labelKey, numberOfTextLines} = props;
    const isSelected = treeNode.isFullSelect(false);
    return (
        <View style={styles.row}>
            <View style={styles.container}>
                <Text style={styles.text} numberOfLines={numberOfTextLines}>
                    {treeNode.getInfo()[labelKey]}
                </Text>
                {isSelected ? <Image source={single_check_image()} style={styles.icon} /> : <View style={styles.icon} />}
            </View>
        </View>
    );
};

export const multiLevelNode = (treeNode, props) => {
    return treeNode.isLeaf() ? multiLevelLeafNode(treeNode, props) : multiLevelNotLeafNode(treeNode, props);
};

export const multiLevelLeafNode = (treeNode, props) => {
    const image = getImage(treeNode, isCascade(props));
    const {labelKey, numberOfTextLines} = props;
    const info = treeNode.getInfo()[labelKey];
    return (
        <View key={info} style={styles.leafContainer}>
            <Image source={image} style={styles.cellSelected} />
            <Text style={styles.leafText} numberOfLines={numberOfTextLines}>
                {info}
            </Text>
        </View>
    );
};

export const multiLevelNotLeafNode = (treeNode, props) => {
    const image = getImage(treeNode, isCascade(props));
    const {onPress, labelKey, showCount, numberOfTextLines} = props;
    const selectable = props.selectable ? props.selectable(treeNode) : true;
    const info = treeNode.getInfo()[labelKey];
    const leafCount = treeNode.getLeafChildrenCount();
    const selectedLeafCount = treeNode.getSelectedLeafChildrenCount();
    const arrowStyle = showCount ? {marginLeft: 0} : {marginLeft: 10};
    return (
        <View key={info} style={styles.treeCellContainer}>
            <View style={styles.treeCellLeft}>
                {selectable && (
                    <TouchableOpacity onPress={() => onPress(treeNode, true)}>
                        <Image source={image} style={styles.cellSelected} />
                    </TouchableOpacity>
                )}
                <Text
                    style={[styles.treeCellText, {marginLeft: selectable ? 0 : 25}]}
                    numberOfLines={numberOfTextLines}
                >
                    {info}
                </Text>
            </View>
            <View style={styles.treeCellRight}>
                {showCount && (
                    <Text style={styles.treeCellCount}>
                        {[selectedLeafCount.toString(), leafCount.toString()].join('/')}
                    </Text>
                )}
                <ArrowImage style={arrowStyle} />
            </View>
        </View>
    );
};

export const notselect_image = () => require('./image/checkbox.png');
export const select_image = () => require('./image/checkbox_hl.png');
export const incomp_image = () => require('./image/checkbox_noall.png');
export const single_check_image = () => require('./image/single_check.png');

export const getImage = (treeNode, cascade) => {
    if (treeNode.isNotSelect(cascade)) {
        return notselect_image();
    } else if (treeNode.isFullSelect(cascade)) {
        return select_image();
    } else if (treeNode.isIncompleteSelect(cascade)) {
        return incomp_image();
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingRight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6ea',
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
    },
    icon: {
        marginLeft: 4,
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
        flex: 1,
        marginVertical: 20,
        fontSize: 16,
        color: '#333333',
    },
    treeCellContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6ea',
    },
    leafContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6ea',
    },
    treeCellLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    treeCellText: {
        flex: 1,
        marginVertical: 16,
        fontSize: 16,
        color: '#333333',
    },
    treeCellRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    treeCellCount: {
        fontSize: 16,
        color: '#999999',
        marginHorizontal: 4,
    },
});