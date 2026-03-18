import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Tab, Chat, Contact, CONTACTS, getGradient } from "@/types";

interface MainPanelProps {
  activeTab: Tab;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onSelectChat: (chat: Chat) => void;
  onStartVideoCall: () => void;
  settingsNotif: boolean;
  onToggleNotif: () => void;
  settingsSound: boolean;
  onToggleSound: () => void;
  settingsOnline: boolean;
  onToggleOnline: () => void;
  settingsRead: boolean;
  onToggleRead: () => void;
  chats: Chat[];
}

export default function MainPanel({
  activeTab,
  searchQuery,
  onSearchChange,
  onSelectChat,
  onStartVideoCall,
  settingsNotif,
  onToggleNotif,
  settingsSound,
  onToggleSound,
  settingsOnline,
  onToggleOnline,
  settingsRead,
  onToggleRead,
  chats,
}: MainPanelProps) {
  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (activeTab === "contacts") {
    return (
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="viktor-contacts-section">
          <span className="viktor-section-label">Онлайн · {filteredContacts.filter((c: Contact) => c.online).length}</span>
        </div>
        <div className="viktor-list">
          {filteredContacts.map((contact: Contact) => (
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
                <button className="viktor-icon-btn sm" title="Видеозвонок" onClick={onStartVideoCall}>
                  <Icon name="Video" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "search") {
    return (
      <div className="viktor-panel animate-fade-in">
        <div className="viktor-panel-header">
          <h2 className="viktor-panel-title">Поиск</h2>
        </div>
        <div className="viktor-search-bar large">
          <Icon name="Search" size={20} />
          <input
            placeholder="Найти людей, чаты, сообщения..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")}>
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
                    onClick={() => onSelectChat(chat)}
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
                {filteredContacts.map((contact: Contact) => (
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
    );
  }

  if (activeTab === "profile") {
    return (
      <div className="viktor-panel animate-fade-in">
        <div className="viktor-panel-header">
          <h2 className="viktor-panel-title">Профиль</h2>
          <button className="viktor-icon-btn">
            <Icon name="Edit2" size={20} />
          </button>
        </div>
        <div className="viktor-profile-hero">
          <div className="viktor-profile-avatar-wrap">
            <div className="viktor-profile-avatar bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500">
              ЮВ
            </div>
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
    );
  }

  if (activeTab === "settings") {
    return (
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
              <button className={`viktor-toggle ${settingsNotif ? "on" : ""}`} onClick={onToggleNotif} />
            </div>
            <div className="viktor-setting-row">
              <div className="viktor-setting-info">
                <Icon name="Volume2" size={18} />
                <span>Звуки сообщений</span>
              </div>
              <button className={`viktor-toggle ${settingsSound ? "on" : ""}`} onClick={onToggleSound} />
            </div>
          </div>
          <div className="viktor-settings-group">
            <span className="viktor-section-label">Приватность</span>
            <div className="viktor-setting-row">
              <div className="viktor-setting-info">
                <Icon name="Eye" size={18} />
                <span>Статус «в сети»</span>
              </div>
              <button className={`viktor-toggle ${settingsOnline ? "on" : ""}`} onClick={onToggleOnline} />
            </div>
            <div className="viktor-setting-row">
              <div className="viktor-setting-info">
                <Icon name="CheckCheck" size={18} />
                <span>Подтверждение прочтения</span>
              </div>
              <button className={`viktor-toggle ${settingsRead ? "on" : ""}`} onClick={onToggleRead} />
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
    );
  }

  return null;
}
