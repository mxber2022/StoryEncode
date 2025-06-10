import { useState } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputBar from './components/InputBar';
import RegisterIPModal from './components/RegisterIPModal';
import HistoryPanel from './components/HistoryPanel';
import Footer from './components/Footer';
import { ChatMessage, RegisteredIP } from './types';
import { custom, useWalletClient } from 'wagmi';
import { StoryClient, StoryConfig } from '@story-protocol/core-sdk';
import { toHex } from 'viem';
import ChatNotification from './components/ChatNotification';

function App() {
  const { data: wallet } = useWalletClient();

  async function setupStoryClient(): Promise<StoryClient> {
    const config: StoryConfig = {
      wallet: wallet,
      transport: custom(wallet!.transport),
      chainId: "aeneid",
    };
    const client = StoryClient.newClient(config);
    return client;
  }

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [registeredIPs, setRegisteredIPs] = useState<RegisteredIP[]>([
    {
      id: 'story-0x1a2b3c4d',
      title: 'Circuits and Canvas',
      type: 'poem',
      content: 'Steel fingers learn to dance...',
      registrationDate: new Date('2024-01-15T10:45:00'),
      status: 'confirmed',
      tags: ['robot', 'art', 'creativity', 'AI'],
      license: 'CC BY',
      onChainId: 'story-0x1a2b3c4d',
    },
  ]);

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [selectedMessageForRegistration, setSelectedMessageForRegistration] = useState<ChatMessage | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [remixingFrom, setRemixingFrom] = useState<ChatMessage | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      remixedFrom: remixingFrom?.id,
    };

    setMessages(prev => [...prev, userMessage]);

    setInputValue('');
    setRemixingFrom(null);

    // Call backend for AI response
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await response.json();
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.content || 'AI failed to respond.',
        timestamp: new Date(),
        registrationStatus: 'not-registered',
        remixedFrom: remixingFrom?.id,
      };
      setMessages(prev => [...prev, aiMessage]);
      setNotification({ message: 'AI response received', type: 'success' });
    } catch (err) {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'AI failed to respond due to a server error.',
        timestamp: new Date(),
        registrationStatus: 'not-registered',
        remixedFrom: remixingFrom?.id,
      };
      setMessages(prev => [...prev, aiMessage]);
      setNotification({ message: 'AI failed to respond', type: 'error' });
    }
  };

  const handleRegisterIP = (messageId: string) => {
    console.log('handleRegisterIP', messageId);
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      setSelectedMessageForRegistration(message);
      setShowRegisterModal(true);
    }
  };

  const handleRemix = (message: ChatMessage) => {
    setRemixingFrom(message);
    setInputValue(`Remix this: ${message.content.substring(0, 100)}...`);
  };

  const handleRegisterSubmit = async (data: {
    title: string;
    description: string;
    tags: string[];
    license: string;
  }) => {
    if (!selectedMessageForRegistration) return;

    // Update message status to pending
    setMessages(prev => 
      prev.map(msg => 
        msg.id === selectedMessageForRegistration.id 
          ? { ...msg, registrationStatus: 'pending' }
          : msg
      )
    );

      const newIP: RegisteredIP = {
        id: `story-${Date.now()}`,
        title: data.title,
        type: 'story',
        content: selectedMessageForRegistration.content,
        registrationDate: new Date(),
        status: 'confirmed',
        tags: data.tags,
        license: data.license,
        onChainId: `story-0x${Math.random().toString(16).substr(2, 8)}`,
      };

      setRegisteredIPs(prev => [...prev, newIP]);


      /* 
        Implemnet IP registration on chain
      */
        const client = await setupStoryClient();

        const response = await client.ipAsset.mintAndRegisterIp({
          spgNftContract: '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc',
          ipMetadata: {
            ipMetadataURI: "test-metadata-uri",
            ipMetadataHash: toHex("test-metadata-hash", { size: 32 }),
            nftMetadataURI: "test-nft-metadata-uri",
            nftMetadataHash: toHex("test-nft-metadata-hash", { size: 32 }),
          }
        });
        
        console.log(
          `Root IPA created at tx hash ${response.txHash}, IPA ID: ${response.ipId}`
        );



      // Update message status to confirmed
      setMessages(prev => 
        prev.map(msg => 
          msg.id === selectedMessageForRegistration.id 
            ? { 
                ...msg, 
                registrationStatus: 'confirmed',
                metadata: {
                  title: data.title,
                  registrationDate: new Date(),
                  onChainId: newIP.onChainId,
                }
              }
            : msg
        )
      );

    setShowRegisterModal(false);
    setSelectedMessageForRegistration(null);
  };

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white flex flex-col">
      <Header 
        onShowHistory={() => setShowHistoryPanel(true)}
      />
      <div className="flex flex-1 min-h-0">
        <main className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            <ChatArea 
              messages={messages}
              onRegisterIP={handleRegisterIP}
              onRemix={handleRemix}
            />
            <InputBar 
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendMessage}
              remixingFrom={remixingFrom}
              onClearRemix={() => setRemixingFrom(null)}
            />
          </div>
        </main>
        {showHistoryPanel && (
          <HistoryPanel 
            registeredIPs={registeredIPs}
            onClose={() => setShowHistoryPanel(false)}
          />
        )}
      </div>
      <Footer />
      {showRegisterModal && selectedMessageForRegistration && (
        <RegisterIPModal
          message={selectedMessageForRegistration}
          onSubmit={handleRegisterSubmit}
          onClose={() => {
            setShowRegisterModal(false);
            setSelectedMessageForRegistration(null);
          }}
        />
      )}
      {notification && (
        <ChatNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;
