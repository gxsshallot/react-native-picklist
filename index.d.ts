import * as React from 'react';
import { ImageRequireSource, FlatListProps, SectionListProps, StyleProp, ViewProps } from 'react-native';
import Tree, { SelectValueType } from 'general-tree';

export interface PickListState {
    levelItems: Tree[];
    selectedItems: Tree[];
    isSearching: boolean;
    searchText: string;
    screenWidth: number;
    frame?: StyleProp<ViewProps>;
}

export interface PickListProps {
    title: string;
    data: {} | Array;
    navigation: any;
    firstTitleLine?: string;
    multilevel?: boolean;
    multiselect?: boolean;
    onFinish?: (selectedItems: Tree[]) => void;
    rightTitle?: string | Array<React.ReactElement>;
    rightClick?: (index?: number) => void;
    renderRow?: (treeNode: Tree, props: PickListProps) => React.ReactElement;
    renderHeader?: (selectedItems: Tree[]) => React.ReactElement;
    showBottomView?: boolean;
    showSearchView?: boolean;
    showTitleLine?: boolean;
    showAllCell?: boolean;
    showCount?: boolean;
    numberOfTextLines?: number;
    directBackWhenSingle?: boolean;
    cancelableWhenDirectBack?: boolean;
    selectedIds?: Array;
    selectable?: (treeNode: Tree) => boolean;
    childrenKey?: string;
    idKey?: string;
    labelKey?: string;
    searchKeys?: string[];
    sort?: (a: Tree, b: Tree) => -1 | 0 | 1;
    split?: (treeNodes: Tree[]) => Array<Tree | Tree[]>;
    flatListProps?: FlatListProps;
    sectionListProps?: SectionListProps;
    searchListProps?: FlatListProps;
    buttonProps?: ViewProps;
    labels: {
        close?: string;
        search?: string;
        selectAll?: string;
        deselectAll?: string;
        ok?: string;
        choose?: string;
        cancel?: string;
    };
}

export default class PickList extends React.PureComponent<PickListProps, PickListState> {
    getSelectedItems: () => Tree[];
    backToPreviousPage: () => boolean;
};

export type PickListRowFunc = (treeNode: Tree, props: PickListProps) => React.ReactElement;

export const PickListDefaultRow: PickListRowFunc;

interface RowUtilType {
    singleLevelNode: PickListRowFunc;
    multiLevelNode: PickListRowFunc;
    multiLevelLeafNode: PickListRowFunc;
    multiLevelNotLeafNode: PickListRowFunc;
    notselect_image: () => ImageRequireSource;
    select_image: () => ImageRequireSource;
    incomp_image: () => ImageRequireSource;
    single_check_image: () => ImageRequireSource;
    getImage: (treeNode: Tree, cascade?: boolean) => ImageRequireSource | void;
}

export const PickListRowUtil: RowUtilType;

interface ShowAllCellProps extends PickListProps {
    treeNode: Tree;
    onPress: (treeNode: Tree) => void;
}

export class PickListShowAllCell extends React.PureComponent<ShowAllCellProps> {};

interface BottomBarProps extends PickListProps {
    selectedItems: Tree[];
    onPress: () => void;
    onPressItem: (index: number) => void;
}

export class PickListBottomBar extends React.PureComponent<BottomBarProps> {};

interface CellProps extends PickListProps {
    isSearching: boolean;
    treeNode: Tree;
    onPress: (treeNode: Tree, isInternal: boolean) => void;
}

interface CellState {
    status: SelectValueType;
}

export class PickListCell extends React.Component<CellProps, CellState> {};

interface TitleLineProps extends PickListProps {
    levelItems: Tree[];
    onPress: (index: number) => void;
}

export class PickListTitleLine extends React.PureComponent<TitleLineProps> {};