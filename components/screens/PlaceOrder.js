import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
} from 'react-native-modals';
import {connect} from 'react-redux';
import {AddItemToCart, IncrementItem , DrecremtntItem ,AddtoFinalCart} from '../../actions'

let DishSelected=[]



class PlaceOrder extends Component {
  constructor(props) {
    super(props);

    this.state={
        total:0
    }


    
  }

  componentDidMount()
  {
    let totalamt = 0;

    this.props.finalDishList.map((u,l)=>{
        if(u.selectedQuantati > 0)
        {
          
            totalamt = totalamt + parseFloat(u.DishPrice) * parseInt(u.selectedQuantati);
         
        }
      })

      this.setState({total:totalamt})
  }


  render() {
    return (
      <View style={styles.MainContainer}>

          <View style ={{flex:1 , justifyContent:'center', alignItems:'center' , backgroundColor:'#181e33'}}>
      
          <View>
            <Text style={{ margin :50,fontWeight: 'bold', color:'#fff', alignItems:'center'}}>
              Total Cost : {this.state.total}
            </Text>

          </View>

 
       

</View>

<View style ={{flex:1}}>
        <ScrollView>
          <View style={{flex: 1}}>
            <Card containerStyle={{padding: 0}}>
              {this.props.finalDishList.map((u, i) => {
                return (
                  <TouchableOpacity
                 
                  >
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <View style={{height: 50, width: '100%', borderWidth: 1}}>
                        <Text> {u.dishname} </Text>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                          }}>
                          <TouchableOpacity
                           >
                            <Image
                              style={{width: 20, height: 20}}
                              source={require('../assets/images/plus.png')}
                            />
                          </TouchableOpacity>

                          <Text> {u.selectedQuantati} </Text>

                          <TouchableOpacity
                          
                          >
                            <Image
                              style={{width: 20, height: 20}}
                              source={require('../assets/images/minus.png')}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Card>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.GoToCartBtn}
          activeOpacity={0.5}
          onPress={this.goToCartFtn}>
          <Text style={styles.TextStyle}>
           Place Order  {this.state.total}
          </Text>
        </TouchableOpacity>

       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,

    backgroundColor: '#F5FCFF',
  },

  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#181e33',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  GoToCartBtn: {
    marginTop: 10,

    width: '100%',
    height: '15%',
    backgroundColor: '#181e33',

    borderWidth: 1,
    borderColor: '#fff',
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});



const mapStateToProps = state => {
  return {
     finalDishList:state.finalDishSelected
  };
};

export default connect(
  mapStateToProps,
  null,
)(PlaceOrder);
