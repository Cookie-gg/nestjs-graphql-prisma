import { OperationDefinitionNode } from 'graphql';

export const getSelectionName = (operation: OperationDefinitionNode): string[] => {
  return operation.selectionSet.selections.map((selection) => selection['name'].value as string);
};
