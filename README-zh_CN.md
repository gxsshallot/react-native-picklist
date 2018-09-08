# react-native-picklist

[![Build Status](https://travis-ci.org/gaoxiaosong/react-native-picklist.svg?branch=master)](https://travis-ci.org/gaoxiaosong/react-native-picklist)

## 安装

使用Yarn安装:

```
yarn add react-native-picklist
```

使用npm安装:

```
npm install --save react-native-picklist
```

## 组件属性

* title：页面标题。
* firstTitleLine：如果为多层，则表示根部的标签文本。
* multilevel：是否多层，默认为false。
* multiselect：是否多选，默认为false。
* data：单层情况下为数组，多层情况下为树状结构的对象。
* onFinish：选择成功后的回调函数，(selected_node_array) => null，参数为选中的树状节点(Tree实例)。
* rightTitle：右上角按钮标题。
* rightClick：右上角按钮点击事件。
* renderRow：行展示，(treeNode,rowId,levelId) => React.Component，默认为defaultRenderRow。
* renderLevelView：顶部层级关系栏，(levelIds) => React.Component。
* renderChooseAllView：全选行视图，() => React.Component。
* renderSeparator：分隔线视图，() => React.Component。
* renderHeader：自定义列表页的最上方，(state) => React.Component。
* showBottomView：是否显示底层，默认为true。
* showSearchView：是否显示搜索，默认为true。
* showTitleLine：是否显示标题栏，默认为true。
* showAllCell：是否显示全部按钮，默认为true。
* selectedIds：已选中的Id数组。
* selectable：节点是否可选，(treeNode) => bool，默认为始终返回true的函数。
* childrenKey：多层时数据节点中子项的键，默认为'children'。
* idKey：多层时数据节点中Id的键，默认为'id'。
* labelKey：多层时数据节点中可展示字段的键，默认为'label'。
* searchKeys：多层时数据中可搜索的键列表，默认为空数组。
* sort：节点的排序方法，(a,b) => -1||0||1，默认为按照拼音排序。
* onBack：回退页面的方法。
* splitFunc：单一页面中拆分上下视图的方法，(treeNode, sort) => [upArr, downArr]。

## 参考

请参照这个仓库的说明: [react-native-items](https://github.com/gaoxiaosong/react-native-items/blob/master/README-zh_CN.md).