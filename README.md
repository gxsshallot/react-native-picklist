# react-native-picklist

[![npm version](https://img.shields.io/npm/v/react-native-picklist.svg?style=flat)](https://www.npmjs.com/package/react-native-picklist)
[![Build Status](https://travis-ci.org/gaoxiaosong/react-native-picklist.svg?branch=master)](https://travis-ci.org/gaoxiaosong/react-native-picklist)

This is a picklist page. It supports:

* Single Level or Multiple Level data.
* Single Select or Multiple Select.
* Show or Hide the internal components.
* Customize the UI component.
* Search in the data automaticlly.
* Section style page.

## ScreenShots

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

* `title`:  Page title.
* `data`: Data to show. We will construct a virtual root node to contain it.

Optional:

* `firstTitleLine`: First item displayed in `PickListTitleLine` when it has the multi-level data and show the title line.
* `multilevel`: Has multi-level data or not. Default is `false`.
* `multiselect`: Is multi-select or not. Default is `false`.
* `onFinish`: Pass the selected items when finish selecting.
* `rightTitle`: Button title on the right corner.
* `rightClick`: Button click callback on the right corner.
* `renderRow`: Customize a row display. You can override this property to make the list readonly. Default implement is in `PickListDefaultRow.js`.
* `renderHeader`: Customize header of page.
* `showNaviBar`: Show navigation bar or not.
* `showBottomView`: Show bottom bar or not.
* `showSearchView`: Show search bar or not.
* `showTitleLine`: Show title line at the header or not.
* `showAllCell`: Show select all or deselect all cell or not.
* `showCount`: Show not leaf item's children count and selected count.
* `numberOfTextLines`: Max number of lines of `Text` component in one row. Default is `0`, means no restrict of lines. You can set to `1` for single line text mode.
* `directBackWhenSingle`: Directly go back to previous page or not when single-select single-level data.
* `selectedIds`: Initial selected item's identifier list.
* `selectable`: Can a tree node selectable or not.
* `childrenKey`: Children key of tree node.
* `idKey`: Identifier key of tree node.
* `labelKey`: Label key of tree node.
* `searchKeys`: Normal search keys of tree node.
* `sort`: Sort method for data list.
* `split`: Split method when generate sections of data list.
* `flatListProps`: Props of `FlatList` when data is flat.
* `sectionListProps`: Props of `SectionList` when data is splitted to sections.
* `searchListProps`: Props of `FlatList` when searching.
* `labels`: Label text in component.

You can change labels globally by following statement:

```javascript
import {InnerPickList} from 'react-native-picklist';

InnerPickList.defaultProps.labels.xxx = 'xxx';
```

You can call function with PickList view reference:

```javascript
<PickList
    ref={this.picklist = ref}
    ...
/>

this.picklist.xxx();
```

Following functions supported:

* `getSelectedItems: () => Tree[]`: Get current selected items. You can handle these with [Tree API](https://github.com/gaoxiaosong/general-tree#Interface).
* `backToPreviousPage: () => boolean`: Auto go back to previous page. If it is the first page, it returns false. Otherwise it returns true.

## Example Project

You can open the example project by following steps:

1. Enter `example`. Use `yarn` or `npm install` to install the modules. Run `npm start` in a seperate terminal.
1. Create a example project with entry file `index` and module name `test`.