declare module 'node-nlp' {
  export interface NlpManagerOptions {
    languages?: string[];
    forceNER?: boolean;
    nlu?: any;
    ner?: any;
  }

  export interface ProcessResult {
    utterance: string;
    locale: string;
    languageGuessed: boolean;
    localeIso2: string;
    language: string;
    domain: string;
    classifications: Array<{
      intent: string;
      score: number;
    }>;
    intent: string;
    score: number;
    entities: any[];
    sourceEntities: any[];
    answer: string;
    sentiment: {
      score: number;
      comparative: number;
      calculation: any[];
      tokens: string[];
      words: string[];
      positive: string[];
      negative: string[];
    };
  }

  export class NlpManager {
    constructor(options?: NlpManagerOptions);
    addDocument(locale: string, utterance: string, intent: string): void;
    addAnswer(locale: string, intent: string, answer: string): void;
    train(): Promise<void>;
    process(locale: string, utterance: string): Promise<ProcessResult>;
    save(filename?: string): Promise<void>;
    load(filename?: string): Promise<void>;
  }
}