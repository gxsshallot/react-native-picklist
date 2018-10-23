import * as React from 'react';
import { ImageRequireSource, FlatListProps, SectionListProps } from 'react-native';
import Tree from 'react-native-general-tree';

export interface PickListState {

}

export interface PickListProps {
    title: string;
    data: {} | Array;
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
    directBackWhenSingle?: boolean;
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
    closeLabel?: string;
    searchLabel?: string;
    selectAllLabel?: string;
    deselectAllLabel?: string;
    okLabel?: string;
    chooseLabel?: string;
}

export type PickListRowFunc = (treeNode: Tree, props: PickListProps) => React.ReactElement;

export const PickListDefaultRow: PickListRowFunc;

interface RowUtilType {
    singleLevelNode: PickListRowFunc;
    multiLevelNode: PickListRowFunc;
    multiLevelLeafNode: PickListRowFunc;
    multiLevelNotLeafNode: PickListRowFunc;
    notselect_image: ImageRequireSource;
    select_image: ImageRequireSource;
    incomp_image: ImageRequireSource;
    single_check_image: ImageRequireSource;
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

export {
    PickListCell,
    PickListTitleLine,
};

export default PickList;