export default class Application {
  private static instance: Application;
  private readonly nodeEnv: string;

  constructor() {
    this.nodeEnv = 'nodeEnv';
  }

  public static getInstance(): Application {
    if (!this.instance) {
      this.instance = new Application();
    }

    return this.instance;
  }

  public getNodeEnvProp(): string {
    return this.nodeEnv;
  }

  /**
   * Get config for initialize application
   */
  public static getConfig(): Record<string, any> {
    const instance = Application.getInstance();

    return {
      [instance.nodeEnv]: process.env.NODE_ENV || ''
    };
  }
}
