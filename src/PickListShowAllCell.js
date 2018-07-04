import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, DeviceEventEmitter } from 'react-native';
import * as DefaultPickListRow from './DefaultPickListRow';

export default class extends React.Component {
    /**
     * treeNode：Tree实例
     * onPress：点击事件
     */

    constructor(props) {
        super(props);
        this.tree = props.treeNode;
        this.state = {
            status: this.tree.selectStatus(),
        };
    }

    componentWillMount() {
        this.listener = DeviceEventEmitter.addListener(this.tree.listenerKey(), this._refresh);
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    _refresh = () => {
        this.setState({
            status: this.tree.selectStatus(),
        });
    };

    _getImage = () => {
        if (this.tree.isSelect()) {
            return DefaultPickListRow.select_image;
        } else {
            return DefaultPickListRow.notselect_image;
        }
    };

    render() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.onPress(this.tree)}>
                <View style={styles.leafContainer}>
                    <Image source={this._getImage()} style={styles.cellSelected} />
                    <Text style={styles.leafText}>
                        {this.tree.isSelect() ? '全不选' : '全选'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    leafContainer: {
        backgroundColor: 'white',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6ea',
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
});