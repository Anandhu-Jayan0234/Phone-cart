import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductType } from '@/types/type';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {}

const HomeScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const URL = 'http://10.0.2.2:8000/products';
    const response = await axios.get(URL);
    setProducts(response.data);
    setIsLoading(false);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Header />
      {products.length > 0 && (
        <View>
          <View style={styles.singleItemContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: products[0]?.images[1] }} style={styles.singleProductImage} />
              <View style={styles.discountContainer}>
                <Text style={styles.discountText}>33%</Text>
                <Text style={styles.discountText}>OFF</Text>
              </View>
              <TouchableOpacity style={styles.heartIconContainer}>
                <Ionicons name="heart-outline" size={24} color="#ff0000" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.singlePrice}>{products[0]?.title}</Text>
          <Text style={styles.pack}>1 Pack</Text>
          <Text style={styles.singlePrice}>AED {products[0]?.price}</Text>
        </View>
      )}

      {products.length > 0 && (
        <View style={styles.pcsContainer}>
          <Text style={styles.pcs}>Pcs/Carton {products[0]?.price}</Text>
          <View style={styles.counterBox}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setQuantity(q => Math.max(1, q - 1))}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.counterValueBox}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setQuantity(q => q + 1)}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Per Carton Box */}
     <View style={styles.percart}>
        <TouchableOpacity style={styles.percartt}>
          <Text style={styles.whatsappText}>Per Carton</Text>
          <Ionicons name="chevron-down-outline" size={25} style={styles.chevronIcon} />
        </TouchableOpacity>
      </View>


      {/* WhatsApp Row */}
      <View style={[styles.whatsappContainer, { bottom:25}]}>
        <TouchableOpacity style={styles.whatsappButton}>
          <Ionicons name="logo-whatsapp" style={styles.whatsappIcon} />
          <Text style={styles.whatsappText}>Chat With Us</Text>
          <Ionicons name="chevron-forward-outline" size={25} style={styles.chevronIcon} />
        </TouchableOpacity>
      </View>

      {/* Barcode Row */}
      <View style={[styles.barcodeContainer, { bottom:15 }]}>
        <TouchableOpacity style={styles.barcodeButton}>
          <Ionicons name="barcode-outline" style={styles.barcodeIcon} />
          <View style={styles.barcodeTextContainer}>
            <Text style={styles.barcodeMainText}>Scan Product</Text>
            <Text style={styles.barcodePackText}>1 Pack</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={25} style={styles.chevronIcon} />
        </TouchableOpacity>
      </View>

      {/* Document Row */}
      <View style={[styles.barcodeContainer, { bottom:2}]}>
        <TouchableOpacity style={styles.barcodeButton}>
          <Ionicons name="document-text-outline" style={styles.barcodeIcon} />
          <View style={styles.barcodeTextContainer}>
            <Text style={styles.barcodeMainText}>Know Your Product</Text>
            <Text style={styles.barcodePackText}>Description</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={25} style={styles.chevronIcon} />
        </TouchableOpacity>
      </View>

      {/* Related Products Section */}
      <View style={styles.relatedBox}>
        <View style={styles.headingRow}>
          <Text style={styles.heading}>Related Products</Text>
          <Ionicons name="arrow-forward-circle-outline" size={24} color="#fff" style={styles.arrowIcon} />
        </View>
        <FlatList
          data={products}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.images[0] }} style={styles.productImage} />
                <View style={styles.discountContainer}>
                  <Text style={styles.discountText}>33%</Text>
                  <Text style={styles.discountText}>OFF</Text>
                </View>
                <TouchableOpacity style={styles.heartIconContainer}>
                  <Ionicons name="heart-outline" size={24} color="#ff0000" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>AED {item.price}</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => alert('Select')}
              >
                <Text style={styles.price}>Select Option</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.add}>
          <Text style={styles.priceText}>AED 115</Text>
          <TouchableOpacity
            style={styles.sel}
            onPress={() => alert('Added to Cart')}
          >
            <Text style={styles.p}>Add To Cart</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#f5f5f5',
  },
  relatedBox: {
    backgroundColor: '#5d46a8ff',
    borderRadius: 12,
    margin: 18,
    padding: 20,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#fff',
  },
  arrowIcon: {
    marginTop: 2,
    marginLeft: 'auto',
  },
  itemContainer: {
    width: 150,
    marginRight: 12,
    alignItems: 'center',
    backgroundColor: '#868687ff',
    borderRadius: 10,
    padding: 10,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  price: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  singlePrice: {
    color: '#181414ff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    marginLeft: 24,
  },
  singleItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: '#5d46a8ff',
    borderRadius: 16,
    padding: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginLeft: 20,
  },
  singleProductImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  pack: {
    color: '#b1b1b1ff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: 4,
    marginLeft: 24,
  },
  pcsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5d46a8',
    borderRadius: 10,
    width: 120,
    height: 40,
    overflow: 'hidden',
    marginRight: 24,
    marginBottom: 10,
    marginTop: -90,
    backgroundColor: '#f9f9f9f3',
  },
  counterButton: {
    flex: 1,
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValueBox: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  counterButtonText: {
    color: '#3d2f6bff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181414ff',
  },
  pcs: {
    color: '#181414ff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 80,
    marginLeft: 24,
  },
  selectButton: {
    backgroundColor: '#46377dff',
    padding: 10,
    borderRadius: 11,
    marginTop: 30,
  },

  whatsappButton: {
    flex: 1,
    backgroundColor: '#7db061ff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginLeft: 24,
    marginRight: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsappIcon: {
    fontSize: 25,
    color: '#058124ff', // WhatsApp icon color
  },
  whatsappText: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    color: '#000',
  },
  barcodeIcon: {
    fontSize: 25,
    color: '#1357ccff', // Adjusted to match the barcode icon color
  },
  barcodePackText: {
    marginTop: 2, // Add some space above the pack text
    fontSize: 12, // Smaller font size for the pack text
    color: '#555',
  },
  barcodeMainText: {
    fontSize: 18,
    textAlign: 'left',
    color: '#000',
  },
  barcodeTextContainer: {
    flex: 1,
    flexDirection: 'column', // Stack text vertically
    justifyContent: 'center', // Center vertically
    marginLeft: 10, // Add some space between the icon and text
  },
  barcodeButton: {
    flex: 1,
    backgroundColor: '#d4d4d4ff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginLeft: 24,
    marginRight: 24,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  chevronIcon: {
    marginLeft: 'auto', // Push the chevron icon to the right
  },

  add: {
    flex: 1,
    backgroundColor: '#201e25ff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 24,
    marginRight: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between', // Aligns items within the button
  },
  priceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sel: {
    backgroundColor: '#46377dff', // Adjusted for better visibility
    borderRadius: 8,
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  p: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  perCartonBox: {
    backgroundColor: '#8d5454f3',
    borderRadius: 10,
    marginHorizontal: 24,
    marginBottom: 10,
  },
  perCartonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181414ff',
  },
  perCartonPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181414ff',
  },
  imageContainer: {
    position: 'relative', // Positioning for the discount and heart icon
  },
  discountContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff0000', // Red background for discount
    borderRadius: 9,
    padding: 5,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  heartIconContainer: {
    position: 'absolute',
    bottom: 230,
    right: 10,
    
  },
  iicon:{
    bottom:14,
    fontSize: 15,
    textAlign: 'right',
    color: '#000',
  },
  percartt:{
    flex:1,
    backgroundColor: "#906f6fff",
    borderRadius:5,
    paddingVertical:8,
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  percart:{
    top:-50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 10,
    width:230
  }
});
