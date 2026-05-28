import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // Simplified state to mock users without actual authentication
  const user = ref({ id: 1, role: 'client' }); // default to client role for chat views
  const token = ref('mock-token-123');
  
  // Method to manually switch roles if needed for testing
  function setRole(role) {
    user.value = { ...user.value, role };
  }

  return {
    user,
    token,
    setRole
  };
});
