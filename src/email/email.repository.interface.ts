export default interface EmailRepositoryInterface {
  sendTaskCreatedEmail(mail: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  }): void;
}
