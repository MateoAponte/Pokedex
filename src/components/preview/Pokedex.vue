<template>
  <div class="preview-content">
    <slot name="filter" />
    <slot name="noContent" />
    <slot name="information" />
  </div>
  <slot name="preview" />
  <slot name="controllers" />
</template>

<script lang="ts" setup></script>
