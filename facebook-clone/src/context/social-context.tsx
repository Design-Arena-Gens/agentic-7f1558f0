"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  Conversation,
  Message,
  NotificationItem,
  Post,
  User,
} from "@/types/social";
import {
  conversations as seedConversations,
  notifications as seedNotifications,
  posts as seedPosts,
  users as seedUsers,
} from "@/lib/data";

type SocialContextValue = {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  notifications: NotificationItem[];
  conversations: Conversation[];
  login: (userId: string) => void;
  logout: () => void;
  createPost: (payload: { content: string; image?: string }) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, message: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
};

const SocialContext = createContext<SocialContextValue | undefined>(undefined);

const makeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id_${Math.random().toString(36).slice(2, 10)}`;
};

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(seedUsers[0]);
  const [posts, setPosts] = useState<Post[]>(seedPosts);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(seedNotifications);
  const [conversations, setConversations] =
    useState<Conversation[]>(seedConversations);

  const login = useCallback((userId: string) => {
    const user = seedUsers.find((candidate) => candidate.id === userId) ?? null;
    setCurrentUser(user);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const createPost = useCallback(
    ({ content, image }: { content: string; image?: string }) => {
      if (!currentUser) return;
      const newPost: Post = {
        id: makeId(),
        userId: currentUser.id,
        content,
        image,
        createdAt: new Date().toISOString(),
        privacy: "friends",
        likes: [],
        comments: [],
        shares: 0,
      };
      setPosts((prev) => [newPost, ...prev]);
    },
    [currentUser],
  );

  const toggleLike = useCallback(
    (postId: string) => {
      if (!currentUser) return;
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;
          const alreadyLiked = post.likes.includes(currentUser.id);
          return {
            ...post,
            likes: alreadyLiked
              ? post.likes.filter((id) => id !== currentUser.id)
              : [...post.likes, currentUser.id],
          };
        }),
      );
    },
    [currentUser],
  );

  const addComment = useCallback(
    (postId: string, message: string) => {
      if (!currentUser) return;
      const nextComment = {
        id: makeId(),
        userId: currentUser.id,
        message,
        createdAt: new Date().toISOString(),
      };
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, nextComment] }
            : post,
        ),
      );
    },
    [currentUser],
  );

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  }, []);

  const sendMessage = useCallback(
    (conversationId: string, text: string) => {
      if (!currentUser) return;
      const message: Message = {
        id: makeId(),
        senderId: currentUser.id,
        text,
        sentAt: new Date().toISOString(),
        status: "sent",
      };
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages: [...conversation.messages, message],
              }
            : conversation,
        ),
      );
    },
    [currentUser],
  );

  const value = useMemo(
    () => ({
      currentUser,
      users: seedUsers,
      posts,
      notifications,
      conversations,
      login,
      logout,
      createPost,
      toggleLike,
      addComment,
      markNotificationAsRead,
      sendMessage,
    }),
    [
      addComment,
      conversations,
      createPost,
      currentUser,
      login,
      logout,
      notifications,
      posts,
      toggleLike,
      markNotificationAsRead,
      sendMessage,
    ],
  );

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>;
}

export function useSocial() {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error("useSocial must be used within a SocialProvider");
  }
  return context;
}
