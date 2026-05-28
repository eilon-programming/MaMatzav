<script setup>
</script>

<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="brand">Admin Portal</div>
      <nav class="nav-links">
        <router-link to="/admin/dashboard" class="nav-link" active-class="active">Dashboard</router-link>
      </nav>
      <div class="spacer"></div>
    </aside>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background-color: var(--background-color);
}

.sidebar {
  width: 260px;
  background-color: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.05);
}

.brand {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  padding: 0 16px;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-link {
  color: #cbd5e1;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.nav-link:hover, .nav-link.active {
  background-color: #334155;
  color: white;
}

.spacer {
  flex-grow: 1;
}

.main-content {
  flex-grow: 1;
  overflow: hidden;
}
</style>
