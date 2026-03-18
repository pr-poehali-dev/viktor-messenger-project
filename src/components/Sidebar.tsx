import Icon from "@/components/ui/icon";
import { Tab } from "@/types";

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
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
            onClick={() => onTabChange(item.id as Tab)}
            className={`viktor-nav-btn ${activeTab === item.id ? "active" : ""}`}
            title={item.label}
          >
            <Icon name={item.icon} size={22} />
            <span className="viktor-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="viktor-user-mini">
        <div className="viktor-avatar sm bg-gradient-to-br from-violet-500 to-cyan-500">
          ЮВ
        </div>
        <span className="viktor-nav-label">Юрий В.</span>
      </div>
    </aside>
  );
}
