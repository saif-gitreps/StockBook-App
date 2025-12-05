export type User = {
   id: string;
   email: string;
   userName: string;
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

export type Comment = {
   title: string;
   content: string;
   createdBy: string;
};

export type CommentFormData = {
   title: string;
   content: string;
};
