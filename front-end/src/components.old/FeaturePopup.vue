<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
  featureName: String,
  filterList: Array as PropType<string[]>,
})

</script>
<template>
  <div class="w-screen h-screen bg-black bg-op-80"></div>
</template>
