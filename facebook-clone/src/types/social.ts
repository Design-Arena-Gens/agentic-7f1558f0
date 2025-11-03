export type NavItem = {
  label: string;
  href: string;
  icon: string;
  badge?: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  jobTitle: string;
  workplace: string;
  mutualFriends: number;
  hobbies: string[];
};

export type Story = {
  id: string;
  userId: string;
  backgroundImage: string;
  caption: string;
};

export type Comment = {
  id: string;
  userId: string;
  message: string;
  createdAt: string;
};

export type Post = {
  id: string;
  userId: string;
  content: string;
  image?: string;
  createdAt: string;
  privacy: "public" | "friends" | "only-me";
  likes: string[];
  comments: Comment[];
  shares: number;
  audienceSummary?: string;
};

export type Conversation = {
  id: string;
  participants: string[];
  messages: Message[];
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  sentAt: string;
  status: "sent" | "delivered" | "read";
};

export type EventHighlight = {
  id: string;
  title: string;
  time: string;
  location: string;
};

export type TrendingTopic = {
  id: string;
  title: string;
  hashtag: string;
  posts: number;
  trend: "up" | "down";
};

export type NotificationItem = {
  id: string;
  type: "friend_request" | "comment" | "like" | "group";
  message: string;
  createdAt: string;
  read: boolean;
};
