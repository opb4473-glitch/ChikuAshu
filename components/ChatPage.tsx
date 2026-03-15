'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  _id: string;
  sender: string;
  content: string;
  image?: string;
  createdAt: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Check auth and load messages
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.username);
          await loadMessages();
        } else {
          router.push('/');
        }
      } catch (error) {
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  // Load messages
  const loadMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !imagePreview) return;

    setLoading(true);
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newMessage || '(Shared an image)',
          image: imagePreview,
        }),
      });

      if (response.ok) {
        setNewMessage('');
        setImagePreview(null);
        await loadMessages();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manual refresh
  const handleRefresh = () => {
    loadMessages();
  };

  // Logout
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const otherUser = currentUser === 'ashu' ? 'Chiku' : 'Ashu';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-pink-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">♡</div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-rose-600">Ashu & Chiku</h1>
              <p className="text-xs text-gray-500">Just us</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="border-pink-200 text-rose-600 hover:bg-pink-50"
            >
              Refresh
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-pink-200 text-gray-600 hover:bg-pink-50"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 py-6">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="text-6xl mb-4 opacity-30">♡</div>
              <p className="text-gray-500 text-lg font-light">No messages yet...</p>
              <p className="text-gray-400 text-sm mt-2">Start the conversation!</p>
            </div>
          ) : (
            messages?.map((message) => {
              const isCurrentUser = message.sender === currentUser;
              const senderName = message.sender === 'ashu' ? 'Ashu' : 'Chiku';

              return (
                <div
                  key={message._id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md ${isCurrentUser
                      ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-3xl rounded-tr-lg shadow-lg'
                      : 'bg-white text-gray-800 rounded-3xl rounded-tl-lg shadow-md border border-pink-100'
                      } px-5 py-3`}
                  >
                    {!isCurrentUser && (
                      <p className="text-xs font-semibold text-rose-600 mb-1">{senderName}</p>
                    )}

                    {message.image && (
                      <div className="mb-2 rounded-lg overflow-hidden">
                        <img
                          src={message.image}
                          alt="Shared"
                          className="max-w-full max-h-64 object-cover"
                        />
                      </div>
                    )}

                    <p className="text-sm break-words">{message.content}</p>

                    <p
                      className={`text-xs mt-2 ${isCurrentUser ? 'text-pink-100' : 'text-gray-400'
                        }`}
                    >
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-pink-100 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          {imagePreview && (
            <div className="mb-4 relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-32 rounded-lg"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-rose-600"
              >
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*,video/*,.gif"
              className="hidden"
            />

            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="icon"
              className="border-pink-200 text-rose-600 hover:bg-pink-50"
              disabled={loading}
            >
              📸
            </Button>

            <Input
              type="text"
              placeholder={`Message from ${currentUser === 'ashu' ? 'Ashu' : 'Chiku'
                }...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border-pink-200 focus:border-rose-500 focus:ring-rose-200"
              disabled={loading}
            />

            <Button
              type="submit"
              disabled={loading || (!newMessage.trim() && !imagePreview)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
