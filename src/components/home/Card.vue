<template>
  <div class="title">
    <slot>
      <span>爆款推荐</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped>
.title {
  width: 100%;
  text-align: center;
  font-size: 16px;
  padding: 10px 0;
}
.title span {
  position: relative;
  font-weight: bold;
}
.title span::after {
  content: '';
  width: 8px;
  height: 8px;
  display: block;
  position: absolute;
  top: 50%;
  right: -0.5rem;
  margin-top: -4px;
  border-radius: 50%;
  background-color: #d4c0a7;
}
.title span::before {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  display: block;
  top: 50%;
  left: -0.5rem;
  margin-top: -4px;
  border-radius: 50%;
  background-color: #d4c0a7;
}
</style>
