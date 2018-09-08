import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, DeviceEventEmitter } from 'react-native';
import * as PickListDefaultRow from './PickListDefaultRow';
import * as Labels from './PickListLabel';

export default class extends React.Component {
    /**
     * ...PickList.propTypes
     * treeNode
     * onPress
     */

    constructor(props) {
        super(props);
        this.tree = props.treeNode;
        this.cascade = props.multilevel && props.multiselect;
        this.state = {
            status: this.tree.selectStatus(this.cascade),
        };
    }

    componentWillMount() {
        this.listener = DeviceEventEmitter.addListener(
            '__treenode__status__update__' + this.tree.getStringId(),
            this._refresh
        );
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    _refresh = () => {
        this.setState({
            status: this.tree.selectStatus(this.cascade),
        });
    };

    _getImage = () => {
        if (this.tree.isFullSelect(this.cascade)) {
            return PickListDefaultRow.select_image;
        } else {
            return PickListDefaultRow.notselect_image;
        }
    };

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.props.onPress(this.tree)}
            >
                <View style={styles.leafContainer}>
                    <Image source={this._getImage()} style={styles.cellSelected} />
                    <Text style={styles.leafText}>
                        {this.tree.isFullSelect(this.cascade) ?
                            Labels.deselectAllLabel :
                            Labels.selectAllLabel}
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