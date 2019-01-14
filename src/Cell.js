import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Types from './Types';
import defaultRenderRow from './DefaultRow';

export default class extends React.PureComponent {
    static propTypes = {
        ...Types,
        notifyMap: PropTypes.object.isRequired,
        isSearching: PropTypes.bool.isRequired,
        treeNode: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.tree = props.treeNode;
        this.cascade = props.multilevel && props.multiselect;
        this.state = {
            status: this.tree.selectStatus(this.cascade),
        };
    }

    componentDidMount() {
        this.props.notifyMap[this.tree.getPath()] = this;
    }

    componentWillUnmount() {
        delete this.props.notifyMap[this.tree.getPath()];
    }

    refresh = () => {
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