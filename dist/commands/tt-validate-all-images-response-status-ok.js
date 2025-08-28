"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidateAllImagesResponseStatusOk = void 0;
const extractAuth_1 = require("./../utils/extractAuth");
const excludedUrlPrefixes = ['data:', 'blob:', 'javascript:', 'about:'];
const isExcludedUrl = (url) => {
    return excludedUrlPrefixes.some((prefix) => url.startsWith(prefix));
};
const normalizeUrl = (url) => {
    return url.startsWith('//') ? `https:${url}` : url;
};
const extractCssImageUrls = () => {
    const cssImageUrls = [];
    const excludedUrlPrefixes = ['data:', 'blob:', 'javascript:', 'about:'];
    const isExcludedUrl = (url) => {
        return excludedUrlPrefixes.some((prefix) => url.startsWith(prefix));
    };
    const allElements = document.querySelectorAll('*');
    Array.from(allElements).forEach((element, index) => {
        const computedStyle = window.getComputedStyle(element);
        const backgroundImage = computedStyle.backgroundImage;
        if (backgroundImage && backgroundImage !== 'none') {
            // Extract URLs from url("...") or url('...') or url(...)
            const urlMatches = backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/g);
            if (urlMatches) {
                urlMatches.forEach((match) => {
                    const url = match.replace(/url\(['"]?([^'")]+)['"]?\)/, '$1');
                    if (url && !isExcludedUrl(url)) {
                        const elementInfo = element.tagName.toLowerCase() +
                            (element.id ? `#${element.id}` : '') +
                            (element.className ? `.${Array.from(element.classList).join('.')}` : '') +
                            ` (element ${index + 1})`;
                        cssImageUrls.push({ url, source: `CSS background on ${elementInfo}` });
                    }
                });
            }
        }
    });
    return cssImageUrls;
};
const ttValidateAllImagesResponseStatusOk = () => {
    const imageMap = new Map(); // URL -> source description
    cy.log('Collecting images from DOM and CSS...');
    // First, collect CSS background images
    cy.window().then((win) => {
        const cssImages = win.eval(`(${extractCssImageUrls.toString()})()`);
        cssImages.forEach((item) => {
            const normalizedUrl = normalizeUrl(item.url);
            if (!isExcludedUrl(normalizedUrl)) {
                imageMap.set(normalizedUrl, item.source);
                cy.log(`📍 ${item.source}: ${item.url}`);
            }
        });
        if (cssImages.length > 0) {
            cy.log(`Found ${cssImages.length} CSS background images`);
        }
    });
    // Then collect IMG tag images (make it optional)
    cy.get('body')
        .then(($body) => {
        const imgElements = $body.find('img');
        if (imgElements.length > 0) {
            cy.log(`Found ${imgElements.length} <img> elements`);
            cy.get('img').each(($img) => {
                var _a, _b;
                const img = $img[0];
                const src = img.getAttribute('src');
                const srcset = img.getAttribute('srcset');
                if (src !== null) {
                    const normalizedSrc = normalizeUrl(src);
                    if (!isExcludedUrl(normalizedSrc)) {
                        const alt = (_a = img.getAttribute('alt')) !== null && _a !== void 0 ? _a : 'no alt';
                        const imgSource = `IMG element (alt: "${alt}")`;
                        imageMap.set(normalizedSrc, imgSource);
                        cy.log(`📍 ${imgSource}: ${src}`);
                    }
                }
                if (srcset !== null) {
                    const srcsetUrls = srcset
                        .split(',')
                        .map((srcsetItem) => srcsetItem.trim().split(' ')[0])
                        .map(normalizeUrl);
                    srcsetUrls.forEach((url) => {
                        var _a;
                        if (!isExcludedUrl(url)) {
                            const alt = (_a = img.getAttribute('alt')) !== null && _a !== void 0 ? _a : 'no alt';
                            const srcsetSource = `IMG srcset (alt: "${alt}")`;
                            imageMap.set(url, srcsetSource);
                            cy.log(`📍 ${srcsetSource}: ${url}`);
                        }
                    });
                }
                if (src === null && srcset === null) {
                    const alt = (_b = img.getAttribute('alt')) !== null && _b !== void 0 ? _b : '';
                    cy.log(`⚠️ Image ${alt} has neither src nor srcset attribute`);
                }
            });
        }
        else {
            cy.log('No <img> elements found');
        }
    })
        .then(() => {
        // Validate all collected images
        const totalImages = imageMap.size;
        if (totalImages === 0) {
            cy.log('✅ No images found to validate');
            return;
        }
        cy.log(`🔍 Validating ${totalImages} total images (IMG + CSS)`);
        const promises = [];
        const baseUrl = Cypress.config('baseUrl');
        const auth = (0, extractAuth_1.extractAuth)(baseUrl);
        Array.from(imageMap.entries()).forEach(([url, source]) => {
            const requestOptions = {
                method: 'HEAD',
                url: url,
                failOnStatusCode: false
            };
            if (auth) {
                requestOptions.auth = {
                    username: auth.username,
                    password: auth.password
                };
            }
            const promise = cy.request(requestOptions).then((response) => {
                if (response.status === 200) {
                    cy.log(`✅ ${url}`);
                }
                else {
                    cy.log(`❌ ${url} - Status: ${response.status}`);
                    throw new Error(`Image validation failed: ${url} returned ${response.status}. Source: ${source}`);
                }
            });
            promises.push(promise);
        });
        return Cypress.Promise.all(promises);
    });
};
exports.ttValidateAllImagesResponseStatusOk = ttValidateAllImagesResponseStatusOk;
