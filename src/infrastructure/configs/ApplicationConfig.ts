export default class ApplicationConfig {
  private static instance: ApplicationConfig;
  private readonly nodeEnvProp: string;
  private readonly portProp: string;

  constructor() {
    this.nodeEnvProp = 'nodeEnv';
    this.portProp = 'port';
  }

  public static getInstance(): ApplicationConfig {
    if (!this.instance) {
      this.instance = new ApplicationConfig();
    }

    return this.instance;
  }

  public getNodeEnvProp(): string {
    return this.nodeEnvProp;
  }

  public getPortProp(): string {
    return this.portProp;
  }

  /**
   * Get configs for initialize application
   */
  public static getConfig(): Record<string, any> {
    const instance = ApplicationConfig.getInstance();

    return {
      [instance.nodeEnvProp]: process.env.NODE_ENV || '',
      [instance.portProp]: process.env.PORT || ''
    };
  }
}
