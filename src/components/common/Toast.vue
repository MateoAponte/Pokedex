<template></template>

<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { PokeNotification } from '@/interfaces/components/PokeNotification';
import { watch } from 'vue';

const props = defineProps<PokeNotification>();

watch(
  () => props.show,
  () => {
    if (props.show) {
      toast.info(props.message, {
        autoClose: props.time,
        position: 'bottom-center',
      });
    }
  }
);
</script>
