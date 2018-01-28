import React,{Component} from 'react';
import {
  View, Text, TouchableHighlight, Switch
} from 'react-native';
import Child from './child'

export default class Father extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        text: null,
        Switch: true
      };
    }

    // componentDidMount() {
    //   this.setState({
    //     text: 111
    //   })
    // }

    setText = (value) => {
      this.setState({
        text: value
      })
    }

    render() {
        return (
            <View>
              <TouchableHighlight onPress={this.props.firstFun}>
                <Text>father{ this.state && this.state.text }</Text>
              </TouchableHighlight>
              <Child
                setText={(value)=>this.setText(value)}
                Switch={this.state.Switch}
                />
              <Switch
                onValueChange={()=>this.setState({ Switch: !this.state.Switch })}
                value={this.state.Switch}
               />
            </View>
        );
    }
}
