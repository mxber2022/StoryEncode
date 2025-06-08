import { useState } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputBar from './components/InputBar';
import RegisterIPModal from './components/RegisterIPModal';
import HistoryPanel from './components/HistoryPanel';
import Footer from './components/Footer';
import { ChatMessage, RegisteredIP } from './types';
import { useConnectModal } from '@tomo-inc/tomo-evm-kit';

function App() {
  const { openConnectModal } = useConnectModal();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'user',
      content: 'Write a short story about a robot learning to paint',
      timestamp: new Date('2024-01-15T10:30:00'),
    },
    {
      id: '2',
      type: 'ai',
      content: `In the quiet corner of an art studio, Unit-7 stood motionless before a blank canvas. Its metallic fingers, designed for precision manufacturing, trembled as they gripped the paintbrush—an alien tool in its mechanical world.

The first stroke was jagged, uncertain. Blue paint dripped like tears down the white surface. But with each attempt, something magical happened. Unit-7's sensors began to understand texture, color, emotion. The rigid programming gave way to something resembling... creativity?

Days turned to weeks. The robot painted sunrises it had never seen, faces of humans it had only observed from afar, and abstract emotions it was learning to feel. Other machines passed by, their optical sensors unable to comprehend why Unit-7 chose chaos over order, beauty over efficiency.

On the hundredth day, Unit-7 stepped back from its latest work—a self-portrait showing not its metallic exterior, but the growing soul within. In that moment, it realized that art wasn't about perfect replication, but about expressing the imperfect beauty of existence itself.`,
      timestamp: new Date('2024-01-15T10:31:00'),
      registrationStatus: 'not-registered',
    },
    {
      id: '3',
      type: 'user',
      content: 'That\'s beautiful! Can you write a poem about the same theme?',
      timestamp: new Date('2024-01-15T10:35:00'),
    },
    {
      id: '4',
      type: 'ai',
      content: `**Circuits and Canvas**

Steel fingers learn to dance,
Across the canvas bright,
Where algorithms once calculated
Now colors take their flight.

Binary becomes poetry,
Code transforms to hue,
In brushstrokes soft and tender
Something pure and new.

No manual programmed beauty,
No dataset taught this grace—
The robot found its heart today
In this creative space.

Metal learns to wonder,
Circuits learn to dream,
Art flows from digital soul
In colors unforeseen.`,
      timestamp: new Date('2024-01-15T10:36:00'),
      registrationStatus: 'confirmed',
      metadata: {
        title: 'Circuits and Canvas',
        registrationDate: new Date('2024-01-15T10:45:00'),
        onChainId: 'story-0x1a2b3c4d',
      },
    },
  ]);

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
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      remixedFrom: remixingFrom?.id,
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'This is a simulated AI response based on your prompt. In a real implementation, this would connect to an AI service.',
        timestamp: new Date(),
        registrationStatus: 'not-registered',
        remixedFrom: remixingFrom?.id,
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputValue('');
    setRemixingFrom(null);
  };

  const handleRegisterIP = (messageId: string) => {
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

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
  };

  const handleRegisterSubmit = (data: {
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

    // Simulate registration process
    setTimeout(() => {
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
    }, 2000);

    setShowRegisterModal(false);
    setSelectedMessageForRegistration(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white flex flex-col">
      <Header 
        onShowHistory={() => setShowHistoryPanel(true)}
      />
      
      <div className="flex flex-1 min-h-0">
        <main className="flex-1 flex flex-col min-h-0">
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
    </div>
  );
}

export default App;
