import { useState } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputBar from './components/InputBar';
import RegisterIPModal from './components/RegisterIPModal';
import HistoryPanel from './components/HistoryPanel';
import Footer from './components/Footer';
import { ChatMessage, RegisteredIP } from './types';
import { custom, useAccount, useWalletClient } from 'wagmi';
import { IpMetadata, StoryClient, StoryConfig } from '@story-protocol/core-sdk';
import { toHex } from 'viem';
import ChatNotification from './components/ChatNotification';
import { uploadJSONToIPFS } from './utils/uploadToIpfs';
import { createHash } from 'crypto'

function App() {
  const { data: wallet } = useWalletClient();
  const { address } = useAccount()

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

    // Find the user question for this AI response
    let userQuestion = '';
    if (selectedMessageForRegistration.type === 'ai') {
      const aiIndex = messages.findIndex(msg => msg.id === selectedMessageForRegistration.id);
      for (let i = aiIndex - 1; i >= 0; i--) {
        if (messages[i].type === 'user') {
          userQuestion = messages[i].content;
          break;
        }
      }
    }

    // Add attributes to data before uploading to IPFS
    let dataWithAttributes: any = { ...data };
    if (selectedMessageForRegistration.type === 'ai') {
      dataWithAttributes.attributes = [
        ...(userQuestion ? [{ trait_type: 'user_question', value: userQuestion }] : []),
        { trait_type: 'claude_response', value: selectedMessageForRegistration.content },
      ];
    } else {
      dataWithAttributes.attributes = [
        { trait_type: 'claude_response', value: selectedMessageForRegistration.content },
      ];
    }

    const ipfsmetadata = await uploadJSONToIPFS(dataWithAttributes);
    const nftHash = createHash('sha256').update(JSON.stringify(dataWithAttributes)).digest('hex')

    const client = await setupStoryClient();

    /* 1. ip meta data */

    const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
      title: data.title,
      description: data.description,
      createdAt: new Date().getTime().toString(),
      creators: [
          {
              name: address as `0x${string}`,
              address: address as `0x${string}`,
              contributionPercent: 100,
          },
      ],
      image: 'https://cdn2.suno.ai/image_large_8bcba6bc-3f60-4921-b148-f32a59086a4c.jpeg',
      imageHash: '0xc404730cdcdf7e5e54e8f16bc6687f97c6578a296f4a21b452d8a6ecabd61bcc',
      mediaUrl: 'https://cdn1.suno.ai/dcd3076f-3aa5-400b-ba5d-87d30f27c311.mp3',
      mediaHash: '0xb52a44f53b2485ba772bd4857a443e1fb942cf5dda73c870e2d2238ecd607aee',
      mediaType: 'audio/mpeg',
  })

  const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
  const ipHash = createHash('sha256').update(JSON.stringify(ipMetadata)).digest('hex')

    /*
      Upload metadata to IPFS and get the hash
    */

    const response = await client.ipAsset.mintAndRegisterIp({
      spgNftContract: '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc',
      ipMetadata: {
        ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
        ipMetadataHash: `0x${ipHash}`,
        nftMetadataURI: `https://ipfs.io/ipfs/${ipfsmetadata}`,
        nftMetadataHash: `0x${nftHash}`,
      }
    });
    
    console.log(
      `Root IPA created at tx hash ${response.txHash}, IPA ID: ${response.ipId}`
    );

    // Use the actual IPA ID for onChainId
    const newIP: RegisteredIP = {
      id: `story-${Date.now()}`,
      title: data.title,
      type: 'story',
      content: selectedMessageForRegistration.content,
      registrationDate: new Date(),
      status: 'confirmed',
      tags: data.tags,
      license: data.license,
      onChainId: response.ipId || '',
    };
    setRegisteredIPs(prev => [...prev, newIP]);

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
                onChainId: response.ipId || '',
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
