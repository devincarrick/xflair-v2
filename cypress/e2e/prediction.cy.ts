describe('Prediction Flow', () => {
  it('should allow a user to upload an image and get a prediction', () => {
    cy.visit('/models/tensorflow/images/classification');
    cy.get('input[type="file"]').attachFile('test-image.jpg');
    cy.get('button[type="submit"]').click();
    cy.contains('Upload successful').should('be.visible');
    cy.get('[data-testid="predict-button"]').click();
    cy.get('[data-testid="prediction-result"]').should('exist');
  });
}); 