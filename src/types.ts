export type Tab = "chats" | "contacts" | "search" | "profile" | "settings";

export interface Message {
  id: number;
  text: string;
  time: string;
  mine: boolean;
}

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
}

export const CHATS: Chat[] = [
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

export const CONTACTS: Contact[] = [
  { id: 1, name: "Алина Морозова", avatar: "АМ", status: "Онлайн", online: true },
  { id: 2, name: "Максим Петров", avatar: "МП", status: "Был час назад", online: false },
  { id: 3, name: "Ольга Смирнова", avatar: "ОС", status: "Онлайн", online: true },
  { id: 4, name: "Дмитрий Волков", avatar: "ДВ", status: "Не беспокоить", online: false },
  { id: 5, name: "Елена Козлова", avatar: "ЕК", status: "Онлайн", online: true },
  { id: 6, name: "Артём Новиков", avatar: "АН", status: "Был вчера", online: false },
];

export const AVATAR_GRADIENTS = [
  "from-violet-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-teal-500",
  "from-yellow-500 to-orange-500",
  "from-pink-500 to-rose-500",
];

export function getGradient(name: string) {
  const index = name.charCodeAt(0) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}
