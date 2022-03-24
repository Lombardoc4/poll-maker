/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPoll = /* GraphQL */ `
  query GetPoll($id: ID!) {
    getPoll(id: $id) {
      id
      title
      options
      active
      edit_code
      custom
      hide_results
      start_date
      end_date
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listPolls = /* GraphQL */ `
  query ListPolls(
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        options
        active
        edit_code
        custom
        hide_results
        start_date
        end_date
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPolls = /* GraphQL */ `
  query SyncPolls(
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPolls(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        options
        active
        edit_code
        custom
        hide_results
        start_date
        end_date
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
