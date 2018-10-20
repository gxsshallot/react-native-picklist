# react-native-picklist

[实际截图](resource/ScreenShot.md)

这是一个PickList页面. 它支持如下功能:

* 单层或多层结构的数据
* 单选或多选
* 显示或隐藏内部视图
* 自定义UI组件
* 自动搜索数据
* 分区样式的页面

## 安装

使用Yarn安装:

```shell
yarn add react-native-picklist
```

使用NPM安装:

```shell
npm install --save react-native-picklist
```

## 使用

在文件中导入模块:

```jsx
import PickList from 'react-native-picklist';
```

你可以设置下列属性, 或者参照样例工程, 来学习如何使用.

## 属性

必填:

* `title: string`: 页面标题.
* `data: object | object[]`: 展示的数据. 我们将创建一个虚拟的根节点包含它.

可选:

* `firstTitleLine?: string`: 当有多层结构数据并且显示标题行时, 在`PickListTitleLine`控件中显示的第一个标签.
* `multilevel?: boolean`: 是否是多层结构数据. 默认是`false`.
* `multiselect?: boolean`: 是否是多选. 默认是`false`.
* `onFinish?: (nodes: Tree[]) => void`: 当选择完成时, 返回选中的节点列表.
* `rightTitle?: string`: 右上角按钮标题.
* `rightClick?: () => void`: 右上角按钮点击回调.
* `renderRow?: (treeNode: Tree, props: PickList.props) => JSX.Component`: 自定义行展示. 你可以使用这个属性来实现只读的页面. 默认实现在`PickListDefaultRow.js`.
* `renderSeparator?: () => JSX.Component`: 自定义单元格分隔线.
* `renderSectionSeparator?: () => JSX.Component`: 自定义区域分隔线.
* `renderHeader?: (state: PickList.state) => JSX.Component`: 自定义列表页的头部.
* `showBottomView?: boolean`: 是否显示底部栏.
* `showSearchView?: boolean`: 是否显示搜索栏.
* `showTitleLine?: boolean`: 是否在头部显示标题栏.
* `showAllCell?: boolean`: 是否显示全选或全不选按钮.
* `showCount?: boolean`: 是否显示非叶节点的叶节点数量和选中数量.
* `directBackWhenSingle?: boolean`: 单选单层结构数据时, 是否直接返回上一页.
* `searchPlaceholder?: string`: 搜索栏的占位内容.
* `selectedIds?: array`: 初始的已选中项的id列表.
* `selectable?: (treeNode: Tree) => boolean`: 一个数据节点是否可选.
* `childrenKey?: string`: 数据节点中子节点列表对应的键.
* `idKey?: string`: 数据节点中id对应的键.
* `labelKey?: string`: 数据节点中标签对应的键.
* `searchKeys?: string[]`: 数据节点中普通搜索的键列表.
* `sort?: (a: Tree, b: Tree) => -1 | 0 | 1`: 数据列表的排序方法.
* `splitFunc?: (arr: Tree[]) => Tree[][]`: 数据列表拆分区域的方法.
* `width?: number`: 页面宽度.

## 样例工程

你可以使用如下步骤来打开样例工程：

1. `cd example`.
1. 使用`yarn`或`npm install`安装模块。
1. 在iOS中, 需要在`ios`目录中运行`pod install`命令.
1. 运行`npm run bundle:ios`或`npm run bundle:android`打包。
1. 在一个单独的终端中运行`npm start`。
1. 使用`Xcode`或`Android Studio`打开`example/ios`或`example/android`中的工程。
1. 运行工程。

## 参考

请参照这个仓库的说明: [react-native-items](https://github.com/gaoxiaosong/react-native-items/blob/master/README-zh_CN.md).