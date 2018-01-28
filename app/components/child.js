import React,{Component} from 'react';
import {
  View, Text, TouchableHighlight, TextInput, StyleSheet, ScrollView
} from 'react-native';
/*
 * 引入这个两个头文件
 * */
import {observable, action} from 'mobx';
import {observer} from 'mobx-react/native';

/*
* 假数据
* */
const datas = [
    {name:'苹果',count:0},
    {name:'梨',count:0},
    {name:'香蕉',count:0},
    {name:'草莓',count:0},
    {name:'橘子',count:0},
];

/*
* 对整个列表添加观察，观察列表个数的变化
* */
@observer
export default class Child extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        text: 'child'
      };
    }

    /*
    * 数据管理器
    * */
    dataManager = new DataSource();

    componentWillMount() {
        /*
        * 赋值初始数据
        * */
        this.dataManager.replace(datas);
    }

    /*
    * 添加一个新的Item
    * */
    addItem = () => {
       let item = {name:'西瓜',count:0};
        this.dataManager.addItem(item)
    };

    /*
    * 删除第一个Item
    * */
    deleteItem = () => {
        this.dataManager.deleteItem(0);
    };

    componentWillUpdate(nextProps, nextState) {
      console.log('componentWillUpdate', nextState.text)
    }

    componentDidMount() {
      this.setState({
        text: '111'
      })
    }

    render() {
        return (
        <View style={styles.container}>
            {/* <TouchableHighlight onPress={this.props.setText}>
              <Text>child{ this.state && this.state.text }</Text>
            </TouchableHighlight> */}
            <TextInput
              style={{height: 30, width: 60, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => {
                this.setState({text})
                this.props.setText(text)
              }}
              value={this.state.text}
            />
            {
              this.props.Switch ?
              <Text>{ this.state.text }</Text>
                :
              <Text>{ null }</Text>
            }
            <View style={styles.addItemView}>
                <Text style={styles.addItem} onPress={this.addItem}>增加</Text>
                <Text style={styles.addItem} onPress={this.deleteItem}>删除</Text>
            </View>
            <ScrollView>
                {
                    this.dataManager.dataSource.slice(0).map((item,i)=> <ItemView key = {i} item = {item}/>)
                }
            </ScrollView>
        </View>
        );
    }
}

/*
* 对每一个Item添加观察,改变个数
* */
@observer
class ItemView extends Component {

    countAdd = () => {
        this.props.item.add();
    };

    countDec = () => {
        this.props.item.dec();
    };

    render() {
        const {item} = this.props;
        return (
            <View style={styles.itemContainer}>
                <Text>{item.name}</Text>
                <Text>{item.count}</Text>
                <Text style={styles.btn} onPress={this.countAdd}> + </Text>
                <Text style={styles.btn} onPress={this.countDec}> - </Text>
            </View>
        );
    }
}

/*
 * 整个列表页数据管理器
 * */
class DataSource {
    // 本地数据源
    @observable
    dataSource = [];

    // 添加初始数据
    @action
    replace = (items) => {
        // 1. 清空原数据
        this.dataSource.splice(0, this.dataSource.length);

        // 2. 加载新数据
        items.map((item, i) => {
            this.dataSource.push(new Item(item));
        });
    };

    // 添加新数据
    @action
    addItem = (item) => {
        this.dataSource.unshift(new Item(item));
    };


    // 删除一条数据
    @action
    deleteItem = (idx) => {
        this.dataSource.splice(idx, 1);
    };
}
/*
 * 单条Item数据管理器
 * */
class Item {

    /*
    * 商品名称（此值是不变的所以不需要检测此值）
    * */
    name;

    /*
    * 监控商品个数
    * */
    @observable
    count;


    constructor(item) {
        this.name = item.name;
        this.count = item.count;
    };

    /*
    * 商品个数+1
    * */
    @action
    add = () => {
        this.count += 1;
    };

    /*
    * 商品个数-1
    * */
    @action
    dec= () => {
        this.count > 0 && (this.count -= 1);
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  addItemView: {
    // textAlign: 'center',
    margin: 10,
  },
  addItem: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  itemContainer: {
    flex:1,
    justifyContent: 'flex-start'
  },
  name: {
    flex: 1
  },
  count: {
    flex: 1
  },
  btn: {
    flex: 1
  },
});
