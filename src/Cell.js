import React from 'react';
import { TouchableOpacity, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import Types from './Types';
import defaultRenderRow from './DefaultRow';
import {isCascade} from './Util';

export default class extends React.Component {
    static propTypes = {
        ...Types,
        isSearching: PropTypes.bool.isRequired,
        treeNode: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
        refreshSingleCell: PropTypes.bool
    };

    static defaultProps = {
        refreshSingleCell: true
    }

    constructor(props) {
        super(props);
        this.tree = props.treeNode;
        this.cascade = isCascade(props);
        this.state = {
            status: this.tree.selectStatus(this.cascade),
        };
    }

    componentDidMount() {
        const { refreshSingleCell } = this.props;
        this.listener = DeviceEventEmitter.addListener(
            '__treenode__status__update__' + (refreshSingleCell ? this.tree.getStringId() : ''),
            this._refresh
        );
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    _refresh = () => {
        const treeNode = this.props.treeNode;
        this.setState({
            status: treeNode.selectStatus(this.cascade),
        });
    };

    render() {
        const renderRow = this.props.renderRow || defaultRenderRow;
        const {treeNode} = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.props.onPress(treeNode, false)}
            >
                {renderRow(treeNode, this.props)}
            </TouchableOpacity>
        );
    }
}
