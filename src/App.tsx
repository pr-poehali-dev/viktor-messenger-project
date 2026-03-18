import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "chats" | "contacts" | "search" | "profile" | "settings";

interface Message {
  id: number;
  text: string;
  time: string;
  mine: boolean;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
}

const CHATS: Chat[] = [
  {
    id: 1,
    name: "Алина Морозова",
    avatar: "АМ",
    lastMessage: "Увидимся вечером! 🔥",
    time: "14:32",
    unread: 3,
    online: true,
    messages: [
      { id: 1, text: "Привет! Как дела?", time: "14:10", mine: false },
      { id: 2, text: "Отлично, готовлюсь к встрече", time: "14:15", mine: true },
      { id: 3, text: "Увидимся вечером! 🔥", time: "14:32", mine: false },
    ],
  },
  {
    id: 2,
    name: "Команда Viktor",
    avatar: "VK",
    lastMessage: "Новые функции уже доступны!",
    time: "12:00",
    unread: 1,
    online: true,
    messages: [
      { id: 1, text: "Добро пожаловать в Viktor!", time: "09:00", mine: false },
      { id: 2, text: "Новые функции уже доступны!", time: "12:00", mine: false },
    ],
  },
  {
    id: 3,
    name: "Максим Петров",
    avatar: "МП",
    lastMessage: "Ок, увидимся завтра",
    time: "вчера",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Можем перенести встречу?", time: "вчера", mine: false },
      { id: 2, text: "Ок, увидимся завтра", time: "вчера", mine: true },
    ],
  },
  {
    id: 4,
    name: "Дизайн группа",
    avatar: "ДГ",
    lastMessage: "Макеты готовы, смотри!",
    time: "вчера",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Макеты готовы, смотри!", time: "вчера", mine: false },
    ],
  },
  {
    id: 5,
    name: "Ольга Смирнова",
    avatar: "ОС",
    lastMessage: "Спасибо за помощь 💙",
    time: "пн",
    unread: 0,
    online: true,
    messages: [
      { id: 1, text: "Спасибо за помощь 💙", time: "пн", mine: false },
    ],
  },
];

const CONTACTS: Contact[] = [
  { id: 1, name: "Алина Морозова", avatar: "АМ", status: "Онлайн", online: true },
  { id: 2, name: "Максим Петров", avatar: "МП", status: "Был час назад", online: false },
  { id: 3, name: "Ольга Смирнова", avatar: "ОС", status: "Онлайн", online: true },
  { id: 4, name: "Дмитрий Волков", avatar: "ДВ", status: "Не беспокоить", online: false },
  { id: 5, name: "Елена Козлова", avatar: "ЕК", status: "Онлайн", online: true },
  { id: 6, name: "Артём Новиков", avatar: "АН", status: "Был вчера", online: false },
];

const AVATAR_GRADIENTS = [
  "from-violet-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-teal-500",
  "from-yellow-500 to-orange-500",
  "from-pink-500 to-rose-500",
];

