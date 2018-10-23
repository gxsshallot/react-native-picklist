import React from 'react';
import { TouchableOpacity, DeviceEventEmitter } from 'react-native';
import defaultRenderRow from './PickListDefaultRow';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.tree = props.treeNode;
        this.cascade = props.multilevel && props.multiselect;
        this.state = {
            status: this.tree.selectStatus(this.cascade),
        };
    }

    componentDidMount() {
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

    render() {
        const renderRow = this.props.renderRow || defaultRenderRow;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.props.onPress(this.tree, false)}
            >
                {renderRow(this.tree, this.props)}
            </TouchableOpacity>
        );
    }
}