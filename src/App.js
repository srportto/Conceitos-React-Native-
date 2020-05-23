import React,{useEffect, useState} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect (() => {
    api.get('repositories').then(response => {
      console.log(response.data);
      setRepositories(response.data);
    });
  },[]); // A função useEffect() irá dispárar quando as variaveis do array [] mudarem, como nao há nenhuma variavel dentro ele executará uma unica vez



  

  async function handleLikeRepository(id) {

    let response = await api.post(`repositories/${id}/like`);
    //let repository = response.data;

    //console.log(response.status);;

    if(response.status === 200){
           
      // // captura a posição de um vetor 
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);

      // if ( repositoryIndex < 0){
      //   return response.status(404).json({error: 'Repository not found.'});
    
      // }

      const repositoriesAtual = repositories;

      repositoriesAtual[repositoryIndex] = response.data;
                  
       setRepositories([...repositoriesAtual]);
    }

  }

  function exibirLikes (qtdeLikes){
    if (qtdeLikes === 1){
      return `${qtdeLikes} curtida`;
    } else {
      return `${qtdeLikes} curtidas`;
    }
  }




  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          

          renderItem={({item: repository}) => (
            <>
              <View key={repository.title} style={styles.repositoryContainer}>
                <Text style={styles.repository} > {repository.title}</Text>

                <FlatList 
                  data={repository.techs}
                  keyExtractor={repository => repository.id}
                  style={styles.techsContainer}
                  
                  renderItem={({item: tech}) => (
                    <Text style={styles.tech} >{tech} </Text>
                  )}                       
                />



                {/* container para exibicao da quantidade de likes  */}
                <View style={styles.likesContainer} >
                  <Text
                   
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {`${exibirLikes(repository.likes)}`}
                  </Text>
                </View>


                {/* botao para acao de dar like  */}
                <TouchableOpacity
                  
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>

              </View>
            </> 
          )}         
        />



       




















      {/* >>>>>> Abaixo codigo antes da alteração idem modelo da rocketseat */}

{/*       
          <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>Repository 1</Text>

          <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              ReactJS
            </Text>
            <Text style={styles.tech}>
              Node.js
            </Text>
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
              3 curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View> 
        
        */}
        
     

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
