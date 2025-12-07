export type User = {
   id: string;
   email: string;
   userName: string;
};

export type UpdateUserForm = {
   email: string;
   userName: string;
   password: string;
};

export type LoginFormData = {
   userName: string;
   password: string;
};

export type RegisterFormData = {
   email: string;
   userName: string;
   password: string;
};

export type Portfolio = {
   id: number;
   symbol: string;
   companyName: string;
   purchase: number;
   lastDiv: number;
   industry: string;
   marketCap: number;
   comments: Comment;
};

export type Stock = {
   id: string;
   symbol: string;
   companyName: string;
   purchase: number;
   lastDiv: number;
   industry: string;
   marketCap: number;
   comments: Comment[];
   portfolios: Portfolio[];
};

export type Comment = {
   id: string;
   title: string;
   content: string;
   data: Date;
   stockId: string;
   createdBy: string;
};

export type CommentFormData = {
   symbol: string;
   title: string;
   content: string;
};
