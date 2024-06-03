import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle } from '../styles/styles'
import Header from '../components/Header'
import Heading from '../components/Heading'

import ConfirmOrderItem from '../components/ConfirmOrderItem'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux'


const ConfirmOrder = () => {

    const navigate=useNavigation();

    const {cartItems}=useSelector(state=>state.cart)


    const [itemPrice]=useState(cartItems.reduce((prev,curr)=>prev+curr.quantity*curr.price,0));
    const [shippingCharges]=useState(itemPrice>10000?0:200);
    const [tax]=useState(Number((0.18*itemPrice).toFixed()));
    const [totalAmount]=useState(itemPrice+shippingCharges+tax);




  return (
    <View style={defaultStyle}>
        <Header back={true}/>
{/** Headder*/}
<Heading containerStyle={{
    paddingTop:70,
}}
tesxt1="Confirm" text2='Order' />

<View style={{
    paddingVertical:20,
    flex:1,
}}>
    <ScrollView>
        {
            cartItems.map(i=>(
                <ConfirmOrderItem key={i.product} image={i.image} name={i.name} price={i.price} quantity={i.quantity} />
            ))
        }
    </ScrollView>
</View>

<PriceTag heading={"Subtotal"} value={itemPrice} />
<PriceTag heading={"Shipping"} value={shippingCharges} />
<PriceTag heading={"Tax"} value={tax} />
<PriceTag heading={"Total"} value={totalAmount} />

<TouchableOpacity onPress={()=>navigate.navigate("payment",{
    itemPrice,shippingCharges,tax,totalAmount
})} >
    <Button style={{
        backgroundColor:colors.color3,
        borderRadius:100,
        padding:5,
        margin:10,
    }} textColor={colors.color2} icon={"chevron-right"} 
    >payment</Button>

</TouchableOpacity>

      
    </View>
  )
}

const PriceTag=({heading,value})=>(
    <View style={{
        flexDirection:"row",justifyContent:"space-between",alignItems:"center",
        marginVertical:5,
    }}>
        <Text style={{fontWeight:"800"}}>{heading}</Text>
        <Text>₹{value}</Text>
    </View>
)

export default ConfirmOrder