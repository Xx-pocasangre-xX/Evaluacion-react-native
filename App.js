import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
  Pressable,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // Estados para los diferentes componentes
  const [inputText, setInputText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Opción 1');
  
  // Opciones para el selector
  const options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];

  // Función para incrementar contador
  const incrementCounter = () => {
    setCounterValue(prev => prev + 1);
  };

  // Función para decrementar contador
  const decrementCounter = () => {
    setCounterValue(prev => prev - 1);
  };
  // Datos para FlatList
  const [listData] = useState([
    { id: '1', title: 'Elemento 1', description: 'Primera descripción' },
    { id: '2', title: 'Elemento 2', description: 'Segunda descripción' },
    { id: '3', title: 'Elemento 3', description: 'Tercera descripción' },
    { id: '4', title: 'Elemento 4', description: 'Cuarta descripción' },
  ]);

  // Función para mostrar Alert
  const showAlert = () => {
    Alert.alert(
      'Título del Alert',
      'Este es un mensaje de ejemplo usando el componente Alert nativo',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Aceptar', onPress: () => console.log('Aceptar presionado') }
      ]
    );
  };

  // Función para simular carga
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Completado', 'La carga ha terminado');
    }, 3000);
  };

  // Renderizar item de FlatList
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listTitle}>{item.title}</Text>
      <Text style={styles.listDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* ScrollView - Permite desplazamiento vertical */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Título principal */}
        <Text style={styles.mainTitle}>Evaluacion React Native</Text>
        
        {/* Image - Muestra una imagen local */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.componentDescription}>
            <Text style={styles.bold}>Image:</Text> Muestra imágenes desde URLs o archivos locales
          </Text>
        </View>

        {/* TextInput - Campo de entrada de texto */}
        <View style={styles.componentContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Escribe algo aquí..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <Text style={styles.componentDescription}>
            <Text style={styles.bold}>TextInput:</Text> Campo de entrada de texto con soporte multilinea
          </Text>
          {inputText ? <Text style={styles.inputValue}>Texto: {inputText}</Text> : null}
        </View>

        {/* Button - Botón básico */}
        <View style={styles.componentContainer}>
          <Button
            title="Mostrar Alert"
            onPress={showAlert}
            color="#2196F3"
          />
          <Text style={styles.componentDescription}>
            <Text style={styles.bold}>Button:</Text> Botón nativo que muestra un Alert al presionarlo
          </Text>
        </View>

        {/* Pressable - Botón con mejor control de estados */}
        <View style={styles.componentContainer}>
          <Pressable 
            style={({ pressed }) => [
              styles.pressableButton,
              pressed && styles.pressableButtonPressed
            ]}
            onPress={() => Alert.alert('Pressable', 'Botón Pressable presionado')}
          >
            <Text style={styles.pressableButtonText}>Botón Pressable</Text>
          </Pressable>
          <Text style={styles.componentDescription}>
            <Text style={styles.bold}>Pressable:</Text> Botón avanzado con control detallado de estados de presión
          </Text>
        </View>

        {/* Contador con TouchableOpacity */}
        <View style={styles.componentContainer}>
          <Text style={styles.sectionTitle}>Contador: {counterValue}</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity 
              style={styles.counterButton}
              onPress={decrementCounter}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            
            <View style={styles.counterDisplay}>
              <Text style={styles.counterValue}>{counterValue}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.counterButton}
              onPress={incrementCounter}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.componentDescription}>
            <Text style={styles.bold}>TouchableOpacity:</Text> Botones personalizables con feedback visual
          </Text>
        </View>

        {/* Switch - Interruptor */}
        <View style={styles.componentContainer}>
          <View style={styles.switchContainer}>
            <Text>Activar función: </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={setIsEnabled}
              value={isEnabled}
            />
          </View>
          <Text style={styles.componentDescription}>
            <Text style={styles.bold}>Switch:</Text> Interruptor para activar/desactivar funciones
          </Text>
          <Text style={styles.statusText}>Estado: {isEnabled ? 'Activado' : 'Desactivado'}</Text>
        </View>

        {/* Selector personalizado con TouchableOpacity */}
        <View style={styles.componentContainer}>
          <Text style={styles.sectionTitle}>Selector de Opciones</Text>
          <View style={styles.selectorContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.optionButtonSelected
                ]}
                onPress={() => setSelectedOption(option)}
              >
                <Text style={[
                  styles.optionText,
                  selectedOption === option && styles.optionTextSelected
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.componentDescription}>
            <Text style={styles.bold}>Selector personalizado:</Text> Múltiples TouchableOpacity para crear un selector
          </Text>
          <Text style={styles.selectedValue}>Seleccionado: {selectedOption}</Text>
        </View>

        {/* FlatList - Lista eficiente */}
        <View style={styles.componentContainer}>
          <Text style={styles.sectionTitle}>Lista de Elementos</Text>
          <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.flatList}
            scrollEnabled={false}
          />
          <Text style={styles.componentDescription}>
            <Text style={styles.bold}>FlatList:</Text> Lista eficiente para mostrar datos estructurados
          </Text>
        </View>

        {/* ActivityIndicator - Indicador de carga */}
        <View style={styles.componentContainer}>
          <TouchableOpacity 
            style={styles.loadingButton}
            onPress={simulateLoading}
          >
            <Text style={styles.loadingButtonText}>Simular Carga</Text>
          </TouchableOpacity>
          
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2196F3" />
              <Text style={styles.loadingText}>Cargando...</Text>
            </View>
          )}
          
          <Text style={styles.componentDescription}>
            <Text style={styles.bold}>ActivityIndicator:</Text> Indicador de carga que muestra progreso
          </Text>
        </View>

        {/* Botón para abrir Modal */}
        <View style={styles.componentContainer}>
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.modalButtonText}>Abrir Modal</Text>
          </TouchableOpacity>
          <Text style={styles.componentDescription}>
            <Text style={styles.bold}>Modal:</Text> Ventana emergente que se superpone a la pantalla
          </Text>
        </View>
        {/* Espaciado final */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Modal - Ventana emergente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modal Ejemplo</Text>
            <Text style={styles.modalText}>
              Este es un Modal que se superpone a la pantalla principal. 
              Puedes usar modals para mostrar información importante o formularios.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  componentContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    minHeight: 40,
    fontSize: 16,
  },
  componentDescription: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  inputValue: {
    marginTop: 5,
    fontSize: 14,
    color: '#2196F3',
  },
  touchableButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  touchableButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressableButton: {
    backgroundColor: '#9C27B0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  pressableButtonPressed: {
    backgroundColor: '#7B1FA2',
    transform: [{ scale: 0.95 }],
  },
  pressableButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  counterButton: {
    backgroundColor: '#2196F3',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterDisplay: {
    marginHorizontal: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  counterValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusText: {
    marginTop: 5,
    fontSize: 14,
    color: '#2196F3',
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
    minWidth: '45%',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#2196F3',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedValue: {
    marginTop: 10,
    fontSize: 14,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  flatList: {
    maxHeight: 200,
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  listDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  loadingButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loadingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  modalButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});