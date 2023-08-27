<script setup lang="ts">
import socketIo from "socket.io-client";
import { reactive, ref, toRefs } from "vue";
import { generateUuid } from "../../utils/index.ts";

const client = socketIo("http://localhost:80");

const state = reactive({
  messageList: [],
});

const inputMsg = ref("");

client.on("message", (res: string) => {
  console.log("res", res);
  const resJson = res;
  state.messageList.push({ id: resJson.id, msg: resJson.msg });
});

if (!window.localStorage.getItem("uuid")) {
  const uuid = generateUuid(1);
  window.localStorage.setItem("uuid", uuid);
}

const currUUID = window.localStorage.getItem("uuid");

const clickToSend = () => {
  state.messageList.push({ id: currUUID, msg: inputMsg.value });
  client.emit("message", {
    id: currUUID,
    msg: inputMsg.value,
  });
};

const { messageList } = toRefs(state);
</script>

<template>
  <div class="chat-div">
    <p
      class="message"
      v-for="(item, idx) in messageList"
      :class="{ 'is-me': currUUID === item.id }"
    >
      {{ item.id + ": " + item.msg }}
    </p>
  </div>
  <div class="bottom-input-container">
    <van-field
      :style="{ flex: 1 }"
      v-model="inputMsg"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入留言"
    />
    <van-button type="primary" @click="clickToSend">Send</van-button>
  </div>
</template>

<style scoped>
.bottom-input-container {
  position: fixed;
  bottom: 0;
  padding: 0.5rem;
  width: calc(100% - 1rem);
  display: flex;
  justify-content: center;
  align-items: center;
}
.message {
  text-align: left;
}
.is-me {
  text-align: right;
}
</style>
