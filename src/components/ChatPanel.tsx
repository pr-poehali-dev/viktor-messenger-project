import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Chat, Message, getGradient } from "@/types";

interface ChatPanelProps {
  chats: Chat[];
  activeChat: Chat | null;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onSelectChat: (chat: Chat) => void;
  onBackToList: () => void;
  onUpdateChats: (updater: (prev: Chat[]) => Chat[]) => void;
  onUpdateActiveChat: (updater: (prev: Chat | null) => Chat | null) => void;
  onStartVideoCall: () => void;
}

export default function ChatPanel({
  chats,
  activeChat,
  searchQuery,
  onSearchChange,
  onSelectChat,
  onBackToList,
  onUpdateChats,
  onUpdateActiveChat,
  onStartVideoCall,
}: ChatPanelProps) {
  const [inputText, setInputText] = useState("");

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (!inputText.trim() || !activeChat) return;
    const newMsg: Message = {
      id: Date.now(),
      text: inputText,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      mine: true,
    };
    onUpdateChats((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: inputText, time: "сейчас" }
          : c
      )
    );
    onUpdateActiveChat((prev) =>
      prev ? { ...prev, messages: [...prev.messages, newMsg] } : prev
    );
    setInputText("");
  };

  if (!activeChat) {
    return (
      <div className="viktor-panel animate-fade-in">
        <div className="viktor-panel-header">
          <h2 className="viktor-panel-title">Чаты</h2>
          <button className="viktor-icon-btn">
            <Icon name="PenSquare" size={20} />
          </button>
        </div>
        <div className="viktor-search-bar">
          <Icon name="Search" size={16} />
          <input
            placeholder="Поиск чатов..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="viktor-list">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              className="viktor-chat-item"
              onClick={() => onSelectChat(chat)}
            >
              <div className="viktor-avatar-wrap">
                <div className={`viktor-avatar bg-gradient-to-br ${getGradient(chat.name)}`}>
                  {chat.avatar}
                </div>
                {chat.online && <span className="viktor-online-dot" />}
              </div>
              <div className="viktor-chat-info">
                <div className="viktor-chat-row">
                  <span className="viktor-chat-name">{chat.name}</span>
                  <span className="viktor-chat-time">{chat.time}</span>
                </div>
                <div className="viktor-chat-row">
                  <span className="viktor-chat-last">{chat.lastMessage}</span>
                  {chat.unread > 0 && (
                    <span className="viktor-badge">{chat.unread}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="viktor-chat-window animate-fade-in">
      <div className="viktor-chat-header">
        <button className="viktor-icon-btn" onClick={onBackToList}>
          <Icon name="ArrowLeft" size={20} />
        </button>
        <div className="viktor-avatar-wrap">
          <div className={`viktor-avatar sm bg-gradient-to-br ${getGradient(activeChat.name)}`}>
            {activeChat.avatar}
          </div>
          {activeChat.online && <span className="viktor-online-dot" />}
        </div>
        <div className="viktor-chat-header-info">
          <span className="viktor-chat-name">{activeChat.name}</span>
          <span className="viktor-chat-status">{activeChat.online ? "онлайн" : "не в сети"}</span>
        </div>
        <div className="viktor-chat-actions">
          <button className="viktor-icon-btn" onClick={onStartVideoCall} title="Видеозвонок">
            <Icon name="Video" size={20} />
          </button>
          <button className="viktor-icon-btn" title="Голосовой звонок">
            <Icon name="Phone" size={20} />
          </button>
          <button className="viktor-icon-btn">
            <Icon name="MoreVertical" size={20} />
          </button>
        </div>
      </div>

      <div className="viktor-messages">
        {activeChat.messages.map((msg) => (
          <div key={msg.id} className={`viktor-msg ${msg.mine ? "mine" : "their"}`}>
            <div className="viktor-msg-bubble">
              <p>{msg.text}</p>
              <span className="viktor-msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="viktor-input-bar">
        <button className="viktor-icon-btn">
          <Icon name="Paperclip" size={18} />
        </button>
        <input
          className="viktor-msg-input"
          placeholder="Написать сообщение..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="viktor-icon-btn">
          <Icon name="Smile" size={18} />
        </button>
        <button className="viktor-send-btn" onClick={sendMessage} disabled={!inputText.trim()}>
          <Icon name="Send" size={18} />
        </button>
      </div>
    </div>
  );
}
