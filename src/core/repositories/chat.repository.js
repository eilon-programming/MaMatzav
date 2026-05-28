// Data/Infrastructure Layer for Chat
// Directly manages client interfaces (Axios, WSS) to execute remote I/O data mutations, fetch payloads.

export class ChatRepository {
  constructor() {
    this.ws = null;
    this.messageCallbacks = [];
  }

  connectWss(token) {
    // Mock WebSocket Connection
    // In a real app: this.ws = new WebSocket(`wss://api.example.com/chat?token=${token}`);
    
    console.log('ChatRepository: Connecting to WSS with token', token);
    
    // Simulate connection success
    setTimeout(() => {
      console.log('ChatRepository: WSS connected');
      // Simulate incoming message after a while
      setInterval(() => {
        const mockMsg = {
          id: Date.now(),
          text: 'Hello, this is a mock message from the server.',
          timestamp: new Date().toISOString(),
          sender: 'system',
          status: 'delivered'
        };
        this._notifyCallbacks(mockMsg);
      }, 10000);
    }, 1000);
  }

  onMessage(callback) {
    this.messageCallbacks.push(callback);
  }

  _notifyCallbacks(message) {
    this.messageCallbacks.forEach(cb => cb(message));
  }

  async fetchThreadHistory(threadId) {
    // HTTP fetch for historical data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 101, text: 'Initial inquiry', timestamp: new Date(Date.now() - 86400000).toISOString(), sender: 'client', status: 'read' },
          { id: 102, text: 'We received your message.', timestamp: new Date(Date.now() - 82400000).toISOString(), sender: 'admin', status: 'read' }
        ]);
      }, 500);
    });
  }

  sendMessage(payload) {
    // Real implementation would be this.ws.send(JSON.stringify(payload));
    console.log('ChatRepository: Sending message over WSS', payload);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...payload, status: 'sent', id: Date.now() });
      }, 300);
    });
  }

  async uploadAsset(file) {
    // REST API for file upload
    console.log('ChatRepository: Uploading asset', file.name);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ url: `https://mock-storage.com/${file.name}`, type: file.type });
      }, 1500);
    });
  }
}

// Export as singleton
export const chatRepositoryInstance = new ChatRepository();
