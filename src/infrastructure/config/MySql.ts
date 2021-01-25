export default class MySql {
  private static instance: MySql;
  private readonly prefix: string;
  private readonly hostProp: string;
  private readonly portProp: string;
  private readonly usernameProp: string;
  private readonly passwordProp: string;
  private readonly databaseNameProp: string;

  constructor() {
    this.prefix = 'mySql';
    this.hostProp = 'host';
    this.portProp = 'port';
    this.usernameProp = 'username';
    this.passwordProp = 'password';
    this.databaseNameProp = 'databaseName';
  }

  public static getInstance(): MySql {
    if (!this.instance) {
      this.instance = new MySql();
    }

    return this.instance;
  }

  /**
   * Get host property path
   */
  public getHostProp(): string {
    return `${this.prefix}.${this.hostProp}`;
  }

  /**
   * Get port property path
   */
  public getPortProp(): string {
    return `${this.prefix}.${this.portProp}`;
  }

  /**
   * Get username property path
   */
  public getUsernameProp(): string {
    return `${this.prefix}.${this.usernameProp}`;
  }

  /**
   * Get password property path
   */
  public getPasswordProp(): string {
    return `${this.prefix}.${this.passwordProp}`;
  }

  /**
   * Get database name property path
   */
  public getDatabaseNameProp(): string {
    return `${this.prefix}.${this.databaseNameProp}`;
  }

  /**
   * Get config for initialize application
   */
  public static getConfig(): Record<string, any> {
    const instance = MySql.getInstance();
    const config = {
      [instance.hostProp]: process.env.MYSQL_HOST || '',
      [instance.portProp]: parseInt(process.env.MYSQL_PORT || ''),
      [instance.usernameProp]: process.env.MYSQL_USERNAME || '',
      [instance.passwordProp]: process.env.MYSQL_PASSWORD || '',
      [instance.databaseNameProp]: process.env.MYSQL_DATABASE || ''
    };

    if (instance.prefix) {
      return {
        [instance.prefix]: config
      };
    }

    return config;
  }
}
