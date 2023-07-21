export interface Person {
  attributes: {
    name: string;
    phone: string;
    email: string;
    publishedAt: string;
    tag: {
      data: {
        id: number;
        attributes: {
          tag: string;
        };
      };
    };
  };
  id: string;
}

export interface TagsType {
  id: number;
  attributes: {
    tag: string;
  };
}
[];

export interface FormType {
  name: string;
  email: string;
  phone: string;
  tag: string;
}
