<template>
  <div id="app">
    <todo-header></todo-header>
    <todo-input v-on:addTodoItem="addOneItem"></todo-input>
    <!--    공식 : v-on:하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트의 메서드 명"-->
    <!--    하위컴포넌트에서 올라와서 이벤트를 발생시키면 옆 메서드가 실행됨.-->
    <todo-list v-bind:propsdata="todoItems" v-on:removeItem="removeOneIte" v-on:toggleItem="toggleOneItem"></todo-list>
    <!--    프롭스 공식 : v-bind:내려보낼 프롭스 속성 이름 ="현재 위치의 컴포넌트 데이터 속성"
    보내려고 하는 곳에 props: 를 써주면 됨. 이건 list니까 list로 이동해보자 >-->
    <todo-footer v-on:clearAll="clearAllItems"></todo-footer>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import TodoFooter from './components/TodoFooter'

export default {
  data() {
    return {
      todoItems: []
    }
  },
  methods: {
    addOneItem(todoItems) {
      const obj = {completed: false, item: todoItems};
      localStorage.setItem(todoItems, JSON.stringify(obj));
      this.todoItems.push(obj);
      // push는 자바스크립트 api
    },
    removeOneIte(todoItems, index) {
      localStorage.removeItem(todoItems.item);
      this.todoItems.splice(index, 1);
      // 이렇게 가져오면 리스트에서는 리무브아이템이라는 이벤트를 발생시켜서 투두아이템,인덱스 두개의 인자값을 보내고
      // app.vue에서 리무브원아이템이 받아서 실행시킴.
    },
    toggleOneItem(todoItems, index) {
      console.log(todoItems, index);
      this.todoItems[index].completed = !this.todoItems[index].completed;
      // 이벤트버스를 넘기고 컴포넌트간의 경계를 좀 더 명확하게함.
      localStorage.removeItem(todoItems.item);
      // 삭제해주고 업데이트 해주는 api가 따로 없어서 삭제하고 추가하는 함수를 써줘야함
      localStorage.setItem(todoItems.item, JSON.stringify(todoItems));
    },
    clearAllItems() {
      localStorage.clear();
      // 초기화 
      this.todoItems = [];
    }
  },
  // 이렇게하면 App.vue에서 todoItems를 관리하게 된다.
  // created() {
  //   // 라이프사이클 훅임. 생성되는 시점에 이 안에 로직이 호출 됨.
  //   if (localStorage.length > 0) {
  //     for (let i = 0; i < localStorage.length; i++) {
  //       // 로컬스토리지에서는 전체 데이터 가져오는 api를 제공하지 않음. 그래서 for문으로 가져옴
  //       if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
  //         // 밸류에서 아이템으로 맞춰줘야 컴플리티드로 접근 가능 ( 선생님이 그렇게 설계함 )
  //         this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  //         // this.todoItems.push(localStorage.key(i));
  //         // 각각의 객체를 넣은 상황임.
  //         //   this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  //       }
  //     }
  //   }
  // },
  components: {
    // 컴포넌트 태그명 : 컴포넌트 내용
    'TodoHeader': TodoHeader,
    'TodoList': TodoList,
    'TodoInput': TodoInput,
    'TodoFooter': TodoFooter
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F6;
}

input {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

