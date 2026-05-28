<script setup>
</script>

<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #00b894; /* Mint green */
  --primary-hover: #00a884;
  --secondary-color: #d8d4ec; /* Soft purple for bubbles */
  --background-color: #f4f7f6; /* Main light gray-blue background */
  --surface-color: #ffffff;
  --text-primary: #2d3436;
  --text-secondary: #636e72;
  --text-tertiary: #b2bec3;
  --border-color: #f1f2f6;
  --icon-color: #b2bec3;
  --icon-active: #00b894;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--surface-color);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden; /* App should be full height without scroll */
}

#app {
  height: 100vh;
  width: 100vw;
  display: flex;
}

* {
  box-sizing: border-box;
}

/* Custom Scrollbar for modern feel */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

button {
  font-family: inherit;
}
input {
  font-family: inherit;
}
</style>
