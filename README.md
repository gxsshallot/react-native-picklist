# react-native-picklist

[中文说明](README-zh_CN.md)

This is a picklist page. It supports:

* single-level or multi-level data
* single-select or multi-select
* show or hide the internal components
* customize the UI component
* search in the data automaticlly
* section style page

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

You should also install the package in `peerDependencies`:

* react
* react-native
* react-navigation

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
* `showBottomView`: Show bottom bar or not.
* `showSearchView`: Show search bar or not.
* `showTitleLine`: Show title line at the header or not.
* `showAllCell`: Show select all or deselect all cell or not.
* `showCount`: Show not leaf item's children count and selected count.
* `directBackWhenSingle`: Directly go back to previous page or not when single-select single-level data.
* `selectedIds`: Initial selected item's identifier list.
* `selectable`: Can a tree node selectable or not.
* `childrenKey`: Children key of tree node.
* `idKey`: Identifier key of tree node.
* `labelKey`: Label key of tree node.
* `searchKeys`: Normal search keys of tree node.
* `sort`: Sort method for data list.
* `split`: Split method when generate sections of data list.
* `searchLabel`: Placeholder of search bar.

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