function getGradient(name: string) {
  const index = name.charCodeAt(0) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState<Chat[]>(CHATS);
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [settingsNotif, setSettingsNotif] = useState(true);
  const [settingsSound, setSettingsSound] = useState(true);
  const [settingsOnline, setSettingsOnline] = useState(true);
  const [settingsRead, setSettingsRead] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const sendMessage = () => {
    if (!inputText.trim() || !activeChat) return;
    const newMsg: Message = {
      id: Date.now(),
      text: inputText,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      mine: true,
    };
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: inputText, time: "сейчас" }
          : c
      )
    );
    setActiveChat((prev) =>
      prev ? { ...prev, messages: [...prev.messages, newMsg] } : prev
    );
    setInputText("");
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="viktor-app">
      <div className="viktor-orb viktor-orb-1" />
      <div className="viktor-orb viktor-orb-2" />
      <div className="viktor-orb viktor-orb-3" />

      <div className="viktor-shell">
        {/* Сайдбар */}
        <aside className="viktor-sidebar">
          <div className="viktor-logo">
            <div className="viktor-logo-icon">V</div>
            <span className="viktor-logo-text">Viktor</span>
          </div>

          <nav className="viktor-nav">
            {[
              { id: "chats", icon: "MessageCircle", label: "Чаты" },
              { id: "contacts", icon: "Users", label: "Контакты" },
              { id: "search", icon: "Search", label: "Поиск" },
              { id: "profile", icon: "User", label: "Профиль" },
              { id: "settings", icon: "Settings", label: "Настройки" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as Tab); setActiveChat(null); setSearchQuery(""); }}
                className={`viktor-nav-btn ${activeTab === item.id ? "active" : ""}`}
                title={item.label}
              >
                <Icon name={item.icon} size={22} />
                <span className="viktor-nav-label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="viktor-user-mini">
            {profilePhoto ? (
              <img src={profilePhoto} className="viktor-avatar sm" style={{ objectFit: "cover" }} alt="Аватар" />
            ) : (
              <div className="viktor-avatar sm bg-gradient-to-br from-violet-500 to-cyan-500">
                ЮВ
              </div>
            )}
            <span className="viktor-nav-label">Юрий В.</span>
          </div>
        </aside>

        {/* Основная панель */}
        <main className="viktor-main">
          {/* ЧАТЫ */}
          {activeTab === "chats" && !activeChat && (
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="viktor-list">
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    className="viktor-chat-item"
                    onClick={() => setActiveChat(chat)}
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
          )}

          {/* ОКНО ЧАТА */}
          {activeTab === "chats" && activeChat && (
            <div className="viktor-chat-window animate-fade-in">
              <div className="viktor-chat-header">
                <button className="viktor-icon-btn" onClick={() => setActiveChat(null)}>
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
                  <button className="viktor-icon-btn" onClick={() => setVideoCallActive(true)} title="Видеозвонок">
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
          )}

          {/* КОНТАКТЫ */}
          {activeTab === "contacts" && (
            <div className="viktor-panel animate-fade-in">
              <div className="viktor-panel-header">
                <h2 className="viktor-panel-title">Контакты</h2>
                <button className="viktor-icon-btn">
                  <Icon name="UserPlus" size={20} />
                </button>
              </div>
              <div className="viktor-search-bar">
                <Icon name="Search" size={16} />
                <input
                  placeholder="Поиск контактов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="viktor-contacts-section">
                <span className="viktor-section-label">Онлайн · {filteredContacts.filter(c => c.online).length}</span>
              </div>
              <div className="viktor-list">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="viktor-contact-item">
                    <div className="viktor-avatar-wrap">
                      <div className={`viktor-avatar bg-gradient-to-br ${getGradient(contact.name)}`}>
                        {contact.avatar}
                      </div>
                      {contact.online && <span className="viktor-online-dot" />}
                    </div>
                    <div className="viktor-chat-info">
                      <span className="viktor-chat-name">{contact.name}</span>
                      <span className={`viktor-contact-status ${contact.online ? "online" : ""}`}>
                        {contact.status}
                      </span>
                    </div>
                    <div className="viktor-contact-btns">
                      <button className="viktor-icon-btn sm" title="Сообщение">
                        <Icon name="MessageCircle" size={16} />
                      </button>
                      <button className="viktor-icon-btn sm" title="Видеозвонок" onClick={() => setVideoCallActive(true)}>
                        <Icon name="Video" size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ПОИСК */}
          {activeTab === "search" && (
            <div className="viktor-panel animate-fade-in">
              <div className="viktor-panel-header">
                <h2 className="viktor-panel-title">Поиск</h2>
              </div>
              <div className="viktor-search-bar large">
                <Icon name="Search" size={20} />
                <input
                  placeholder="Найти людей, чаты, сообщения..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")}>
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>

              {!searchQuery && (
                <div className="viktor-search-empty">
                  <div className="viktor-search-icon-wrap">
                    <Icon name="Search" size={40} />
                  </div>
                  <p>Введите имя или ключевое слово</p>
                </div>
              )}

              {searchQuery && (
                <>
                  {filteredChats.length > 0 && (
                    <>
                      <div className="viktor-contacts-section">
                        <span className="viktor-section-label">Чаты</span>
                      </div>
                      {filteredChats.map((chat) => (
                        <button
                          key={chat.id}
                          className="viktor-chat-item"
                          onClick={() => { setActiveChat(chat); setActiveTab("chats"); }}
                        >
                          <div className={`viktor-avatar bg-gradient-to-br ${getGradient(chat.name)}`}>
                            {chat.avatar}
                          </div>
                          <div className="viktor-chat-info">
                            <span className="viktor-chat-name">{chat.name}</span>
                            <span className="viktor-chat-last">{chat.lastMessage}</span>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                  {filteredContacts.length > 0 && (
                    <>
                      <div className="viktor-contacts-section">
                        <span className="viktor-section-label">Контакты</span>
                      </div>
                      {filteredContacts.map((contact) => (
                        <div key={contact.id} className="viktor-contact-item">
                          <div className={`viktor-avatar bg-gradient-to-br ${getGradient(contact.name)}`}>
                            {contact.avatar}
                          </div>
                          <div className="viktor-chat-info">
                            <span className="viktor-chat-name">{contact.name}</span>
                            <span className="viktor-contact-status">{contact.status}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {filteredChats.length === 0 && filteredContacts.length === 0 && (
                    <div className="viktor-search-empty">
                      <p>Ничего не найдено по «{searchQuery}»</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ПРОФИЛЬ */}
          {activeTab === "profile" && (
            <div className="viktor-panel animate-fade-in">
              <div className="viktor-panel-header">
                <h2 className="viktor-panel-title">Профиль</h2>
                <button className="viktor-icon-btn">
                  <Icon name="Edit2" size={20} />
                </button>
              </div>
              <div className="viktor-profile-hero">
                <div className="viktor-profile-avatar-wrap">
                  {profilePhoto ? (
                    <img src={profilePhoto} className="viktor-profile-avatar" style={{ objectFit: "cover" }} alt="Фото профиля" />
                  ) : (
                    <div className="viktor-profile-avatar bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500">
                      ЮВ
                    </div>
                  )}
                  <label className="viktor-photo-upload-btn" title="Изменить фото">
                    <Icon name="Camera" size={16} />
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
                  </label>
                </div>
                <h3 className="viktor-profile-name">Юрий Викторов</h3>
                <p className="viktor-profile-handle">@yuriviktorov</p>
                <div className="viktor-profile-status-badge">
                  <span className="viktor-online-dot" />
                  В сети
                </div>
              </div>
              <div className="viktor-profile-stats">
                {[
                  { label: "Чатов", value: "24" },
                  { label: "Контактов", value: "138" },
                  { label: "Групп", value: "7" },
                ].map((s) => (
                  <div key={s.label} className="viktor-stat">
                    <span className="viktor-stat-value">{s.value}</span>
                    <span className="viktor-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="viktor-profile-info">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                  { icon: "Mail", label: "Email", value: "yuri@viktor.app" },
                  { icon: "MapPin", label: "Город", value: "Москва, Россия" },
                  { icon: "Calendar", label: "Дата регистрации", value: "Март 2026" },
                ].map((item) => (
                  <div key={item.label} className="viktor-info-row">
                    <div className="viktor-info-icon">
                      <Icon name={item.icon} size={16} />
                    </div>
                    <div>
                      <span className="viktor-info-label">{item.label}</span>
                      <span className="viktor-info-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* НАСТРОЙКИ */}
          {activeTab === "settings" && (
            <div className="viktor-panel animate-fade-in">
              <div className="viktor-panel-header">
                <h2 className="viktor-panel-title">Настройки</h2>
              </div>
              <div className="viktor-settings">
                <div className="viktor-settings-group">
                  <span className="viktor-section-label">Уведомления</span>
                  <div className="viktor-setting-row">
                    <div className="viktor-setting-info">
                      <Icon name="Bell" size={18} />
                      <span>Push-уведомления</span>
                    </div>
                    <button
                      className={`viktor-toggle ${settingsNotif ? "on" : ""}`}
                      onClick={() => setSettingsNotif(!settingsNotif)}
                    />
                  </div>
                  <div className="viktor-setting-row">
                    <div className="viktor-setting-info">
                      <Icon name="Volume2" size={18} />
                      <span>Звуки сообщений</span>
                    </div>
                    <button
                      className={`viktor-toggle ${settingsSound ? "on" : ""}`}
                      onClick={() => setSettingsSound(!settingsSound)}
                    />
                  </div>
                </div>
                <div className="viktor-settings-group">
                  <span className="viktor-section-label">Приватность</span>
                  <div className="viktor-setting-row">
                    <div className="viktor-setting-info">
                      <Icon name="Eye" size={18} />
                      <span>Статус «в сети»</span>
                    </div>
                    <button
                      className={`viktor-toggle ${settingsOnline ? "on" : ""}`}
                      onClick={() => setSettingsOnline(!settingsOnline)}
                    />
                  </div>
                  <div className="viktor-setting-row">
                    <div className="viktor-setting-info">
                      <Icon name="CheckCheck" size={18} />
                      <span>Подтверждение прочтения</span>
                    </div>
                    <button
                      className={`viktor-toggle ${settingsRead ? "on" : ""}`}
                      onClick={() => setSettingsRead(!settingsRead)}
                    />
                  </div>
                </div>
                <div className="viktor-settings-group">
                  <span className="viktor-section-label">Видеозвонки</span>
                  <div className="viktor-setting-row">
                    <div className="viktor-setting-info">
                      <Icon name="Video" size={18} />
                      <span>HD качество</span>
                    </div>
                    <button className="viktor-toggle on" />
                  </div>
                  <div className="viktor-setting-row">
                    <div className="viktor-setting-info">
                      <Icon name="Mic" size={18} />
                      <span>Шумоподавление</span>
                    </div>
                    <button className="viktor-toggle on" />
                  </div>
                </div>
                <div className="viktor-settings-group">
                  <span className="viktor-section-label">Аккаунт</span>
                  <button className="viktor-setting-link danger">
                    <Icon name="LogOut" size={18} />
                    Выйти из аккаунта
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Видеозвонок */}
      {videoCallActive && (
        <div className="viktor-video-overlay animate-fade-in">
          <div className="viktor-video-bg" />
          <div className="viktor-video-content">
            <div className="viktor-video-self">
              <div className="viktor-avatar lg bg-gradient-to-br from-violet-500 to-cyan-500">ЮВ</div>
              <span>Вы</span>
            </div>
            <div className="viktor-video-main">
              <div className={`viktor-avatar xl bg-gradient-to-br ${activeChat ? getGradient(activeChat.name) : "from-pink-500 to-rose-500"}`}>
                {activeChat?.avatar || "АМ"}
              </div>
              <h3>{activeChat?.name || "Алина Морозова"}</h3>
              <p className="viktor-video-status">Звонок идёт · 02:34</p>
            </div>
            <div className="viktor-video-controls">
              <button className="viktor-video-btn" title="Микрофон">
                <Icon name="Mic" size={22} />
              </button>
              <button className="viktor-video-btn end" onClick={() => setVideoCallActive(false)} title="Завершить">
                <Icon name="PhoneOff" size={22} />
              </button>
              <button className="viktor-video-btn" title="Камера">
                <Icon name="Camera" size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}