// Business Layer for Chat
import { chatRepositoryInstance } from '../repositories/chat.repository';

export const ChatService = {
  initializeConnection(token, onMessageReceived) {
    // Setup message listener mapping raw data to domain entities
    chatRepositoryInstance.onMessage((rawMessage) => {
      const domainMessage = this._mapRawToDomain(rawMessage);
      if (onMessageReceived) {
        onMessageReceived(domainMessage);
      }
    });

    chatRepositoryInstance.connectWss(token);
  },

  async getHistory(threadId) {
    const rawHistory = await chatRepositoryInstance.fetchThreadHistory(threadId);
    return rawHistory.map(this._mapRawToDomain);
  },

  async sendTextMessage(text, sender) {
    if (!text || !text.trim()) throw new Error('Cannot send empty message');

    const payload = {
      text: text.trim(),
      timestamp: new Date().toISOString(),
      sender,
      type: 'text'
    };

    const rawResponse = await chatRepositoryInstance.sendMessage(payload);
    return this._mapRawToDomain(rawResponse);
  },

  async sendFileMessage(file, sender) {
    // Assertations on file type/size
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size exceeds 10MB limit.');
    }

    const uploadData = await chatRepositoryInstance.uploadAsset(file);
    
    const payload = {
      text: `Uploaded: ${file.name}`,
      assetUrl: uploadData.url,
      assetType: uploadData.type,
      timestamp: new Date().toISOString(),
      sender,
      type: 'file'
    };

    const rawResponse = await chatRepositoryInstance.sendMessage(payload);
    return this._mapRawToDomain(rawResponse);
  },

  // Map network structures into frontend domain entities
  _mapRawToDomain(rawMsg) {
    return {
      id: rawMsg.id || `temp-${Date.now()}`,
      content: rawMsg.text || '',
      time: new Date(rawMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: rawMsg.sender,
      isSelf: rawMsg.sender === 'client', // Will need adjustment depending on view context (admin vs client)
      status: rawMsg.status || 'sending', // 'sending', 'sent', 'delivered', 'read'
      assetUrl: rawMsg.assetUrl || null,
      assetType: rawMsg.assetType || null
    };
  }
};
