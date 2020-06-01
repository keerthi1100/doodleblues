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



class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemCount: 0,
      DishType: 'Starter',
      slideAnimationModal: false,
      data: this.props.dishList,
      quantaity: 0,
      selectedDish:[],
      updateCartItem:0,
    };
  }

  bookTableFunciton = () => {
    alert('no funciotn is implemented yet');
  };

  goToCartFtn = () => {
  
    this.props.reduxAddtoFinalCart(this.state.selectedDish);
    this.props.navigation.navigate('paceOrderScreen')
  };

  selectDishTypeFtn = () => {
    this.setState({slideAnimationModal: true});
  };
  increaseQty = dishID => {
    
 this.props.reduxAddQty(dishID);
 console.log(this.props);
 this.setState({data:this.props.dishList})
 let qtyy =0;
 let qty = this.props.dishList.map((u,l)=>{
   if(u.selectedQuantati > 0)
   {
      qtyy = qtyy+1;
   }
 })

 this.setState({updateCartItem:qtyy})


 if(this.state.selectedDish.find(item => item.DishID === dishID))
 {
   // nothing to add 
 }
 else
 {
   
  let tempSelectedItem = this.props.dishList.find(item => item.DishID === dishID);
  this.state.selectedDish.push(tempSelectedItem);
  

 }

  };

  decreasQty = dishID => {
    this.props.reduxSubQty(dishID);
    let qtyy =0;
    let qty = this.props.dishList.map((u,l)=>{
      if(u.selectedQuantati > 0)
      {
         qtyy = qtyy-1;
      }
    })
   
    this.setState({updateCartItem:qtyy})

    
 if(this.state.selectedDish.find(item => item.DishID === dishID))
 {
   // nothing to remove 
 }
 else
 {
  let tempSelectedItem = this.props.dishList.find(item => item.DishID === dishID);
  this.state.selectedDish.pop(tempSelectedItem);

 }
     };

     addItem = dishID =>{
       this.props.reduxAddToCart(dishID);
     }

  selectedDishTypetoBeFilterftn = dishTypetobeFilter => {
    this.setState({slideAnimationModal: false});

    const newData = this.props.dishList.filter(item => {
      const itemData = item.dishType.toUpperCase();
      const textData = dishTypetobeFilter.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      DishType: dishTypetobeFilter,
    });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Card image={require('../assets/images/restaurantheader.jpg')}>
          <View>
            <Text style={{marginBottom: 10, fontWeight: 'bold'}}>
              Inka Restaurant
            </Text>

            <Text>Some information about the restaurant</Text>

            <Text>Some more information about the restaurant</Text>
          </View>

          <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity={0.5}
            onPress={this.bookTableFunciton}>
            <Text style={styles.TextStyle}> Book a Table </Text>
          </TouchableOpacity>
        </Card>

        <TouchableOpacity onPress={this.selectDishTypeFtn}>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 20}}>
            {' '}
            {this.state.DishType}{' '}
          </Text>
        </TouchableOpacity>

        <ScrollView>
          <View style={{flex: 1}}>
            <Card containerStyle={{padding: 0}}>
              {this.state.data.map((u, i) => {
                return (
                  <TouchableOpacity
                  onPress ={this.addItem(u.dishID)}
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
                            onPress={this.increaseQty.bind(this, u.DishID)}>
                            <Image
                              style={{width: 20, height: 20}}
                              source={require('../assets/images/plus.png')}
                            />
                          </TouchableOpacity>

                          <Text> {u.selectedQuantati} </Text>

                          <TouchableOpacity
                           onPress={this.decreasQty.bind(this, u.DishID)}
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
            View Cart {this.state.updateCartItem}{' '}
          </Text>
        </TouchableOpacity>

        <Modal
          onDismiss={() => {
            this.setState({slideAnimationModal: false});
          }}
          onTouchOutside={() => {
            this.setState({slideAnimationModal: false});
          }}
          swipeDirection="down"
          onSwipeOut={() => this.setState({slideAnimationModal: false})}
          visible={this.state.slideAnimationModal}
          modalTitle={
            <ModalTitle title="Select Dish Type" hasTitleBar={false} />
          }
          modalAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
          <ModalContent>
            {this.props.dishType.map((u, i) => {
              return (
                <TouchableOpacity
                  onPress={this.selectedDishTypetoBeFilterftn.bind(
                    this,
                    u.DishType,
                  )}>
                  <ListItem
                    key={i}
                    roundAvatar
                    title={u.DishType}
                    avatar={{uri: u.avatar}}
                  />
                </TouchableOpacity>
              );
            })}
          </ModalContent>
        </Modal>
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
    height: '10%',
    backgroundColor: '#181e33',

    borderWidth: 1,
    borderColor: '#fff',
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    reduxAddToCart: DishID =>
      dispatch(AddItemToCart(DishID)),

      reduxAddQty: DishID =>
      dispatch(IncrementItem(DishID)),

      reduxSubQty: DishID =>
      dispatch(DrecremtntItem(DishID)),

      reduxAddtoFinalCart:dishList =>
      dispatch(AddtoFinalCart(dishList))
  };
};

const mapStateToProps = state => {
  return {
    dishList: state.dishList,
    dishType: state.dishTypes,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
