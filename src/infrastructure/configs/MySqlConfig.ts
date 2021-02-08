export default class MySqlConfig {
  private static instance: MySqlConfig;
  private readonly prefix: string;
  private readonly hostProp: string;
  private readonly portProp: string;
  private readonly usernameProp: string;
  private readonly passwordProp: string;
  private readonly databaseNameProp: string;
  private readonly urlProp: string;
  private readonly connectionTypeProp: string;

  constructor() {
    this.prefix = 'mySql';
    this.hostProp = 'host';
    this.portProp = 'port';
    this.usernameProp = 'username';
    this.passwordProp = 'password';
    this.databaseNameProp = 'databaseName';
    this.urlProp = 'url';
    this.connectionTypeProp = 'connectionType';
  }

  public static getInstance(): MySqlConfig {
    if (!this.instance) {
      this.instance = new MySqlConfig();
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
   * Get database url property path
   */
  public getUrlProp(): string {
    return `${this.prefix}.${this.urlProp}`;
  }

  /**
   * Get database connection type property path
   */
  public getConnectionTypeProp(): string {
    return `${this.prefix}.${this.connectionTypeProp}`;
  }

  public getUrl(): string {
    if (process.env.MYSQL_URL) {
      return process.env.MYSQL_URL;
    }

    // For deployment for Heroku
    if (process.env.JAWSDB_URL) {
      return process.env.JAWSDB_URL;
    }

    return '';
  }

  /**
   * Get configs for initialize application
   */
  public static getConfig(): Record<string, any> {
    const instance = MySqlConfig.getInstance();
    const config = {
      [instance.hostProp]: process.env.MYSQL_HOST || '',
      [instance.portProp]: parseInt(process.env.MYSQL_PORT || ''),
      [instance.usernameProp]: process.env.MYSQL_USERNAME || '',
      [instance.passwordProp]: process.env.MYSQL_PASSWORD || '',
      [instance.databaseNameProp]: process.env.MYSQL_DATABASE || '',
      [instance.urlProp]: instance.getUrl(),
      [instance.connectionTypeProp]: process.env.MYSQL_CONNECTION_TYPE || ''
    };

    if (instance.prefix) {
      return {
        [instance.prefix]: config
      };
    }

    return config;
  }
}
