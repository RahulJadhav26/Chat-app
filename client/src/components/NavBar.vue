<template>
  <div>
       <b-navbar class="header" sticky= true type="dark">
    <b-navbar-brand>
      <b-icon icon="chat-square-quote-fill" class="mr-2"></b-icon>
        Chat Box
    </b-navbar-brand>
     <b-navbar-nav  class="ml-auto">
        <b-nav-item disabled><b-icon icon="circle" class=" rounded-circle bg-success mb-1"  style="width: 10px; height: 10px;" variant="success"></b-icon></b-nav-item>
        <b-nav-item disabled>{{chatid}}</b-nav-item>
        <b-nav-item>
            <b-button @click='close()' type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </b-button>
        </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
  </div>
</template>

<script>
export default {
  props: ['chatid'],
  methods: {
    close () {
      window.history.back()
    }
  }
}
</script>

<style>
.header{
    background-color: #404040 !important ;
}
</style>
