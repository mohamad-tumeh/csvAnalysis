declare module 'csv-parser' {
    import { Readable } from 'stream';
  
    interface CsvParserOptions {
      separator?: string;
      quote?: string;
      escape?: string;
      headers?: string[] | boolean;
      strict?: boolean;
      mapHeaders?: (args: { header: string; index: number }) => string | null;
      mapValues?: (args: { header: string; index: number; value: string }) => string;
      skipLines?: number;
      skipEmptyLines?: boolean;
      maxRows?: number;
    }
  
    function csvParser(options?: CsvParserOptions): Readable;
  
    export = csvParser;
  }
  