import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, SafeAreaView } from 'react-native';

export default class extends React.PureComponent {
    UNSAFE_componentWillReceiveProps() {
        setTimeout(() => {
            this._scrollToEnd(false);
        }, 0);
    }

    _scrollToEnd = (animated) => {
        this.scrollView && this.scrollView.scrollToEnd({animated});
    };

    _renderBottomItemView = (node, index) => {
        const {onPressItem, labelKey} = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.97}
                key={index}
                style={styles.bottomViewItem}
                onPress={() => onPressItem(index)}
            >
                <Text style={styles.bottomViewItemText}>
                    {node.getInfo()[labelKey]}
                </Text>
            </TouchableOpacity>
        );
    };

    _renderBottomEmptyView = () => {
        return (
            <View style={styles.bottomViewEmpty}>
                <Text style={styles.bottomViewEmptyText}>
                    {this.props.labels.choose}
                </Text>
            </View>
        );
    };

    render() {
        const {selectedItems, onPress} = this.props;
        return (
            <SafeAreaView
                style={styles.bottomViewContainer}
                forceInset={{top: 'never', bottom: 'always', left: 'always', right: 'always'}}
            >
                <ScrollView
                    ref={ref => this.scrollView = ref}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    scrollEnabled={selectedItems.length > 0}
                    contentContainerStyle={styles.bottomViewScrollView}
                >
                    {selectedItems.length > 0
                        ? selectedItems.map(this._renderBottomItemView)
                        : this._renderBottomEmptyView()}
                </ScrollView>
                <View style={styles.bottomViewButtonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.97}
                        style={styles.bottomViewButton}
                        onPress={onPress}
                    >
                        <Text style={styles.bottomViewButtonText}>
                            {this.props.labels.ok}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    bottomViewContainer: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#e6e6ea',
    },
    bottomViewScrollView: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomViewItem: {
        paddingLeft: 6,
        paddingRight: 6,
        height: 30,
        marginLeft: 4,
        marginRight: 4,
        borderRadius: 4,
        backgroundColor: 'white',
        minWidth: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#e6e8ea',
    },
    bottomViewEmpty: {
        paddingLeft: 4,
        paddingRight: 4,
        height: 20,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 4,
        backgroundColor: 'white',
        minWidth: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomViewItemText: {
        fontSize: 12,
        color: '#333333'
    },
    bottomViewEmptyText: {
        fontSize: 14,
        color: '#999999'
    },
    bottomViewButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    bottomViewButton: {
        paddingLeft: 4,
        paddingRight: 4,
        height: 30,
        borderRadius: 4,
        backgroundColor: '#e15151',
        width: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomViewButtonText: {
        fontSize: 14,
        color: '#ffffff'
    },
});