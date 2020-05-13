<template>
  <div class="Credentials">
    <section>
      <p v-if="isConnected">We're connected to the server!</p>
      <p>Message from server:{{message}} </p>
      <button class='mb-5 ' @click="pingServer()">Ping Server</button>
    </section>

    <b-card-group class = "Credentials"  deck>
     <b-card  border-variant="success" header="JOIN" align="center">
        <b-card-text>
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
              label="Your Name:"
            >
              <b-form-input
                v-model="name"
                required
                placeholder="Enter your name"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Chat Room Id:">
              <b-form-input
                v-model="chatid"
                required
                placeholder="Enter Id"
              ></b-form-input>
            </b-form-group>
            <router-link  :to="{name:'Chat', query:{name:this.name, chatid:this.chatid}}"> <b-button class="mr-2" @click="onSubmit()" variant="success" >Submit</b-button></router-link>
             <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
      </b-card-text>
    </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'Credentials',
  methods: {
    onSubmit () {
      this.$socket.emit('join', { name: this.name, chatid: this.chatid }, (error) => {
        alert(error)
        window.history.back()
      })
    },
    onReset (evt) {
      evt.preventDefault()
      // setting to null
      this.name = ''
      this.chatid = ''
    }
  },
  sockets: {
    connect () {
      this.isConnected = true
    },
    disconnect () {
      this.isConnected = false
    },
    message (message) {
      this.message = message.text
    }
  },
  data () {
    return {
      name: '',
      chatid: '',
      isConnected: false,
      message: ''
    }
  }
}
</script>

<style scoped>
.Credentials{
  width:50%;
  margin: 0 auto;
}
</style>
