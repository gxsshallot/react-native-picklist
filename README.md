# react-native-picklist

[Chinese README](README-zh_CN.md)

[ScreenShots](resource/ScreenShot.md)

This is a picklist page. It supports:

* single-level or multi-level data
* single-select or multi-select
* show or hide the internal components
* customize the UI component
* search in the data automaticlly
* section style page

## Install

Install by Yarn:

```shell
yarn add react-native-picklist
```

Install by NPM:

```shell
npm install --save react-native-picklist
```

## Usage

Import the module in the file:

```jsx
import PickList from 'react-native-picklist';
```

You can set the following properties or see example project to learn how to use it.

## Properties

Required:

* `title: string`:  Page title.
* `data: object | object[]`: Data to show. We will construct a virtual root node to contain it.

Optional:

* `firstTitleLine?: string`: First item displayed in `PickListTitleLine` when it has the multi-level data and show the title line.
* `multilevel?: boolean`: Has multi-level data or not. Default is `false`.
* `multiselect?: boolean`: Is multi-select or not. Default is `false`.
* `onFinish?: (nodes: Tree[]) => void`: Pass the selected items when finish selecting.
* `rightTitle?: string`: Button title on the right corner.
* `rightClick?: () => void`: Button click callback on the right corner.
* `renderRow?: (treeNode: Tree, props: PickList.props) => JSX.Component`: Customize a row display. You can override this property to make the list readonly. Default implement is in `PickListDefaultRow.js`.
* `renderSeparator?: () => JSX.Component`: Customize cell separator.
* `renderSectionSeparator?: () => JSX.Component`: Customize section separator.
* `renderHeader?: (state: PickList.state) => JSX.Component`: Customize header of page.
* `showBottomView?: boolean`: Show bottom bar or not.
* `showSearchView?: boolean`: Show search bar or not.
* `showTitleLine?: boolean`: Show title line at the header or not.
* `showAllCell?: boolean`: Show select all or deselect all cell or not.
* `showCount?: boolean`: Show not leaf item's children count and selected count.
* `directBackWhenSingle?: boolean`: Directly go back to previous page or not when single-select single-level data.
* `searchPlaceholder?: string`: Placeholder of search bar.
* `selectedIds?: array`: Initial selected item's identifier list.
* `selectable?: (treeNode: Tree) => boolean`: Can a tree node selectable or not.
* `childrenKey?: string`: Children key of tree node.
* `idKey?: string`: Identifier key of tree node.
* `labelKey?: string`: Label key of tree node.
* `searchKeys?: string[]`: Normal search keys of tree node.
* `sort?: (a: Tree, b: Tree) => -1 | 0 | 1`: Sort method for data list.
* `splitFunc?: (arr: Tree[]) => Tree[][]`: Split method when generate sections of data list.
* `width?: number`: Page width.

## Example Project

You can open the example project by following steps:

1. `cd example`.
1. Use `yarn` or `npm install` to install the modules.
1. For iOS, you should run `pod install` in `ios` directory.
1. Run `npm run bundle:ios` or `npm run bundle:android` to bundle the package.
1. Run `npm start` in a seperate terminal.
1. Use `Xcode` or `Android Studio` to open the project in `example/ios` or `example/android`.
1. Run the project.

## Reference

Please see this repository: [react-native-items](https://github.com/gaoxiaosong/react-native-items).