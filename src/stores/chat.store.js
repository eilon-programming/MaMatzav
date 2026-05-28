import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ChatService } from '../core/services/chat.service';
import { useAuthStore } from './auth.store';

export const useChatStore = defineStore('chat', () => {
  // ViewModel State
  const messages = ref([]);
  const isConnecting = ref(false);
  const activeThreadId = ref(null);
  
  // ViewModel Actions
  function connect() {
    const authStore = useAuthStore();
    if (!authStore.token) return;

    isConnecting.value = true;
    
    // Pass callback for incoming messages
    ChatService.initializeConnection(authStore.token, (newMsg) => {
      messages.value.push(newMsg);
      isConnecting.value = false; // Once first msg or connection established
    });
  }

  async function loadHistory(threadId) {
    activeThreadId.value = threadId;
    const history = await ChatService.getHistory(threadId);
    messages.value = history;
  }

  async function sendMessage(text) {
    const authStore = useAuthStore();
    try {
      // Optimistic update could go here
      const resultMsg = await ChatService.sendTextMessage(text, authStore.user?.role || 'client');
      messages.value.push(resultMsg);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  async function sendFile(file) {
    const authStore = useAuthStore();
    try {
      const resultMsg = await ChatService.sendFileMessage(file, authStore.user?.role || 'client');
      messages.value.push(resultMsg);
    } catch (error) {
      console.error('Failed to send file:', error);
    }
  }

  return {
    messages,
    isConnecting,
    activeThreadId,
    connect,
    loadHistory,
    sendMessage,
    sendFile
  };
});
