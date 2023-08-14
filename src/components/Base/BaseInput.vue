<template>
  <v-text-field v-bind="$attrs" v-on="$listeners" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseInput extends Vue {

}
</script>

<style scoped>

</style>
