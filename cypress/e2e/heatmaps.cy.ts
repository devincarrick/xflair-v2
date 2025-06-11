describe('Heatmaps Flow', () => {
  it('should allow a user to upload an image and get heatmaps', () => {
    cy.visit('/models/tensorflow/images/classification');
    cy.get('input[type="file"]').attachFile('test-image.jpg');
    cy.get('button[type="submit"]').click();
    cy.contains('Upload successful').should('be.visible');
    cy.get('[data-testid="heatmaps-button"]').click();
    cy.get('[data-testid="heatmap-result"]').should('exist');
  });
}); 