import * as React from 'react';
import { ImageRequireSource } from 'react-native';
import Tree from 'react-native-general-tree';

export interface PickListProps {
    
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