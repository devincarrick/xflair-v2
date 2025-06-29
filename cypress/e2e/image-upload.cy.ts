/// <reference types="cypress" />

describe('Image Upload Flow', () => {
  it('should allow a user to upload an image and receive a file path', () => {
    cy.visit('/models/tensorflow/images/classification');
    cy.get('[data-testid="file-input"]').attachFile('test-image.jpg');
    cy.get('[data-testid="upload-button"]').click();
    cy.get('[data-testid="uploaded-file-path"]').should('exist');
    cy.get('[data-testid="upload-success-message"]').should('be.visible');
  });

  it('should allow a user to upload a PNG image', () => {
    cy.visit('/models/tensorflow/images/classification');
    cy.get('[data-testid="file-input"]').attachFile('test-image.png');
    cy.get('[data-testid="upload-button"]').click();
    cy.get('[data-testid="uploaded-file-path"]').should('exist');
    cy.get('[data-testid="upload-success-message"]').should('be.visible');
  });

  it('should show an error for invalid file type (e.g., .txt)', () => {
    cy.visit('/models/tensorflow/images/classification');
    cy.get('[data-testid="file-input"]').attachFile('invalid-file.txt');
    cy.get('[data-testid="upload-button"]').click();
    cy.contains('Invalid file type').should('be.visible');
  });

  it('should show an error for oversized image', () => {
    cy.visit('/models/tensorflow/images/classification');
    cy.get('[data-testid="file-input"]').attachFile('oversized-image.jpg');
    cy.get('[data-testid="upload-button"]').click();
    cy.contains('File is too large').should('be.visible');
  });

  it('should show an error for empty or corrupted file', () => {
    cy.visit('/models/tensorflow/images/classification');
    cy.get('[data-testid="file-input"]').attachFile('corrupted-image.jpg');
    cy.get('[data-testid="upload-button"]').click();
    cy.contains('File is empty or corrupted').should('be.visible');
  });

  it('should verify file preprocessing works', () => {
    cy.visit('/models/tensorflow/images/classification');
    cy.get('[data-testid="file-input"]').attachFile('preprocess-image.jpg');
    cy.get('[data-testid="upload-button"]').click();
    cy.get('[data-testid="uploaded-file-path"]').should('exist');
    cy.get('[data-testid="upload-success-message"]').should('be.visible');
    cy.get('[data-testid="preprocessing-success"]').should('exist');
  });
}); 