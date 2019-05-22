import React from 'react';
import { TouchableOpacity, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import Types from './Types';
import defaultRenderRow from './DefaultRow';
import {isCascade} from './Util';

export default class extends React.PureComponent {
    static propTypes = {
        ...Types,
        isSearching: PropTypes.bool.isRequired,
        treeNode: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.tree = props.treeNode;
        this.cascade = isCascade(props);
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