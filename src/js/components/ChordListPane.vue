<template>
  <div class="pane">
    <table class="chord-prog-table">
      <thead>
        <td class="chord-colomn">Chord</td>
        <td v-for="(mKey, i) in mKeys" class="key-column" :key="i">
          {{ mKey[0] }} | {{ mKey[1] }}
        </td>
      </thead>
      <tr v-for="(c, i) in chordList" :key="i">
        <td>{{ c.raw }}</td>
        <td v-for="(chordIndex, i) in c.chordIndexes" :key="i">
          <span v-if="chordIndex.major"
            class="location-major"
          >{{ chordIndex.major }}</span><!--
       --><span v-else
            class="location-null"></span><!--
       --><span v-if="chordIndex.minor"
            class="location-minor"
          >{{ chordIndex.minor }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { estimateKey } from '../utils';

export default {
  data() {
    return {
      mKeys: [
        ['C', 'Am'],
        ['Db', 'Bbm'],
        ['D', 'Bm'],
        ['Eb', 'Cm'],
        ['E', 'C#m'],
        ['F', 'Dm'],
        ['Gb', 'Ebm'],
        ['G', 'Em'],
        ['Ab', 'Fm'],
        ['A', 'F#m'],
        ['Bb', 'Gm'],
        ['B', 'G#m'],
      ]
    }
  },
  computed: {
    chords() {
      return this.$store.state.chords;
    },
    chordList() {
      return this.chords.map(chord => {
        const c = chord.parsed.toObj();
        const location = estimateKey(c);

        const chordIndexes = [...Array(12).keys()].map(i => {
          const majorLoc = location.major.find(l => l[0] === i);
          const major = majorLoc ? majorLoc[1] : null;

          const harMinLoc = location.harmonicMinor.find(l => l[0] === i);
          const melMinLoc = location.melodicMinor.find(l => l[0] === i);
          const natMinLoc = location.naturalMinor.find(l => l[0] === i);
          let minor = harMinLoc ? `${harMinLoc[1]}H` : '';
          minor = melMinLoc ? `${minor} ${melMinLoc[1]}M`.trim() : minor;
          minor = natMinLoc ? natMinLoc[1] : minor;
          return {
            major,
            minor
          };
        });

        return {
          raw: chord.raw,
          chordIndexes
        };
      });
    }
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.pane {
  padding-top: 30px;
}

.chord-prog-table {
  border-collapse: collapse;

  thead {
    font-weight: bold;
    border-bottom: 1px #ddd solid;
  }

  tr {
    border-bottom: 1px #ddd dotted;
  }

  .chord-colomn {
    min-width: 100px;
    text-align: center;
  }

  .key-column {
    width: 100px;
    text-align: center;
  }

  %location {
    display: inline-block;
    width: 46px;
    text-align: center;
  }

  .location-major {
    @extend %location;
    background: #ffcdd2;
  }

  .location-minor {
    @extend %location;
    background: #bbdefb;
    text-align: center;
  }

  .location-null {
    @extend %location;
  }
}
</style>
