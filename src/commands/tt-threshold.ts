export const ttThreshold = (thresholdMB = 3) => {
  cy.window().then(win => {
    win.performance.clearResourceTimings();

    cy.reload().then(() => {
      cy.window().then(reloadedWin => {
        const resources = reloadedWin.performance.getEntriesByType('resource');

        const categorizedResources = {
          'JavaScript': [],
          'CSS': [],
          'Images': [],
          'Other': []
        };

        // Categorize resources by type
        resources.forEach(resource => {
          const url = resource.name.toLowerCase();
          if (url.endsWith('.js')) {
            categorizedResources.JavaScript.push(resource);
          } else if (url.endsWith('.css')) {
            categorizedResources.CSS.push(resource);
          } else if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
            categorizedResources.Images.push(resource);
          } else {
            categorizedResources.Other.push(resource);
          }
        });

        let pageWeight = 0;

        // Log the summary for each category first
        Object.keys(categorizedResources).forEach(type => {
          let categoryWeight = 0;
          categorizedResources[type].forEach(resource => {
            categoryWeight += resource.transferSize || resource.decodedBodySize;
          });

          const categoryWeightMB = categoryWeight / (1024 * 1024);
          pageWeight += categoryWeight;
          cy.log(`${type}: ${categoryWeightMB.toFixed(2)} MB`);
        });

        // Log details for each file within the categories
        Object.keys(categorizedResources).forEach(type => {
          categorizedResources[type].forEach(resource => {
            const sizeKB = (resource.transferSize || resource.decodedBodySize) / 1024;
            cy.log(`  ${resource.name}: ${sizeKB.toFixed(2)} KB`);
          });
        });

        const thresholdBytes = thresholdMB * 1024 * 1024;
        const pageWeightMB = pageWeight / (1024 * 1024);
        const pageWeightKB = pageWeight / 1024;

        cy.log(`Total page weight: ${pageWeightMB.toFixed(2)} MB (${pageWeightKB.toFixed(2)} KB)`);

        // Delay assertion to ensure logs are displayed
        cy.then(() => {
          if (pageWeight > thresholdBytes) {
            assert.fail(`Page weight exceeds threshold: ${pageWeightMB.toFixed(2)} MB (${pageWeightKB.toFixed(2)} KB)`);
          } else {
            cy.log(`Page weight is within the threshold: ${pageWeightMB.toFixed(2)} MB (${pageWeightKB.toFixed(2)} KB)`);
          }
        });
      });
    });
  });
};
