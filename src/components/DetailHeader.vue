<template>
  <div class="header">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 2.4444rem;
  line-height: 2.4444rem;
  text-align: center;
  z-index: 99;
  background-color: white;
}
</style>
