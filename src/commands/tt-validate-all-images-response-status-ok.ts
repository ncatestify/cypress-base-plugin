import { extractAuth } from './../utils/extractAuth'

const excludedUrlPrefixes = ['data:', 'blob:', 'javascript:', 'about:']

const isExcludedUrl = (url: string): boolean => {
  return excludedUrlPrefixes.some((prefix) => url.startsWith(prefix))
}

const normalizeUrl = (url: string): string => {
  return url.startsWith('//') ? `https:${url}` : url
}

const buildImageSourceInfo = (
  img: HTMLImageElement,
  index: number,
  type: 'src' | 'srcset',
  pageUrl: string
): string => {
  const alt = img.getAttribute('alt') ?? 'no alt'
  const id = img.getAttribute('id') ? `#${img.getAttribute('id')}` : ''
  const classes = img.className ? `.${Array.from(img.classList).join('.')}` : ''
  const parent = img.parentElement
  const parentInfo = parent
    ? ` in ${parent.tagName.toLowerCase()}${parent.id ? '#' + parent.id : ''}${parent.className ? '.' + Array.from(parent.classList).join('.') : ''}`
    : ''
  const suffix = type === 'srcset' ? ' srcset' : ''
  return `IMG${id}${classes}${suffix} (alt: "${alt}", element ${index + 1}${parentInfo} on page ${pageUrl})`
}

const extractCssImageUrls = (): Array<{ url: string; source: string }> => {
  const cssImageUrls: Array<{ url: string; source: string }> = []
  const excludedUrlPrefixes = ['data:', 'blob:', 'javascript:', 'about:']
  const isExcludedUrl = (url: string): boolean => {
    return excludedUrlPrefixes.some((prefix) => url.startsWith(prefix))
  }

  // Get all CSS files loaded on the page
  const cssFiles: string[] = []
  Array.from(document.styleSheets).forEach((sheet) => {
    if (sheet.href) {
      cssFiles.push(sheet.href)
    }
  })
  const cssFilesList =
    cssFiles.length > 0
      ? ` (CSS files: ${cssFiles.join(', ')})`
      : ' (inline styles)'

  const allElements = document.querySelectorAll('*')

  Array.from(allElements).forEach((element, index) => {
    const computedStyle = window.getComputedStyle(element)
    const backgroundImage = computedStyle.backgroundImage

    if (backgroundImage && backgroundImage !== 'none') {
      // Extract URLs from url("...") or url('...') or url(...)
      const urlMatches = backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/g)
      if (urlMatches) {
        urlMatches.forEach((match) => {
          const url = match.replace(/url\(['"]?([^'")]+)['"]?\)/, '$1')
          if (url && !isExcludedUrl(url)) {
            const elementInfo =
              element.tagName.toLowerCase() +
              (element.id ? `#${element.id}` : '') +
              (element.className
                ? `.${Array.from(element.classList).join('.')}`
                : '') +
              ` (element ${index + 1})`

            // Try to find which CSS rule applies
            let cssRuleInfo = ''
            try {
              for (let i = 0; i < document.styleSheets.length; i++) {
                const sheet = document.styleSheets[i]
                if (sheet.href && sheet.cssRules) {
                  for (let j = 0; j < sheet.cssRules.length; j++) {
                    const rule = sheet.cssRules[j] as CSSStyleRule
                    if (
                      rule.selectorText &&
                      element.matches &&
                      element.matches(rule.selectorText)
                    ) {
                      if (
                        rule.style.backgroundImage &&
                        rule.style.backgroundImage.includes(url)
                      ) {
                        cssRuleInfo = ` from rule "${rule.selectorText}" in ${sheet.href}`
                        break
                      }
                    }
                  }
                  if (cssRuleInfo) break
                }
              }
            } catch {
              // Cross-origin or other CSS access issues
              cssRuleInfo = ' (CSS rule details unavailable due to CORS)'
            }

            cssImageUrls.push({
              url,
              source: `CSS background on ${elementInfo}${cssRuleInfo}${cssFilesList}`
            })
          }
        })
      }
    }
  })

  return cssImageUrls
}

export const ttValidateAllImagesResponseStatusOk = (): void => {
  const imageMap = new Map<string, string>() // URL -> source description

  cy.log('Collecting images from DOM and CSS...')

  // First, collect CSS background images
  cy.window().then((win) => {
    const cssImages = win.eval(`(${extractCssImageUrls.toString()})()`)
    cssImages.forEach((item: { url: string; source: string }) => {
      const normalizedUrl = normalizeUrl(item.url)
      if (!isExcludedUrl(normalizedUrl)) {
        imageMap.set(normalizedUrl, item.source)
        cy.log(`📍 ${item.source}: ${item.url}`)
      }
    })

    if (cssImages.length > 0) {
      cy.log(`Found ${cssImages.length} CSS background images`)
    }
  })

  // Then collect IMG tag images (make it optional)
  cy.get('body')
    .then(($body) => {
      const imgElements = $body.find('img')

      if (imgElements.length > 0) {
        cy.log(`Found ${imgElements.length} <img> elements`)
        const pageUrl = window.location.href
        cy.get('img').each(($img, index) => {
          const img = $img[0] as HTMLImageElement
          const src = img.getAttribute('src')
          const srcset = img.getAttribute('srcset')

          if (src !== null) {
            const normalizedSrc = normalizeUrl(src)
            if (!isExcludedUrl(normalizedSrc)) {
              const imgSource = buildImageSourceInfo(img, index, 'src', pageUrl)
              imageMap.set(normalizedSrc, imgSource)
              cy.log(`📍 ${imgSource}: ${src}`)
            }
          }

          if (srcset !== null) {
            const srcsetUrls = srcset
              .split(',')
              .map((srcsetItem) => srcsetItem.trim().split(' ')[0])
              .map(normalizeUrl)
            srcsetUrls.forEach((url) => {
              if (!isExcludedUrl(url)) {
                const srcsetSource = buildImageSourceInfo(
                  img,
                  index,
                  'srcset',
                  pageUrl
                )
                imageMap.set(url, srcsetSource)
                cy.log(`📍 ${srcsetSource}: ${url}`)
              }
            })
          }

          if (src === null && srcset === null) {
            const alt = img.getAttribute('alt') ?? ''
            cy.log(`⚠️ Image ${alt} has neither src nor srcset attribute`)
          }
        })
      } else {
        cy.log('No <img> elements found')
      }
      return null
    })
    .then(() => {
      // Validate all collected images
      const totalImages = imageMap.size

      if (totalImages === 0) {
        cy.log('✅ No images found to validate')
        return
      }

      cy.log(`🔍 Validating ${totalImages} total images (IMG + CSS)`)

      const baseUrl = Cypress.config('baseUrl')
      const auth = extractAuth(baseUrl)

      Array.from(imageMap.entries()).forEach(([url, source]) => {
        const requestOptions: Partial<Cypress.RequestOptions> = {
          method: 'HEAD',
          url: url,
          failOnStatusCode: false
        }

        if (auth) {
          requestOptions.auth = {
            username: auth.username,
            password: auth.password
          }
        }

        cy.request(requestOptions).then((response) => {
          if (response.status === 200) {
            cy.log(`✅ ${url}`)
          } else {
            cy.log(`❌ ${url} - Status: ${response.status}`)
            throw new Error(
              `Image validation failed: ${url} returned ${response.status}. Source: ${source}`
            )
          }
        })
      })
    })
}
