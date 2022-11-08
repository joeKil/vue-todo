<template>
  <div>
    <!--    리스트-->
    <TransitionGroup tag="ul" name="fade" class="container">
      <!--    브이포에 인덱스 번호가 내장되어있음 -->
<!--      기존 코드 in propsdata-->
      <li v-for="(todoItems, index) in this.$store.state.todoItems" v-bind:key="todoItems.item" class="shadow">
        <!--      동적으로 클래스를 추가하던지 빼던지
        toggleComplete에서 인자를 동일하게 줘야한다. 얘도 무슨 값인지 알아야한다.. toggleComplete가 todoItems, index값을 넘긴다.-->
        <font-awesome-icon icon="fa-solid fa-burger" v-bind:class="{checkBtnCompleted: todoItems.completed}"
                           v-on:click="toggleComplete(todoItems, index)"/>
        <!--      todoitem.completed속성에 따라서 textcompleted가 달리짐-->
        <span v-bind:class="{textCompleted: todoItems.completed}">{{ todoItems.item }}</span>
        <font-awesome-icon icon="fa-solid fa-trash" class="removeBtn" v-on:click="removeTodo(todoItems, index)">
          삭제
        </font-awesome-icon>
        <!--      <button v-on:click="removeTodo">delete</button>-->
      </li>
    </TransitionGroup>
  </div>
</template>

<!--리팩토링 전에는 todoitems안에 고유의 배열이 있었고 app.vue에 영향을 미칠 수 없었다-->

<script>
export default {
  name: "TodoList",
  props: ['propsdata'],
  methods: {
    // 리스트 삭제 기능
    removeTodo(todoItems, index) {
      this.$emit('removeItem', todoItems, index);
      console.log(todoItems, index);
      // 이건 로컬스토리지안에 데이터만 지워주는 코드임. 화면은 다른 영역이다.
      // localStorage.removeItem(todoItems);
      // removeItem 이 api를 사용하면 지울 수 있음.
      // this.todoItems.splice(index, 1);
      // 스플라이스를 쓰면 해당 아이템을 지우게됨.
      // slice는 기존 배열을 변경하지 않고 새로운 걸 반환해줌.
    },
    toggleComplete(todoItems, index) {
      // 업데이트하는게 없기 때문에 해당 아이템을 지우고 동일하게 세팅하면서 바뀐 거를 스트링파이. 저장하는 것.
      // 로컬스토리지 데이터 갱신
      // console.log(todoItems, index);
      // todoItems.completed = !todoItems.completed;
      // localStorage.removeItem(todoItems.item);
      // 삭제해주고 업데이트 해주는 api가 따로 없어서 삭제하고 추가하는 함수를 써줘야함
      // localStorage.setItem(todoItems.item, JSON.stringify(todoItems));
      this.$emit('toggleItem', todoItems, index);

    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}

li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}

.checkBtnCompleted {
  color: #b3adad;
}

.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

.removeBtn {
  margin-left: auto;
  color: #de4343;
}

/* 트렌지션 */
.container {
  position: relative;
  padding: 0;
}

.item {
  width: 100%;
  height: 30px;
  background-color: #f3f3f3;
  border: 1px solid #666;
  box-sizing: border-box;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>