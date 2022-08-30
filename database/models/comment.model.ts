export class CommentModel {
  constructor(init?: Partial<CommentModel>) {
    Object.assign(this, init);
  }

  id: number;
  comment: string;
  user_id: string;
  post_id: string;
}
