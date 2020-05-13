<template>
  <div class="home">
    <Credentials/>
  </div>
</template>

<script>
// @ is an alias to /src
import Credentials from '@/components/Credentials.vue'

export default {
  name: 'Home',
  components: {
    Credentials
  }
}
</script>
