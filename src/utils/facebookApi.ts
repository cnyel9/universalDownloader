import type { FacebookResult, FacebookLink } from '../types/api';

const API_URL = 'https://getmyfb.com/process';

interface GetMyFBResponse {
  // The response is HTML, so we'll parse it with DOM
}

export const downloadFacebook = async (videoUrl: string): Promise<FacebookResult> => {
  try {
    const formData = new URLSearchParams();
    formData.append('id', videoUrl);
    formData.append('locale', 'id');

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'HX-Request': 'true',
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const html = await response.text();
    
    // Parse HTML response
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const downloadLinks: FacebookLink[] = [];
    const resultItems = doc.querySelectorAll('.results-list-item');
    
    resultItems.forEach((element) => {
      const textContent = element.textContent?.trim();
      const linkElement = element.querySelector('a');
      const href = linkElement?.getAttribute('href');
      
      if (textContent && href) {
        const qualityText = textContent.split('\n')[0].trim();
        if (qualityText && href) {
          downloadLinks.push({ 
            quality: qualityText, 
            href: href 
          });
        }
      }
    });

    if (downloadLinks.length === 0) {
      throw new Error('No download links found. Please check if the URL is valid and the video is public.');
    }

    return {
      status: true,
      links: downloadLinks
    };

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to process Facebook URL. Please check if the URL is valid.');
  }
};