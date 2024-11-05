export interface IConfig {
  api: {
    authKey: string;
    url: string;
  };
  indexPage: {
    favicon: string;
    title: string;
  };
  logo: {
    url: string;
    style: {
      width: number;
      height: number;
    };
  };
}
