import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PollMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Poll {
  readonly id: string;
  readonly title: string;
  readonly options: string;
  readonly active: boolean;
  readonly edit_code: string;
  readonly hide_results?: boolean | null;
  readonly start_date?: string | null;
  readonly end_date?: string | null;
  readonly custom?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Poll, PollMetaData>);
  static copyOf(source: Poll, mutator: (draft: MutableModel<Poll, PollMetaData>) => MutableModel<Poll, PollMetaData> | void): Poll;
}