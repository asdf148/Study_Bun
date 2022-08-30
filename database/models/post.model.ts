export class PostModel {
  constructor(init?: Partial<PostModel>) {
    Object.assign(this, init);
  }

  id: number;
  image: string;
  title: string;
  content: string;
  user_id: number;
}
