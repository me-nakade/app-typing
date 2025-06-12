<template>
  <div class="title-screen">
    <h1>タイピングゲーム</h1>
    <ul class="instructions">
      <li>表示される文字列と同じように入力しましょう(制限時間あり！)</li>
      <li>「。」や「.」は不要です</li>
      <li>入力し終えたら、力強くエンターキーを押しましょう</li>
    </ul>
    <br />
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
  margin: 1em;
}

.instructions {
  display: inline-block;
  padding: 0;
  list-style-position: inside;
}

.instructions li {
  text-align: left;
}
</style>
