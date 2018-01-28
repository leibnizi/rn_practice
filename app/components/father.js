import React,{Component} from 'react';
import {
  View, Text, TouchableHighlight
} from 'react-native';

export default class Father extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        text: null
      };
    }

    // componentDidMount() {
    //   this.setState({
    //     text: 111
    //   })
    // }

    render() {
        return (
            <View>                
              <TouchableHighlight onPress={this.props.firstFun}>
                <Text>father{ this.state && this.state.text }</Text>
              </TouchableHighlight>
            </View>
        );
    }
}
