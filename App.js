import React, { useState } from 'react';
import { Alert, FlatList, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import AddTodo from './components/addTodo';
import Header from './components/header';
import TodoItem from './components/todoItem';

export default function App() {
  const [todos, setTodos] = useState([
    {text:'ngoding', key: '1'},
    {text:'nonton anime', key: '2'},
    {text:'belajar', key: '3'},
  ]);

  const removeHandler = key => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key)
    })
  }

  const submitHandler = text => {
    if(text.length > 3){
      setTodos(prevTodos => {
        return [
          {text: text, key: Math.random().toString()},
          ...prevTodos  
        ]
      })
    }else{
      Alert.alert('WADUHH BRO!', 'Panjang todo harus lebih dari 3 karakter', [
        {text:'Mengerti', onPress: () => console.log('alert ditutup!') }
      ])
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header/>
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({item}) => {
                return(
                  <TodoItem item={item} removeHandler={removeHandler} />
                )
              }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#fff'
  },
  content: {
    padding: 40
  },
  list: {
    marginTop: 20
  }
})