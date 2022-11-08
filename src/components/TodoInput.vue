<template>
  <div class="inputBox">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
    <!--    <button v-on:click="addTodo">add</button>-->
    <font-awesome-icon icon="fa-solid fa-square-plus" class="addContainer" v-on:click="addTodo">
    </font-awesome-icon>
  </div>
</template>

<script>

export default {
  name: "TodoInput",
  data() {
    return {
      newTodoItem: '',
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== '') {
        this.$emit('addTodoItem', this.newTodoItem);
        //this.$emit('이벤트이름', 인자)
        this.clearInput();
      }
      // 구분하지 않고 넘어가면 안됨
      // 기존에 텍스트 값만 두개 넣었는데 텍스트 + 텍스트가 선택 됐는지 불린 값
      //  var obj = {completed: false, item: this.newTodoItem}
      // json.stringify값을 쓰면 텍스트로 값이 넘어가게되는데. 그냥 obj로만 쓰면 value값이 확인이 안된다.
      // 값이 어떻게 변화하는지 추적하기 위해서 json.stringify값을 쓴다.
      // console.log(this.newTodoItem, JSON.stringify(obj));
      // 저장하는 로직
      // setItem이라는 API가 있음.
      // localStorage.setItem(this.newTodoItem, this.newTodoItem);
      // 디스 보통 스코프를 지칭 하는데. this를 거슬러 올라가면 똑같은 인스턴스를 가르킴.
      // this.clearInput();

      // 기존에 있던 값들 app.vue로 보내줌. 그러면 newTodoItem만 App.vue(상위컴포넌트)로 보내주면됨.
    },
    clearInput() {
      // input박스 비우기
      this.newTodoItem = '';
    }
  },
}
</script>

<style scoped>
input:focus {
  outline: none;
}

.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}

.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}

.addContainer {
  float: right;
  background: -moz-linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}

.addBtn {
  color: white;
  vertical-align: middle;
}
</style>