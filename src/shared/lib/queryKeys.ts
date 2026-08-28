export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },

  dashboard: {
    stats: ["dashboard", "stats"],
    sales: ["dashboard", "sales"],
    revenue: ["dashboard", "revenue"],
    target: ["dashboard", "target"],
    visitors: ["dashboard", "visitors"],
    demographics: ["dashboard", "demographics"],
    recentOrders: ["dashboard", "recentOrders"],
    latestUsers: ["dashboard", "latestUsers"],
    topProducts: ["dashboard", "topProducts"],
  },

  users: {
    list: (page: number) => ["users", page] as const,
    detail: (id: number) => ["users", id] as const,
  },

  orders: {
    list: (page: number) => ["orders", page] as const,
    detail: (id: number) => ["orders", id] as const,
  },

  sales: {
    analytics: ["sales", "analytics"] as const,
  },

  profile: {
    me: ["profile"] as const,
  },
};
