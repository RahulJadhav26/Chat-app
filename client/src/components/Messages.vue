<template>
  <div>
<!-- 1 {{message}} <br>
2 {{messages}} <br>
3 {{userMessage}} <br>
4 {{name}} <br>
5 {{userMessages}} <br> -->
<!-- 6 {{allMessages}} <br> -->
    <div  v-for ="msg in allMessages" :key="msg.user" class='MessageContainer'>
        <b-row  >
            <b-col>
                <div v-if ="isUser(msg)"  class="userMsgContainer">
                    {{msg.user}}
                    <b-alert  show variant="success">{{msg.text}}</b-alert>
                </div>
                 <div  v-else   class="otherMsgContainer">
                    {{msg.user}}
                    <b-alert  show variant="dark">{{msg.text}}</b-alert>
                </div>
            </b-col>
        </b-row >
    </div>
  </div>
</template>

<script>

export default {
  props: ['allMessages', 'messages', 'message', 'userMessage', 'userMessages', 'name'],
  sockets: {
    message (message) {
      console.log('message recieved')
      this.message = message
      this.messages.push(message)
      this.allMessages.push(message)
    }
  },
  methods: {
    isUser (msg) {
      console.log('isUsers')
      var user = false
      if (msg.user.trim().toLowerCase() === this.name.trim().toLowerCase()) {
        user = true
      }
      console.log(user)
      return user
    }
  }
}
</script>

<style scoped >
.userMsgContainer{
    float: right;
    max-width:80%;
}
.otherMsgContainer{
    float: left;
    max-width:80%;
}
</style>
