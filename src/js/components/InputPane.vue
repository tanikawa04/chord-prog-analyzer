<template>
  <div>
    <md-input-container>
      <label>Input chords</label>
      <md-textarea v-model="text"></md-textarea>
    </md-input-container>
    <md-button class="md-raised md-primary"
               @click="analyze()">Analyze</md-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'CM7 G7 E7 AM7'
    };
  },
  methods: {
    analyze() {
      this.$store.dispatch('parseChords', {
        text: this.text
      });
    }
  }
};
</script>

<style scoped>

</style>
