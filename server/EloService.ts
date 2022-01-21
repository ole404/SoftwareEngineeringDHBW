import { WinningTree } from './interfaces/WinningTree';
/**
 * Returns the expected win percentages for each tree.
 *
 * @param eloTree1 - The ELO-Rating of the first tree.
 * @param eloTree2 - The ELO-Rating of the second tree.
 * @returns The expected win percentages of both trees.
 *
 */
export function calculateExpectation(eloTree1: number, eloTree2: number) {
  //This equation calculates the percentage at which tree is supposed to win by taking into account the ELO difference
  const expectationValueTree1 = 1 / (1 + 10 * ((eloTree2 - eloTree1) / 400));
  const expectationValueTree2 = 1 / (1 + 10 * ((eloTree1 - eloTree2) / 400));
  //The win percentages are only valid if they equal one when added up
  if (expectationValueTree1 + expectationValueTree2 == 1) {
    return { expectationValueTree1, expectationValueTree2 };
  } else {
    return { expectationValueTree1: 0, expectationValueTree2: 0 };
  }
}
/**
 * Returns the new ELO-Ratings for both trees.
 *
 * @param eloTree1 - The ELO-Rating of the first tree.
 * @param eloTree2 - The ELO-Rating of the second tree.
 * @param whoWon - Which of the trees has won the match.
 *
 * @returns The expected win percentages of both trees.
 *
 */
export function calculateNewElo(
  eloTree1: number,
  eloTree2: number,
  whoWon: WinningTree
) {
  const { expectationValueTree1, expectationValueTree2 } = calculateExpectation(
    eloTree1,
    eloTree2
  );

  const treeOneWon = whoWon === WinningTree.One;
  const treeTwoWon = whoWon === WinningTree.Two;
  //If a tree wins a match, their win percentage gets subtracted from one, but if they loose it gets subtracted from zero
  const resultMultiplier1 = treeOneWon
    ? 1 - expectationValueTree1
    : 0 - expectationValueTree1;
  const resultMultiplier2 = treeTwoWon
    ? 1 - expectationValueTree2
    : 0 - expectationValueTree2;
  //After the result multiplier is calculated, the trees' ELO gets adjusted with the standard factor 10 times the result multiplier
  const newEloTree1 = eloTree1 + 10 * resultMultiplier1;
  const newEloTree2 = eloTree2 + 10 * resultMultiplier2;
  return { newEloTree1, newEloTree2 };
}
