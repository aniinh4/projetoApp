//Está importando o UseState, View, TxtInput, BUtton e Text
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";

const App = () => {
  //A const (cep)
  const [cep, setCep] = useState("");
  //A const (endereço)
  const [address, setAddress] = useState(null);
  //Uma função assincrona, vai pegar o cep e o retornar o endereço de acordo com a API
  const fetchAddress = async () => {
    try {
      //Vai pausar a função e esperar a resposta do API
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
      //Catch, vai retornar o erro caso não encontre o endereço
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress(null);
    }
  };
  {
    /* //Está estilizando nossa página (centralizando-a) */
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {" "}
      {/*  //TextImput, imput onde pode se escrever o CEP desejado  */}
      <TextInput
        //styles do input
        style={styles.TextInput}
        //Texto dentro do input
        placeholder="Digite o CEP"
        //Está convertendo o valor CEP em um valor primitivo
        value={cep}
        //Detecta mudanças de textos escritas pelos usúarios para mudar a const (cep)
        onChangeText={setCep}
        //Tipo do teclado
        keyboardType="numeric"
      />
      <Button title="Buscar Endereço" onPress={fetchAddress} />
      {address && (
        <View>
          {/* //Está puxando o Endereço do CEP escolhido (cep) */}
          <Text>CEP: {address.cep}</Text>
          {/*  //Está puxando o Endereço da rua (logradouro) */}
          <Text>Rua: {address.logradouro}</Text>
          {/* //Está puxando o Endereço do Bairro (bairro) */}
          <Text>Bairro: {address.bairro}</Text>
          {/*  //Está puxando o Endereço da Cidade (localidade) */}
          <Text>Cidade: {address.localidade}</Text>
          {/*  //Está puxando o Endereço do Estado (uf) */}
          <Text>Estado: {address.uf}</Text>
        </View>
      )}
    </View>
  );
};
//Elemento para estilizar o App
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //Está estilizando o TextImput
  TextInput: {
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 25,
    width: 300,
    height: 50,
    backgroundColor: "white",
  },
});

export default App;
