import pinyin from 'pinyin';
import { Listener } from 'react-native-hecom-common';

export const kId = '__treeid__';
export const kChild = '__treechild__';
export const kLabel = '__treelabel__';
export const kParent = '__treeparent__';
export const kPinyin = '__pinyin__';
export const kInitialPinyin = '__initialpinyin__';

const kStatusChangeEvent = '__TreeUpdateListener__';

const Tree = class {
    constructor(root, parent, childrenKey, idKey, labelKey) {
        this.root = {...root};
        this.root[kParent] = parent;
        this.root[kId] = String(this.root[idKey]);
        this.root[kLabel] = this.root[labelKey];
        this.generatePinyin();
        this.root[kChild] = this.root[childrenKey] ?
            this.root[childrenKey].map(item => new Tree(item, this, childrenKey, idKey, labelKey)) :
            undefined;
        this.isSelected = 0;
    }

    generatePinyin = () => {
        const rPinyin = pinyin(this.root[kLabel], {style: pinyin.STYLE_NORMAL, heteronym: true});
        this.root[kPinyin] = rPinyin.map(item => item[0]).join('');
        const rInitialPinyin = pinyin(this.root[kLabel], {style: pinyin.STYLE_INITIALS, heteronym: true});
        this.root[kInitialPinyin] = rInitialPinyin.map(item => item[0].substring(0, 1)).join('');
    };

    isLeaf = () => this.root[kChild] === undefined;

    selectStatus = (cascade = true) => {
        if (this.isLeaf()) {
            return this.isSelected;
        } else if (!cascade) {
            return this.isSelected;
        } else {
            if (this.getSelectedLeafCount() === 0) {
                return 0;
            } else if (this.getLeafCount() === this.getSelectedLeafCount()) {
                return 1;
            } else {
                return 0.5;
            }
        }
    };

    isSelect = (cascade = true) => this.selectStatus(cascade) === 1;
    isNotSelect = (cascade = true) => this.selectStatus(cascade) === 0;
    isInCompleteSelect = (cascade = true) => this.selectStatus(cascade) === 0.5;

    getLeafCount = () => {
        if (this.isLeaf()) {
            return 1;
        } else {
            return [0, ...this.root[kChild]].reduce((prv, cur) => prv + cur.getLeafCount());
        }
    };

    getSelectedLeafCount = () => {
        if (this.isLeaf()) {
            return this.isSelected;
        } else {
            return [0, ...this.root[kChild]].reduce((prv, cur) => prv + cur.getSelectedLeafCount());
        }
    };

    getDeepth = () => {
        if (this.isLeaf()) {
            return 1;
        } else {
            return 1 + [0, ...this.root[kChild]].reduce((prv, cur) => {
                const curDeepth = cur.getDeepth();
                if (curDeepth > prv) {
                    return curDeepth;
                } else {
                    return prv;
                }
            });
        }
    };

    getInfo = () => {
        return {...this.root, [kChild]: undefined, [kParent]: undefined};
    };

    getId = () => {
        return this.root[kId];
    };

    getParent = () => {
        return this.root[kParent];
    };

    getPinyin = () => {
        return this.root[kPinyin];
    };

    getChildren = (sort) => {
        const children = this.root[kChild];
        let notLeafItems = children.filter(treeNode => !treeNode.isLeaf());
        if (sort) {
            notLeafItems = notLeafItems.sort(sort);
        }
        let leafItems = children.filter(treeNode => treeNode.isLeaf());
        if (sort) {
            leafItems = leafItems.sort(sort);
        }
        return [[...notLeafItems], [...leafItems]];
    };

    getLeafChildren = () => {
        if (this.isLeaf()) {
            return [this];
        } else {
            const children = this.root[kChild];
            return [[], ...children].reduce((prv, cur) => {
                const leafs = cur.getLeafChildren();
                return [...prv, ...leafs];
            });
        }
    };

    setInitialState = (selectedIds, cascade = true) => {
        const result = [];
        if (Array.isArray(selectedIds) && selectedIds.length > 0) {
            selectedIds = selectedIds.map(item => String(item));
            if (selectedIds.indexOf(this.root[kId]) >= 0) {
                this.update(cascade);
                result.push(this);
            } else if (!this.isLeaf()) {
                this.root[kChild].forEach(subNode => {
                    const r = subNode.setInitialState(selectedIds, cascade);
                    r.forEach(item => result.push(item));
                });
            }
        }
        return result;
    };

    update = (cascade = true) => {
        if (this.isLeaf()) {
            this.isSelected = 1 - this.isSelected;
        } else {
            this.isSelected = this.selectStatus(cascade) < 1 ? 1 : 0;
            cascade && this.root[kChild].forEach(treeNode => treeNode._fromUpNotification(this.isSelected));
        }
        cascade && this.root[kParent] && this.root[kParent]._fromDownNotification();
        this._onStatusChange();
    };

    search = (text, keys, multiselect, canSearch) => {
        const result = [];
        if (canSearch && (multiselect || this.isLeaf())) {
            const allKeys = [...keys, kLabel, kPinyin, kInitialPinyin];
            const isContain = allKeys.some(key =>
                this.root[key] && this.root[key].toUpperCase().indexOf(text.toUpperCase()) >= 0);
            if (isContain) {
                result.push(this);
            }
        }
        if (!this.isLeaf()) {
            [...this.getChildren()[0], ...this.getChildren()[1]].forEach(child => {
                const childresult = child.search(text, keys, multiselect, true);
                childresult.forEach(item => result.push(item));
            });
        }
        return result;
    };

    hasAncestor = (ancestor) => {
        if (this.root[kParent]) {
            if (ancestor.getId() === this.root[kParent].getId()) {
                return true;
            } else {
                return this.root[kParent].hasAncestor(ancestor);
            }
        } else {
            return false;
        }
    };

    findById = (childId) => {
        if (this.root[kId] === childId) {
            return [this];
        } else if (this.isLeaf()) {
            return undefined;
        } else {
            return [undefined, ...this.root[kChild]].reduce((prv, cur) => {
                const r = cur.findById(childId);
                if (r) {
                    if (prv) {
                        return [...prv, ...r];
                    } else {
                        return [...r];
                    }
                } else {
                    return prv;
                }
            });
        }
    };

    _fromUpNotification = (status) => {
        if (this.isLeaf()) {
            this.isSelected = status;
        } else {
            this.root[kChild].forEach(treeNode => treeNode._fromUpNotification(status));
        }
        this._onStatusChange();
    };

    _fromDownNotification = () => {
        this._onStatusChange();
        this.root[kParent] && this.root[kParent]._fromDownNotification();
    };

    listenerKey = () => {
        return [kStatusChangeEvent, this.root[kId]];
    };

    _onStatusChange = () => {
        Listener.trigger(this.listenerKey());
    };
};

export default Tree;