/**
 * Returns the expected win percentages for each tree.
 *
 * @param eloWinnerTree - The ELO-Rating of the first tree.
 * @param eloLooserTree - The ELO-Rating of the second tree.
 * @returns The expected win percentages of both trees.
 *
 */
function calculateExpectation(eloWinnerTree: number, eloLooserTree: number) {
  //This equation calculates the percentage at which tree is supposed to win by taking into account the ELO difference
  const expectationValueWinnerTree =
    1 / (1 + 10 ** ((eloLooserTree - eloWinnerTree) / 400));
  const expectationValueLooserTree =
    1 / (1 + 10 ** ((eloWinnerTree - eloLooserTree) / 400));
  //The win percentages are only valid if they equal one when added up
  if (expectationValueWinnerTree + expectationValueLooserTree == 1) {
    return { expectationValueWinnerTree, expectationValueLooserTree };
  } else {
    return { expectationValueWinnerTree: 0, expectationValueLooserTree: 0 };
  }
}
/**
 * Returns the new ELO-Ratings for both trees.
 *
 * @param eloWinnerTree - The ELO-Rating of the first tree.
 * @param eloLooserTree - The ELO-Rating of the second tree.
 *
 * @returns The expected win percentages of both trees.
 *
 */
export function calculateNewElo(eloWinnerTree: number, eloLooserTree: number) {
  // Calculates which Tree is expected to win according to the ELO
  const { expectationValueWinnerTree, expectationValueLooserTree } =
    calculateExpectation(eloWinnerTree, eloLooserTree);
  //After the Expectation Value is calculated, the trees' ELO gets adjusted with the standard factor 20 times the result multiplier
  const newEloWinnerTree = Math.round(
    eloWinnerTree + 20 * (1 - expectationValueWinnerTree)
  );
  const newEloLooserTree = Math.round(
    eloLooserTree + 20 * (0 - expectationValueLooserTree)
  );
  return { newEloWinnerTree, newEloLooserTree };
}
