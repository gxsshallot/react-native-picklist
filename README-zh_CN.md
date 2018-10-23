# react-native-picklist

这是一个PickList页面. 它支持如下功能:

* 单层或多层结构的数据
* 单选或多选
* 显示或隐藏内部视图
* 自定义UI组件
* 自动搜索数据
* 分区样式的页面

## 实际截图

### iPhone X

<p float="left">

<img src="/resource/iPhoneX-PlainSingle.png" width="22%">

<img src="/resource/iPhoneX-PlainMulti.png" width="22%">

<img src="/resource/iPhoneX-TreeMulti.png" width="22%">

<img src="/resource/iPhoneX-TreeMultiStatus.png" width="22%">

</p>

### Android

<p float="left">

<img src="/resource/Android-PlainSingle.png" width="22%">

<img src="/resource/Android-PlainMulti.png" width="22%">

<img src="/resource/Android-TreeMulti.png" width="22%">

<img src="/resource/Android-TreeMultiStatus.png" width="22%">

</p>

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

* `title`: 页面标题.
* `data`: 展示的数据. 我们将创建一个虚拟的根节点包含它.

可选:

* `firstTitleLine`: 当有多层结构数据并且显示标题行时, 在`PickListTitleLine`控件中显示的第一个标签.
* `multilevel`: 是否是多层结构数据. 默认是`false`.
* `multiselect`: 是否是多选. 默认是`false`.
* `onFinish`: 当选择完成时, 返回选中的节点列表.
* `rightTitle`: 右上角按钮标题.
* `rightClick`: 右上角按钮点击回调.
* `renderRow`: 自定义行展示. 你可以使用这个属性来实现只读的页面. 默认实现在`PickListDefaultRow.js`.
* `renderHeader`: 自定义列表页的头部.
* `showBottomView`: 是否显示底部栏.
* `showSearchView`: 是否显示搜索栏.
* `showTitleLine`: 是否在头部显示标题栏.
* `showAllCell`: 是否显示全选或全不选按钮.
* `showCount`: 是否显示非叶节点的叶节点数量和选中数量.
* `directBackWhenSingle`: 单选单层结构数据时, 是否直接返回上一页.
* `selectedIds`: 初始的已选中项的id列表.
* `selectable`: 一个数据节点是否可选.
* `childrenKey`: 数据节点中子节点列表对应的键.
* `idKey`: 数据节点中id对应的键.
* `labelKey`: 数据节点中标签对应的键.
* `searchKeys`: 数据节点中普通搜索的键列表.
* `sort`: 数据列表的排序方法.
* `split`: 数据列表拆分区域的方法.
* `flatListProps`: 当数据是平级的时候, `FlatList`的属性.
* `sectionListProps`: 当数据被拆分成区域时, `SectionList`的属性.
* `searchListProps`: 当搜索时`FlatList`的属性.
* `labels`: 内部使用的标签文本.

你可以全局的改变标签文本, 使用如下命令:

```javascript
import {InnerPickList} from 'react-native-picklist';

InnerPickList.defaultProps.labels.xxx = 'xxx';
```

## 样例工程

你可以使用如下步骤来打开样例工程：

1. 进入`example`目录, 使用`yarn`或`npm install`安装模块, 在一个单独的终端中运行`npm start`.
1. 创建一个样例工程, 使用入口文件`index`和模块名称`test`.

## 参考

请参照这个仓库的说明: [react-native-items](https://github.com/gaoxiaosong/react-native-items/blob/master/README-zh_CN.md).