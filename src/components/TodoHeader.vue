<template>
  <header>
    <h1>TODO IT!</h1>
<!--    <h1>{{ this.$store.state.headerText }}</h1>-->
  </header>
</template>

<script>
export default {
  name: "TodoHeader"
}
</script>

<!--scope해당 컴포넌트 안에서만 존재하는 유일한 스타일 속성
원래 css라는게 상위의 html 태그 요소에 스타일을 아래로 상속 받게 되는데 scope로하면 무시가되고 이 컴포넌트 안에서만 유일해짐-->
<style scoped>
h1 {
  color: #2F3B52;
  font-weight: 900;
  /*rem은 폰트의 크기에 따라서 배율이 정해짐*/
  margin: 2.5rem 0 1.5rem;
}
</style>