<template>
  <div :class="$options.className" />
</template>

<script>
export default {
  name: 'LoadingRequest',
  className: 'LoadingRequest',
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.LoadingRequest {
  $root: &;

  position: relative;
  font-size: 2px;
  text-indent: -9999em;
  margin: 0;
  border-top: 1em solid rgba(255, 255, 255, 0.2);
  border-right: 1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1em solid rgba(255, 255, 255, 0.2);
  border-left: 1em solid #fff;
  animation: spin 0.7s infinite linear;
  transform: translateZ(0);

  &,
  &::after {
    width: 10em;
    height: 10em;
    border-radius: 50%;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
