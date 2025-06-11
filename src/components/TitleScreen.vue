<template>
  <div class="title-screen">
    <h1>タイピングゲーム</h1>
    <button @click="$emit('start')">スタート</button>
  </div>
</template>

<style scoped>
.title-screen {
  text-align: center;
  margin-top: 100px;
}
button {
  font-size: 2em;
  padding: 0.5em 2em;
}
</style>
