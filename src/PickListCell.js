import React from 'react';
import { TouchableOpacity, DeviceEventEmitter } from 'react-native';

export default class extends React.Component {
    /**
     * treeNode：Tree实例
     * renderRow：行视图
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

    render() {
        const selectable = this.props.selectable(this.tree);
        return selectable ? (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.onPress(this.tree, false)}>
                {this.props.renderRow(this.tree, this.props)}
            </TouchableOpacity>
        ) : this.props.renderRow(this.tree, this.props);
    }
}