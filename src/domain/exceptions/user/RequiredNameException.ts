import RequiredException from '../RequiredException';

export default class RequiredNameException extends RequiredException {
  constructor() {
    super('Name');
  }
}
