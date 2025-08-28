export interface ICreateBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}
export interface IBook extends ICreateBook {
  _id: string;
}
export interface UpdateBookModalProps {
  book: IBook;
}
export interface BackendValidationError {
  status: number;
  data: {
    success: boolean;
    message: string;
    error?: {
      errors?: Record<string, { message: string }>;
    };
  };
}

export interface ICreateBorrow {
  quantity: number;
  dueDate: Date;
}
export interface IBorrow {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}
