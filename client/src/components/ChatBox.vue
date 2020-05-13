<template>
  <div class="container">
      <b-card class="ChatContainer">
          <b-card-header class="header">
              <appNavBar :chatid = 'chatid'></appNavBar>
          </b-card-header>
          <b-card-body class="messageContent">
    <!-- bind your configurations -->
                <vuescroll :ops="ops">
                  <div class="child-element">

                  <appMessages :allMessages = 'allMessages' :messages= 'messages' :userMessages= 'userMessages' :name= 'name' :userMessage= 'userMessage' :message= 'message' ></appMessages>
                  </div>
                </vuescroll>
          </b-card-body>
          <b-card-footer>
              <b-row>
                  <b-col md="10">
                      <b-form-input  @change="sendMessage()" v-model="setMessage" placeholder="Enter message"></b-form-input>
                  </b-col>
                  <b-col md="2">
                       <b-button>Send</b-button>
                  </b-col>
              </b-row>
          </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Messages from '../components/Messages'
import vuescroll from 'vuescroll'
export default {
  data () {
    return {
      message: '',
      setMessage: '',
      userMessage: '',
      userMessages: [],
      messages: [],
      allMessages: [],
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true
        },
        scrollPanel: {
          initialScrollY: 10,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: 'right'
        },
        rail: {
          background: '#01a99a',
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: true
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: '#c1c1c1',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: 0,
          size: '6px',
          disable: false
        }
      }
    }
  },
  components: {
    appNavBar: NavBar,
    appMessages: Messages,
    vuescroll
  },
  props: ['chatid', 'name'],
  methods: {
    sendMessage () {
      if (this.setMessage) {
        this.$socket.emit('sendMessage', this.setMessage, () => {
          this.userMessages.push(this.setMessage)
          this.setMessage = ''
          return this.setMessage
        })
        console.log(this.message)
      }
    }
  },
  sockets: {
    message (message) {
      console.log('message recieved')
      this.message = message
    },
    userMessage (message) {
      console.log('userMessage Received')
      this.userMessage = message
      this.allMessages.push(message)
    }
  }

}
</script>

<style scoped>
.ChatContainer{
    width:65%;
    margin:50px auto;
}
.messageContent{
    height:400px;
}
</style>
