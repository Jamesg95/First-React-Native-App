import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/BaseURL'
import Loading from './Loading'


const mapStatetoProps = state => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    }
}

function RenderItem(props) {

    if(props.isLoading) {
        return <Loading />
    }

    if(props.errMess) {
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }

    if (props.item) {
        return (
            <Card
                featuredTitle={props.item.name}
                image={{uri: baseUrl + props.item.image}}>
                <Text
                    style={{margin: 10}}>
                    {props.item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
                <RenderItem 
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                />
                <RenderItem 
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} 
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderItem 
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStatetoProps) (Home);