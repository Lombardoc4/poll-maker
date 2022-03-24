/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPoll = /* GraphQL */ `
  mutation CreatePoll(
    $input: CreatePollInput!
    $condition: ModelPollConditionInput
  ) {
    createPoll(input: $input, condition: $condition) {
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
export const updatePoll = /* GraphQL */ `
  mutation UpdatePoll(
    $input: UpdatePollInput!
    $condition: ModelPollConditionInput
  ) {
    updatePoll(input: $input, condition: $condition) {
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
export const deletePoll = /* GraphQL */ `
  mutation DeletePoll(
    $input: DeletePollInput!
    $condition: ModelPollConditionInput
  ) {
    deletePoll(input: $input, condition: $condition) {
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
