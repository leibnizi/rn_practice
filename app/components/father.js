import React,{Component} from 'react';
import {
  View, Text, TouchableHighlight, Switch, TextInput
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Child from './child'
import * as TodoActions from '../redux/actions'

class Father extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        text: null,
        Switch: true,
        todoText: ''
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

    callback = () => {
      console.warn('值为空')
    }

    render() {
        return (
            <View>
              <TouchableHighlight
                onPress={this.props.firstFun}
                >
                <Text>father{ this.state && this.state.text }</Text>
              </TouchableHighlight>
              <Switch
                onValueChange={()=>this.setState({ Switch: !this.state.Switch })}
                value={this.state.Switch}
               />
              <Child
                setText={(value)=>this.setText(value)}
                Switch={this.state.Switch}
                />
              <TextInput
                style={{height: 30, width: 60, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => {
                  this.setState({ todoText: text })
                }}
                value={this.state.todoText}
                />
              <TouchableHighlight
                onPress={() => {
                  this.props.actions.addTodo(this.state.todoText, this.callback)                
                }}
                >
                <Text>增加</Text>
              </TouchableHighlight>
              {
                this.props.todos.map((item, index)=>
                  <Text key={index}>{item.text}</Text>
                )
              }
            </View>
        );
    }
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Father)
