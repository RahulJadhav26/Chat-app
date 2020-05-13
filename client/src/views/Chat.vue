<template>
  <div class="Chat">
    <appChatBox  :name= 'name' :chatid = 'chatid'></appChatBox>
    <!-- <p>Login user:{{name}}</p>
    <p>Chat Id:{{chatid}}</p>
     <div>
        <b-form-input @change="sendMessage()" v-model="setMessage" placeholder="Enter message"></b-form-input>
        <div v-bind ="message" class="mt-2">Value: {{message}}</div>
  </div> -->
  </div>
</template>
<script>
import ChatBox from '../components/ChatBox'
export default {
  data () {
    return {
      name: this.$route.query.name,
      chatid: this.$route.query.chatid,
      message: ''
    }
  },
  created () {
    this.$socket.emit('join', { name: this.name, chatid: this.chatid }, (error) => {
      console.log('Recreated', error)
    })
  },
  components: {
    appChatBox: ChatBox
  },
  sockets: {
    message (message) {
      console.log('message received')
      this.message = message
    }
  }
}
</script>
