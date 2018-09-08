import React from 'react';
import { LayoutAnimation, ListView, StyleSheet, View, DeviceEventEmitter, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import NaviBar, { GOBACK_BUTTON } from 'react-native-pure-navigation-bar';
import SearchBar from 'react-native-general-searchbar';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Tree from 'react-native-general-tree';
import PickListCell from './PickListCell';
import defaultRenderRow from './PickListDefaultRow';
import PickListTitleLine from './PickListTitleLine';
import PickListBottomBar from './PickListBottomBar';
import PickListShowAllCell from './PickListShowAllCell';
import * as Labels from './PickListLabel';

export default class extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired, // 标题
        firstTitleLine: PropTypes.string, // 多层默认根标签文本
        multilevel: PropTypes.bool.isRequired, // 是否多层
        multiselect: PropTypes.bool, // 是否多选
        data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // 数组(单层)或者树状结构(多层)
        onFinish: PropTypes.func, // 选择成功后的回调函数(selected_node_array) => null
        rightTitle: PropTypes.string, // 右上角按钮标题
        rightClick: PropTypes.func, // 右上角按钮点击事件
        renderRow: PropTypes.func, // 行展示(treeNode,rowId,levelId) => React.Component
        renderLevelView: PropTypes.func, // 顶部层级关系栏(levelIds) => React.Component
        renderChooseAllView: PropTypes.func, // 全选行视图() => React.Component
        renderSeparator: PropTypes.func, // 分隔线视图() => React.Component
        renderSectionSeparator: PropTypes.func, // 区域分隔线视图() => React.Component
        renderHeader: PropTypes.func, // 自定义列表页的最上方
        showBottomView: PropTypes.bool, // 是否显示底层
        showSearchView: PropTypes.bool, // 是否显示搜索
        showTitleLine: PropTypes.bool, // 是否显示标题栏
        showAllCell: PropTypes.bool, // 是否显示全部按钮
        directBackWhenSingle: PropTypes.bool, // 单层单选时是否直接返回
        searchPlaceholder: PropTypes.string, // 搜索栏的Placeholder
        selectedIds: PropTypes.array, // 已选中的Ids
        selectable: PropTypes.func, // 节点是否可选(treeNode) => bool
        childrenKey: PropTypes.string, // 节点中子项的键
        idKey: PropTypes.string, // 节点中Id的键
        labelKey: PropTypes.string, // 节点中可展示字段的键
        searchKeys: PropTypes.array, // 普通搜索的键列表
        pySearchKeys: PropTypes.array, // 拼音搜索键列表
        flPySearchKeys: PropTypes.array, // 首字母拼音搜索键列表
        sort: PropTypes.func, // 排序方法(a,b) => -1||0||1
        onBack: PropTypes.func, // 回退页面
        splitFunc: PropTypes.func, // 拆分上下结构的方法
        width: PropTypes.number, // 页面宽度
    };

    static get defaultProps() {
        return {
            multilevel: false,
            multiselect: false,
            showSearchView: true,
            showTitleLine: true,
            showAllCell: true,
            directBackWhenSingle: true,
            selectable: () => true,
            renderRow: defaultRenderRow,
            childrenKey: 'children',
            idKey: 'id',
            labelKey: 'label',
            searchKeys: [],
            pySearchKeys: [],
            flPySearchKeys: [],
            width: Dimensions.get('window').width,
        };
    }

    constructor(props) {
        super(props);
        const {data, childrenKey, idKey, labelKey, firstTitleLine, selectedIds} = props;
        this.defaultRootId = '__root__';
        const treeRoot = Array.isArray(data) ?
            {[childrenKey]: data, [idKey]: this.defaultRootId, [labelKey]: firstTitleLine} :
            {[childrenKey]: [data], [idKey]: this.defaultRootId, [labelKey]: firstTitleLine};
        const tree = new Tree(
            treeRoot, undefined, childrenKey, idKey,
            (treenode) => DeviceEventEmitter.emit(
                '__treenode__status__update__' + treenode.getStringId()
            ),
            [labelKey, ...props.pySearchKeys],
            [labelKey, ...props.flPySearchKeys]);
        this.isCascade = this.props.multilevel && this.props.multiselect;
        this.state = {
            levelItems: [tree],
            selectedItems: tree.setInitialState(selectedIds, this.isCascade),
            searchText: '',
            isSearching: false,
        };
    }

    _handlePressToPrevPage = (index) => {
        const levelItems = this.state.levelItems.slice(0, index);
        this._show(index - 1, levelItems);
    };

    _show = (index, levelItems) => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            levelItems,
            frame: {
                top: 0,
                bottom: 0,
                left: 0 - index * this.props.width,
            },
        });
    };

    _clickBack = (index) => {
        if (index === 0) {
            const curIndex = this.state.levelItems.length;
            if (curIndex <= 1) {
                this.props.onBack && this.props.onBack();
            } else {
                this._handlePressToPrevPage(curIndex - 1);
            }
        } else {
            this.props.onBack && this.props.onBack();
        }
        return false;
    };

    _clickOK = () => {
        this.props.onFinish && this.props.onFinish(this.state.selectedItems);
        this.props.onBack && this.props.onBack();
    };

    _clickRow = (treeNode, isInternal = false) => {
        if (this.props.multilevel &&
            !isInternal &&
            !treeNode.isLeaf() &&
            !this.state.isSearching
        ) {
            const levelItems = [...this.state.levelItems, treeNode];
            this._show(this.state.levelItems.length, levelItems);
        } else {
            if (this.props.multiselect) {
                this._selectItem(treeNode);
            } else {
                if (treeNode.isFullSelect(this.isCascade)) {
                    treeNode.update(this.isCascade);
                    const selectedItems = [];
                    this.setState({selectedItems});
                } else {
                    if (this.state.selectedItems.length > 0 &&
                        !this.state.selectedItems[0].isEqual(treeNode)) {
                        this.state.selectedItems[0].update(this.isCascade);
                    }
                    treeNode.update(this.isCascade);
                    const selectedItems = [treeNode];
                    this.setState({selectedItems}, () => {
                        if (this.props.directBackWhenSingle) {
                            this._clickOK();
                        }
                    });
                }
            }
        }
    };

    _clickBottomItem = (index) => {
        const node = this.state.selectedItems[index];
        node.update(this.isCascade);
        const nodes = [...this.state.selectedItems];
        nodes.splice(index, 1);
        this.setState({
            selectedItems: nodes,
        });
    };

    _onSubmit = (event) => {
        const text = event ? event.nativeEvent.text : this.state.searchText;
        this.setState({
            isSearching: true,
            searchText: text,
        });
    };

    _onSearch = (text) => {
        LayoutAnimation.linear();
        this.setState({
            isSearching: true,
            searchText: text,
        });
    };

    _selectItem = (item) => {
        item.update(this.isCascade);
        let selectedItems;
        if (item.isFullSelect(this.isCascade)) {
            selectedItems = [...this.state.selectedItems, item];
        } else {
            selectedItems = this.state.selectedItems
                .filter(node => !node.isEqual(item));
        }
        if (item.isFullSelect(this.isCascade)) {
            if (item.getStringId() === this.defaultRootId) {
                selectedItems = [...item.getChildren()];
            } else if (!item.isLeaf()) {
                selectedItems = selectedItems.filter(node => !node.hasAncestor(item));
            }
        } else if (item.isNotSelect(this.isCascade)) {
            selectedItems = selectedItems.filter(node => !node.hasAncestor(item));
            const todos = [];
            selectedItems.forEach(node => {
                if (item.hasAncestor(node)) {
                    let ancestor = node;
                    while (ancestor) {
                        let tempAncestor = undefined;
                        ancestor.getChildren().forEach(child => {
                            if (item.hasAncestor(child)) {
                                tempAncestor = child;
                            } else if (!item.isEqual(child)) {
                                todos.push(child);
                            }
                        });
                        ancestor = tempAncestor;
                    }
                }
            });
            selectedItems = selectedItems.filter(node => !item.hasAncestor(node));
            todos.forEach(node => selectedItems.push(node));
        }
        this.setState({selectedItems});
    };

    _renderNaviBar = () => {
        const {title, rightTitle, rightClick} = this.props;
        const rightElement = {};
        if (rightTitle && rightTitle.length > 0) {
            rightElement.rightElement = rightTitle;
            rightElement.onRight = rightClick || this._clickOK;
        } else if (!this.props.multiselect && !this.props.directBackWhenSingle) {
            rightElement.rightElement = Labels.okLabel;
            rightElement.onRight = this._clickOK;
        }
        const leftElement = [GOBACK_BUTTON];
        if (this.props.multilevel) {
            leftElement.push(Labels.closeLabel);
        }
        return (
            <NaviBar
                title={title}
                leftElement={leftElement}
                onLeft={this._clickBack}
                {...rightElement}
            />
        );
    };

    _renderSearchBar = () => {
        const placeholder = this.props.searchPlaceholder ||
            Labels.searchPlaceholderLabel;
        return (
            <View style={{backgroundColor: 'white'}}>
                <SearchBar
                    placeholder={placeholder}
                    searchText={this.state.searchText}
                    onPressCancel={() => {
                        LayoutAnimation.linear();
                        this.setState({isSearching: false, searchText: ''});
                    }}
                    onSubmitEditing={this._onSubmit}
                    onChangeText={this._onSearch}
                    hasCancel={true}
                    isSearching={this.state.isSearching}
                />
            </View>
        );
    };

    _renderSearchingView = () => {
        const style = [styles.searchingViewContainer, {width: this.props.width}];
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const data = this.state.levelItems[0].search(
            this.state.searchText,
            this.props.searchKeys,
            this.props.multiselect,
            false,
            false
        );
        return (
            <View style={style}>
                <ListView
                    key={this.state.searchText}
                    automaticallyAdjustContentInsets={false}
                    dataSource={dataSource.cloneWithRows(data)}
                    enableEmptySections={true}
                    renderRow={this._renderRow}
                    style={[styles.listview, {width: this.props.width}]}
                    contentContainerStyle={{width: this.props.width}}
                />
            </View>
        );
    };

    _renderBottomView = () => {
        return (
            <PickListBottomBar
                {...this.props}
                selectedItems={this.state.selectedItems}
                onPress={this._clickOK}
                onPressItem={this._clickBottomItem}
            />
        );
    };

    _renderSeparator = () => {
        return (
            <View style={styles.seperator} />
        );
    };

    _renderRow = (treeNode) => {
        if (treeNode) {
            return (
                <PickListCell
                    {...this.props}
                    isSearching={this.state.isSearching}
                    treeNode={treeNode}
                    onPress={this._clickRow}
                />
            );
        } else {
            const func = this.props.renderSectionSeparator || this._renderSeparator;
            return func();
        }
    };

    _renderHeader = () => {
        const {renderHeader} = this.props;
        return renderHeader ? renderHeader(this.state) : this._renderTitleLine();
    };

    _renderTitleLine = () => {
        const {multilevel, showTitleLine} = this.props;
        return multilevel && showTitleLine ? (
            <PickListTitleLine
                {...this.props}
                ref={ref => this.titleLineScrollView = ref}
                levelItems={this.state.levelItems}
                onPress={(index) => this._handlePressToPrevPage(index)}
            />
        ) : undefined;
    };

    _renderShowAll = () => {
        return (
            <PickListShowAllCell
                {...this.props}
                treeNode={this.state.levelItems[this.state.levelItems.length - 1]}
                onPress={this._selectItem}
            />
        );
    };

    _renderPage = (index) => {
        const treeNode = this.state.levelItems[index];
        const listDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const sort = this.props.sort || ((a, b) => 
            a.getPinyin(this.props.labelKey) < b.getPinyin(this.props.labelKey) ? -1 : 1
        );
        const nodeArr = treeNode.getSplitChildren(sort, this.props.splitFunc);
        const dataSource = [...nodeArr[0], ...nodeArr[1]];
        if (nodeArr[0].length > 0 && nodeArr[1].length > 0) {
            dataSource.splice(nodeArr[0].length, 0, undefined);
        }
        const listViewDataSource = listDataSource.cloneWithRows(dataSource);
        const hasShowAll = this.props.multilevel && this.props.multiselect && this.props.showAllCell;
        return (
            <ListView
                key={index}
                automaticallyAdjustContentInsets={false}
                enableEmptySections={true}
                dataSource={listViewDataSource}
                renderHeader={hasShowAll ? this._renderShowAll : undefined}
                renderRow={this._renderRow}
                renderSeparator={this.props.renderSeparator}
                style={[styles.listview, {width: this.props.width}]}
                contentContainerStyle={{width: this.props.width}}
            />
        );
    };

    _renderEmptyPage = (index) => {
        return <View key={index} style={{width: this.props.width}} />;
    };

    _renderPageView = () => {
        const deepth = this.state.levelItems.length;
        const totalWidth = this.props.width * deepth;
        return (
            <View style={[{width: totalWidth}, styles.displayView, this.state.frame]}>
                {
                    new Array(deepth).fill(1).map((item, index) => {
                        if (index < this.state.levelItems.length) {
                            return this._renderPage(index);
                        } else {
                            return this._renderEmptyPage(index);
                        }
                    })
                }
            </View>
        );
    };

    render() {
        const hasBottom = this.props.showBottomView !== undefined ?
            this.props.showBottomView :
            this.props.multiselect;
        return (
            <View style={styles.view}>
                {this._renderNaviBar()}
                {this.props.showSearchView && this._renderSearchBar()}
                {!this.state.isSearching && this._renderHeader()}
                {this.state.isSearching ? this._renderSearchingView() : this._renderPageView()}
                {hasBottom && this._renderBottomView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#eff1f1',
        paddingBottom: getBottomSpace(),
    },
    listview: {
        backgroundColor: 'transparent',
    },
    naviBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftButtonView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftButtonImage: {
        width: 18,
        height: 16,
    },
    leftNaviText: {
        marginLeft: 10,
        fontSize: 15,
        color: '#333333',
    },
    seperator: {
        height: 8,
        backgroundColor: '#eff1f1',
    },
    searchingViewContainer: {
        flex: 1,
        backgroundColor: '#eff1f1',
    },
    displayView: {
        flex: 1,
        flexDirection: 'row',
    },
});