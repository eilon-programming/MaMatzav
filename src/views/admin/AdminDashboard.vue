<script setup>
import { ref, onMounted } from 'vue';
import { useChatStore } from '../../stores/chat.store';

const chatStore = useChatStore();

// Mock list of threads for the left panel
const threads = ref([
  { id: 1, customer: 'John Doe', preview: 'I need help with my account.', unread: 2, timestamp: '10:42 AM', urgency: 'high' },
  { id: 2, customer: 'Jane Smith', preview: 'Thanks for the support!', unread: 0, timestamp: '09:15 AM', urgency: 'low' },
]);

const activeThread = ref(null);
const adminInput = ref('');

function selectThread(thread) {
  activeThread.value = thread;
  chatStore.loadHistory(thread.id);
}

function sendAdminMessage() {
  if (adminInput.value.trim()) {
    chatStore.sendMessage(adminInput.value);
    adminInput.value = '';
  }
}

onMounted(() => {
  // We can establish WSS connection for admin globally here or on layout
  chatStore.connect();
});
</script>

<template>
  <div class="dashboard-layout">
    <!-- Left Panel: Inbox Array -->
    <div class="inbox-panel">
      <div class="inbox-header">
        <h3>Active Threads</h3>
      </div>
      <div class="thread-list">
        <div 
          v-for="thread in threads" 
          :key="thread.id" 
          class="thread-item" 
          :class="{ active: activeThread?.id === thread.id }"
          @click="selectThread(thread)"
        >
          <div class="thread-meta">
            <span class="thread-customer">{{ thread.customer }}</span>
            <span class="thread-time">{{ thread.timestamp }}</span>
          </div>
          <div class="thread-preview">{{ thread.preview }}</div>
          <div class="thread-badges">
            <span v-if="thread.unread > 0" class="badge badge-unread">{{ thread.unread }}</span>
            <span v-if="thread.urgency === 'high'" class="badge badge-urgent">Urgent</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel: Active Workspace -->
    <div class="workspace-panel">
      <template v-if="activeThread">
        <div class="workspace-header">
          <h3>{{ activeThread.customer }}</h3>
        </div>
        <div class="chat-timeline">
          <div 
            v-for="msg in chatStore.messages" 
            :key="msg.id" 
            class="message-wrapper"
            :class="msg.sender === 'admin' ? 'message-self' : 'message-other'"
          >
            <div class="message-bubble">
              <span v-if="msg.assetUrl" class="message-asset">
                <a :href="msg.assetUrl" target="_blank">View File</a>
              </span>
              {{ msg.content }}
            </div>
            <div class="message-status">{{ msg.time }} &middot; {{ msg.status }}</div>
          </div>
        </div>
        <div class="workspace-input">
          <button class="btn-attach" title="Attach file">+</button>
          <input 
            type="text" 
            v-model="adminInput" 
            @keyup.enter="sendAdminMessage" 
            placeholder="Type a message to customer..." 
          />
          <button class="btn-send" @click="sendAdminMessage">Send</button>
        </div>
      </template>
      <template v-else>
        <div class="empty-state">
          <p>Select a thread from the inbox to start messaging.</p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100%;
  background-color: var(--surface-color);
}

.inbox-panel {
  width: 320px;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

.inbox-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.inbox-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.thread-list {
  flex-grow: 1;
  overflow-y: auto;
}

.thread-item {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.thread-item:hover {
  background-color: #f1f5f9;
}

.thread-item.active {
  background-color: #e0e7ff;
  border-left: 4px solid var(--primary-color);
}

.thread-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.thread-customer {
  font-weight: 600;
  color: var(--text-primary);
}

.thread-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.thread-preview {
  font-size: 0.85rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
}

.thread-badges {
  display: flex;
  gap: 6px;
}

.badge {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 12px;
  font-weight: 600;
}

.badge-unread {
  background-color: var(--primary-color);
  color: white;
}

.badge-urgent {
  background-color: var(--error-color);
  color: white;
}

.workspace-panel {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.workspace-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  background-color: white;
}

.workspace-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.chat-timeline {
  flex-grow: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f8fafc;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 60%;
}

.message-self {
  align-self: flex-end;
}

.message-other {
  align-self: flex-start;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.95rem;
  line-height: 1.4;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.message-self .message-bubble {
  background-color: var(--primary-color);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-other .message-bubble {
  background-color: white;
  color: var(--text-primary);
  border: 1px solid #e2e8f0;
  border-bottom-left-radius: 4px;
}

.message-asset a {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  padding: 6px 12px;
  border-radius: 6px;
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 6px;
}

.message-status {
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-top: 4px;
  text-align: right;
}

.workspace-input {
  padding: 16px 24px;
  background-color: white;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-attach {
  background: none;
  border: 1px solid #cbd5e1;
  color: #64748b;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-attach:hover {
  background-color: #f1f5f9;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.workspace-input input {
  flex-grow: 1;
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 24px;
  outline: none;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

.workspace-input input:focus {
  border-color: var(--primary-color);
}

.btn-send {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-send:hover {
  background-color: var(--secondary-color);
}

.empty-state {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}
</style>
