<script setup>
</script>

<template>
  <div class="app-layout">
    <!-- Thin Global Sidebar -->
    <aside class="global-sidebar">

      
      <nav class="sidebar-nav">
        <!-- Chat -->
        <router-link to="/chat" custom v-slot="{ navigate, isActive }">
          <button class="nav-btn" :class="{ active: isActive }" @click="navigate">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </button>
        </router-link>
        
        <!-- Settings -->
        <router-link to="/settings" custom v-slot="{ navigate, isActive }">
          <button class="nav-btn" :class="{ active: isActive }" @click="navigate">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
        </router-link>
      </nav>
      
      <div class="sidebar-bottom">
        <router-link to="/profile" custom v-slot="{ navigate, isActive }">
          <div class="user-avatar" :class="{ active: isActive }" @click="navigate">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=f4f7f6&color=2d3436" alt="User" />
          </div>
        </router-link>
      </div>
    </aside>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: var(--surface-color);
}

.global-sidebar {
  width: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  border-right: 1px solid var(--border-color);
  background-color: var(--surface-color);
  flex-shrink: 0;
}



.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-grow: 1;
}

.nav-btn {
  background: none;
  border: none;
  color: var(--icon-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  transition: all 0.2s;
  position: relative;
}

.nav-btn:hover {
  color: var(--icon-active);
  background-color: var(--background-color);
}

.nav-btn.active {
  color: var(--icon-active);
  background-color: #e8f7f4;
}

/* Green indicator line for active state */
.nav-btn.active::before {
  content: '';
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background-color: var(--primary-color);
  border-radius: 0 4px 4px 0;
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
}

.user-avatar.active {
  border-color: var(--primary-color);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--surface-color);
}
</style>
