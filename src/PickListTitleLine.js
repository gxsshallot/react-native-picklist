import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

export default class extends React.Component {
    /**
     * levelItems：展示的节点数组。
     * onPress：点击事件。
     */

    componentWillReceiveProps() {
        setTimeout(() => {
            this._scrollToEnd(false);
        }, 0);
    }

    _scrollToEnd = (animated) => {
        this.scrollView && this.scrollView.scrollToEnd({animated});
    };

    _renderItem = (item, index) => {
        const {labelKey, onPress} = this.props;
        const isLast = index === this.props.levelItems.length - 1;
        const color = isLast ? '#666666' : '#e15151';
        return (
            <View key={index} style={styles.titleLineSingleContainer}>
                <TouchableOpacity onPress={() => onPress(index + 1)}>
                    <Text style={[styles.titleLineSingleText, {color}]}>
                        {item.getInfo()[labelKey]}
                    </Text>
                </TouchableOpacity>
                {!isLast && (
                    <Image
                        source={require('./image/arrow_right.png')}
                        style={styles.titleLineImage}
                    />
                )}
            </View>
        );
    };

    render() {
        return (
            <View style={styles.titleLineContainer}>
                <ScrollView
                    horizontal={true}
                    style={{width: this.props.width - 32}}
                    contentContainerStyle={[styles.titleLineScrollView]}
                    showsHorizontalScrollIndicator={false}
                    ref={(ref) => this.scrollView = ref}
                >
                    {this.props.levelItems.map(this._renderItem)}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleLineContainer: {
        height: 20,
        marginLeft: 16,
        marginRight: 16,
    },
    titleLineScrollView: {
        height: 20,
        flexDirection: 'row',
    },
    titleLineSingleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleLineSingleText: {
        fontSize: 13,
    },
    titleLineImage: {
        width: 8,
        height: 8,
        marginHorizontal: 5,
    },
});