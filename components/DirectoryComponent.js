import React, {Component} from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/BaseURL'


const mapStatetoProps = state => {
    return {
        campsites: state.campsites,
    }
}

class Directory extends Component {

    static navigationOptions = {
        title: 'Directory'
    }
    
    render() {
        const { navigate } = this.props.navigation
        const renderDirectoryItem = ({item}) => {
        return (
            <Tile
                title={item.name}
                caption={item.description}
                featured
                imageSrc={{uri: baseUrl + item.image}}
                onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
            />
        );
    };
        return (
            <FlatList 
                data={this.props.campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
        }
}

export default connect(mapStatetoProps) (Directory);