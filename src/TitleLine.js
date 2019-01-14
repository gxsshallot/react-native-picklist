import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import ArrowImage from '@hecom/image-arrow';
import Types from './Types';

export default class extends React.PureComponent {
    static propTypes = {
        ...Types,
        levelItems: PropTypes.array.isRequired,
        onPress: PropTypes.func.isRequired,
    };
    
    componentDidUpdate() {
        setTimeout(() => {
            this.scrollView && this.scrollView.scrollToEnd({animated: false});
        }, 0);
    }

    render() {
        return (
            <View style={styles.view}>
                <ScrollView
                    horizontal={true}
                    style={styles.scroll}
                    contentContainerStyle={styles.content}
                    showsHorizontalScrollIndicator={false}
                    ref={ref => this.scrollView = ref}
                >
                    {this.props.levelItems.map(this._renderItem)}
                </ScrollView>
            </View>
        );
    }

    _renderItem = (item, index) => {
        const {levelItems, labelKey, onPress} = this.props;
        const isLast = index === levelItems.length - 1;
        const color = isLast ? '#666666' : '#e15151';
        return (
            <View key={index} style={styles.item}>
                <TouchableOpacity onPress={() => onPress(index + 1)}>
                    <Text style={[styles.text, {color}]}>
                        {item.getInfo()[labelKey]}
                    </Text>
                </TouchableOpacity>
                {!isLast && <ArrowImage style={styles.image} />}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        height: 20,
        marginLeft: 16,
        marginRight: 16,
    },
    scroll: {
        flex: 1,
    },
    content: {
        height: 20,
        flexDirection: 'row',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 13,
    },
    image: {
        width: 8,
        height: 8,
        marginHorizontal: 5,
    },
});